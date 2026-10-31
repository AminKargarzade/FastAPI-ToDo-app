import { useState } from "react";
import { User, Lock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Field from "./Field";
import SocialButtons from "./SocialButtons";
import { formVariants, itemVariants } from "./motion";

// The login / signup form. It is remounted on every mode change (see AuthPage),
// so its fields and error message start fresh each time.
const AuthForm = ({ isLogin, onSwitch }) => {
  const mode = isLogin ? "login" : "signup";

  // Form State
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    // TODO: call the login / register API here (wrap it with setLoading(true / false))
  };

  return (
    <motion.form
      variants={formVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      onSubmit={handleSubmit}
      className="grid gap-4 w-full rounded-3xl p-6 bg-white shadow-lg shadow-teal-900/15 sm:p-9"
    >
      <motion.header variants={itemVariants} className="grid gap-1">
        <h2 className="text-center text-xl font-extrabold">
          {isLogin ? "Log in to your account" : "Create your account"}
        </h2>
        <p className="text-center text-sm text-teal-800/70">
          {isLogin ? "We're happy to see you again!" : "It only takes a minute!"}
        </p>
      </motion.header>

      <Field
        id={`${mode}-username`}
        label="Username"
        icon={User}
        placeholder={isLogin ? "Enter your username" : "Choose a username"}
        autoComplete="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Field
        id={`${mode}-password`}
        label="Password"
        icon={Lock}
        type="password"
        placeholder={isLogin ? "Enter your password" : "Create a password"}
        autoComplete={isLogin ? "current-password" : "new-password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
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

      {/* Error: slides in and shakes once */}
      <AnimatePresence>
        {error && (
          <motion.p
            role="alert"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0, x: [0, -6, 6, -4, 4, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center text-sm font-semibold text-red-600"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      <motion.button
        variants={itemVariants}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={loading}
        className="mt-2 bg-teal-600 px-4 py-3 rounded-2xl font-bold text-white shadow-md shadow-teal-900/20 transition-colors hover:bg-teal-700 disabled:opacity-50"
      >
        {loading
          ? isLogin ? "Logging in..." : "Creating account..."
          : isLogin ? "Log in" : "Sign up"}
      </motion.button>

      <SocialButtons />

      <motion.p variants={itemVariants} className="text-center text-sm text-teal-700/70">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button
          type="button"
          onClick={onSwitch}
          className="font-bold text-teal-700 hover:underline ml-1"
        >
          {isLogin ? "Sign up" : "Log in"}
        </button>
      </motion.p>
    </motion.form>
  );
};

export default AuthForm;