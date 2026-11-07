import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Extracts a clean error message from a FastAPI response
export const getErrorMessage = (data) => {
  // Standard Error (HTTPException): detail is a plain string
  if (typeof data.detail === "string") return data.detail;

  // Validation Error (422): detail is an array of objects
  if (Array.isArray(data.detail) && data.detail[0]?.msg) {
    // Grab the first error message and remove the ugly "Value error, " prefix
    return data.detail[0].msg.replace("Value error, ", "");
  }

  // Fallback: for network issues or unexpected server errors
  return "Something went wrong. Try again.";
};

// Turns an axios error into a standard Error with a readable message
const toError = (error) => {
  // No response: the server is offline or there's no internet - Network down
  if (!error.response) return new Error("Can't reach the server");

  // Server responded with an error: extract a clean message from the response data
  return new Error(getErrorMessage(error.response.data || {}));
};

// axios instance with no token - used for register/login
const publicClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Axios instance for protected requests (automatically attaches the token)
const client = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Before every request: automatically attach the access token to the header
client.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// A reusable wrapper for all POST requests to the backend
export const post = async (path, body) => {
  try {
    const response = await publicClient.post(path, body);
    return response.data;
  } catch (error) {
    throw toError(error);
  }
};

// Tries to get a new access token using the refresh token
const refreshAccessToken = async () => {
  try {
    // Send the refresh token to the server using publicClient (no interceptors)
    const { data } = await publicClient.post("/users/refresh-token", {
      token: localStorage.getItem("refresh_token"),
    });

    // Save the new access token for future requests
    localStorage.setItem("access_token", data.access_token);

    // Return the new token so the original request can retry
    return data.access_token;
  } catch {
    // If the refresh token is invalid/expired, return null to signal failure
    return null;
  }
};

// After every response: if the token expired (401), refresh it and try again once
client.interceptors.response.use(
  // 1. If the request succeeds, just pass the response through
  (response) => response,

  // 2. If the request fails, run this error handler
  async (error) => {
    // Save the details of the failed request so we can retry it later
    const original = error.config;

    // Check if the error is a 401 (Unauthorized) AND we haven't already retried this request
    if (error.response?.status === 401 && !original._retry) {
      // Mark as retried so we don't create an infinite loop
      original._retry = true;

      // Try to get a new token
      const newToken = await refreshAccessToken();

      // Success: Update the old request with the new token and retry it
      if (newToken) {
        original.headers.Authorization = `Bearer ${newToken}`;
        return client(original);
      }
      // Failure: The refresh token is expired/invalid. Clear everything and force login.
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      window.location.href = "/login";
    }

    // If it's a different error (like 404 or 500), pass the error to your catch block
    return Promise.reject(error);
  },
);

// Wrapper for all authenticated requests (token is added automatically)
export const request = async (config) => {
  try {
    const response = await client(config);
    return response.data;
  } catch (error) {
    throw toError(error);
  }
};
