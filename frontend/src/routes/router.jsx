import { createBrowserRouter, Navigate } from "react-router";
import { ProtectedRoute, PublicRoute } from "./RouteGuards";
import AuthPage from "@/pages/AuthPage";
import TasksPage from "@/pages/TasksPage";
import AppLayout from "@/components/layout/AppLayout";

const router = createBrowserRouter([
  // 1. Public Routes (Guests only)
  {
    element: <PublicRoute />, // Guard: Redirects logged-in users away from /login
    children: [{ path: "/login", element: <AuthPage /> }],
  },

  // 2. Protected Routes (Logged-in users only)
  {
    element: <ProtectedRoute />, // Guard: Redirects guests to /login
    children: [
      {
        element: <AppLayout />, // Wraps protected pages with a shared layout (Header, Sidebar, etc.)
        children: [
          { path: "/tasks", element: <TasksPage /> }, // Main dashboard page
        ],
      },
    ],
  },

  // 3. Catch-All Route (Fallback for unknown URLs)
  { 
    path: "*", 
    element: <Navigate to="/login" replace /> // Send any random URL back to login
  },
]);

export default router;