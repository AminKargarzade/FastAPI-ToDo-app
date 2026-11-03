import { useState } from "react";
import { User, Lock } from "lucide-react";
import { motion, useAnimation } from "motion/react";
import Field from "./Field";
import SocialButtons from "./SocialButtons";
import { formVariants, itemVariants } from "./motion";

const AuthForm = ({ isLogin, onSwitch }) => {
  const mode = isLogin ? "login" : "signup";
  const controls = useAnimation(); // Controls the shake animation for errors

  // Form State
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // UI state
  const [loading, setLoading] = useState(false); // Disables button while waiting for API
  const [error, setError] = useState("");        // Stores error message text

  const handleSubmit = (e) => {
    e.preventDefault();

    // If signing up, check if passwords match
    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match.");
      
      // Triggers the left/right shake animation
      controls.start({
        x: [0, -8, 8, -6, 6, 0],
        transition: { duration: 0.15 },
      });
      return;
    }

    setError(""); // Clear any previous errors if validation passes
  };

  return (
    // Main form wrapper: Applies the staggered fade-in/slide-up animation
    <motion.form
      variants={formVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      onSubmit={handleSubmit}
      className="grid gap-4 w-full rounded-3xl p-6 bg-white shadow-lg shadow-teal-900/15 sm:p-9"
    >
      {/* Header: Changes text based on Login or Signup mode */}
      <motion.header variants={itemVariants} className="grid gap-1">
        <h2 className="text-center text-xl font-extrabold">
          {isLogin ? "Log in to your account" : "Create your account"}
        </h2>
        <p className="text-center text-sm text-teal-800/70">
          {isLogin
            ? "We're happy to see you again!"
            : "It only takes a minute!"}
        </p>
      </motion.header>

      {/* Username Field */}
      <Field
        id={`${mode}-username`} // Dynamic ID (login-username / signup-username) prevents autofill bugs
        label="Username"
        icon={User}
        placeholder={isLogin ? "Enter your username" : "Choose a username"}
        autoComplete="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {/* Password Field */}
      <Field
        id={`${mode}-password`}
        label="Password"
        icon={Lock}
        type="password"
        placeholder={isLogin ? "Enter your password" : "Create a password"}
        autoComplete={isLogin ? "current-password" : "new-password"} // Helps browser password managers
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Confirm Password Field (Only shows during Signup) */}
      {!isLogin && (
        <Field
          id="signup-confirm"
          label="Confirm password"
          icon={Lock}
          type="password"
          placeholder="Enter your password again"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      )}

      {/* Error Message Container */}
      <div className="min-h-6 flex items-center justify-center">
        {error && (
          <motion.p
            animate={controls} // Connects to the shake animation trigger
            role="alert"       // Tells screen readers to announce the error
            className="text-center text-sm font-semibold text-red-600"
          >
            {error}
          </motion.p>
        )}
      </div>

      {/* Submit Button */}
      <motion.button
        variants={itemVariants}
        whileHover={{ y: -2 }}      // Lifts up slightly on hover
        whileTap={{ scale: 0.98 }}  // Shrinks slightly when clicked
        type="submit"
        disabled={loading}          // Prevents double-clicks
        className="mt-2 bg-teal-600 px-4 py-3 rounded-2xl font-bold text-white shadow-md shadow-teal-900/20 transition-colors hover:bg-teal-700 disabled:opacity-50"
      >
        {/* Changes text based on loading state and login/signup mode */}
        {loading
          ? isLogin
            ? "Logging in..."
            : "Creating account..."
          : isLogin
            ? "Log in"
            : "Sign up"}
      </motion.button>

      {/* Social Login Buttons (Google / GitHub) */}
      <SocialButtons />

      {/* Footer: Toggle between Login and Signup */}
      <motion.p
        variants={itemVariants}
        className="text-center text-sm text-teal-700/70"
      >
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button
          type="button"
          onClick={onSwitch} // Calls the parent function to slide the panels
          className="font-bold text-teal-700 hover:underline ml-1"
        >
          {isLogin ? "Sign up" : "Log in"}
        </button>
      </motion.p>
    </motion.form>
  );
};

export default AuthForm;