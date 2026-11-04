import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Extracts a clean error message from a FastAPI response
function getErrorMessage(data) {
  // Standard Error (HTTPException): detail is a plain string
  if (typeof data.detail === "string") return data.detail;

  // Validation Error (422): detail is an array of objects
  if (Array.isArray(data.detail) && data.detail[0]?.msg) {
    // Grab the first error message and remove the ugly "Value error, " prefix
    return data.detail[0].msg.replace("Value error, ", "");
  }

  // Fallback: for network issues or unexpected server errors
  return "Something went wrong. Try again.";
}

// A reusable wrapper for all POST requests to the backend
export const post = async (path, body) => {
  try {
    // Send the request. Axios automatically converts the body to JSON.
    const response = await axios.post(`${API_URL}${path}`, body, {
      timeout: 10000,
    });

    // If successful (200-299), return just the data payload
    return response.data;
  } catch (error) {
    // 1. Network error: The server is offline or there's no internet
    if (!error.response) {
      throw new Error("Can't reach the server");
    }

    // 2. Server error (400, 422, 500, etc.) Extract the error data sent by FastAPI and format it nicely
    const data = error.response.data || {};
    throw new Error(getErrorMessage(data));
  }
};
