import { Navigate, Outlet } from "react-router";
import { isLoggedIn } from "@/services/authService";

// Private pages: Allow only logged-in users, else redirect to /login
export const ProtectedRoute = () => {
  return isLoggedIn() ? <Outlet /> : <Navigate to="/login" replace />;
};

// Public pages: Allow only guests, else redirect logged-in users to /tasks
export const PublicRoute = () => {
  return isLoggedIn() ? <Navigate to="/tasks" replace /> : <Outlet />;
};
