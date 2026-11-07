import { post } from "./api";

// Registers a new user
export const register = ({ username, password, confirmPassword }) => {
  return post("/users/register", {
    username,
    password,
    password_confirm: confirmPassword, // Backend expects (password_confirm)
  });
};

// Logs the user in and saves their tokens
export const login = async ({ username, password }) => {
  // Wait for the backend to verify credentials and return tokens
  const data = await post("/users/login", { username, password });

  // Save tokens in the browser so the user stays logged in
  localStorage.setItem("access_token", data.access_token);
  localStorage.setItem("refresh_token", data.refresh_token);
  return data;
};

export const isLoggedIn = () => {
  return !!localStorage.getItem("access_token");
};

export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};
