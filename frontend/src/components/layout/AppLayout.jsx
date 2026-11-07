import { Outlet, useNavigate } from "react-router";
import Header from "./Header";
import { logout } from "@/services/authService";

// Shared layout for protected pages (Header + page content)
const AppLayout = () => {
  const navigate = useNavigate(); // Hook for programmatic redirects

  // Clears tokens and sends the user to the login page
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    // Full-height wrapper with a soft gradient background
    <div className="min-h-dvh bg-linear-to-br from-teal-50 via-white to-cyan-50 text-teal-950">
      {/* Top navigation bar, receives the logout handler */}
      <Header onLogout={handleLogout} />

      {/* Renders the active child page (e.g., TasksPage) */}
      <Outlet />
    </div>
  );
};

export default AppLayout;
