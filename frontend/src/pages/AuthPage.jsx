import { User, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import heroArt from "../assets/illustration.png";

import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const AuthPage = () => {
  // Form State
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    // Main page wrapper
    <main className="grid min-h-dvh place-items-center p-3 text-teal-950 sm:p-6 w-full">

      {/* Card container */}
      <div className="flex flex-col w-full max-w-4xl rounded-3xl bg-teal-50 shadow-2xl shadow-teal-900/20 md:min-h-115 md:flex-row ">

        {/* Left side */}
        <div className="flex items-center justify-center p-3 md:w-1/2 md:p-7">

          {/* Form wrapper */}
          <form className="grid gap-4 w-full rounded-3xl p-6 bg-white shadow-lg shadow-teal-900/15 sm:p-9">
            <h2 className="text-center text-xl font-extrabold">
              Log in to your account
            </h2>
            <p className="text-center -mt-2 text-sm text-teal-800/70">
              We're happy to see you again!
            </p>

            {/* Username section */}
            <div className="grid gap-2">
              <label className="text-sm font-bold">Username</label>
              <div className="flex items-center gap-2 rounded-2xl border-2 border-teal-100 bg-teal-50/60 p-2 focus-within:border-teal-500 focus-within:ring-4 focus-within:ring-teal-500/20">

                {/* Username icon */}
                <span className="p-2 bg-teal-100 rounded-xl">
                  <User size={18} />
                </span>
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="outline-none flex-1 bg-transparent"
                />
              </div>
            </div>

            {/* Password section */}
            <div className="grid gap-2">
              <label className="text-sm font-bold">Password</label>
              <div className="flex items-center gap-2 rounded-2xl border-2 border-teal-100 bg-teal-50/60 p-2 focus-within:border-teal-500 focus-within:ring-4 focus-within:ring-teal-500/20">
              
                {/* Password icon */}
                <span className="p-2 bg-teal-100 rounded-xl">
                  <Lock size={18} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="outline-none flex-1 bg-transparent"
                />
                {/* Eye icon */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-auto"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Action button */}
            <button
              type="submit"
              disabled={loading}
              className=" mt-2 bg-teal-600 px-4 py-3 rounded-2xl font-bold text-white shadow-md shadow-teal-900/20 transition hover:bg-teal-700 disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>

            {/* Divider */}
            <div className="flex items-center py-2">
              <div className="grow border-t border-teal-100"></div>
              <span className="shrink-0 mx-4 text-xs text-teal-800/50">
                Or continue with
              </span>
              <div className="grow border-t border-teal-100"></div>
            </div>

            {/* OAuth Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2 border-2 rounded-2xl border-teal-100 bg-white py-2 text-sm font-bold text-teal-900 transition hover:bg-teal-50"
              >
                <FcGoogle size={22} /> Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 border-2 rounded-2xl border-teal-100 bg-white py-2 text-sm font-bold text-teal-900 transition hover:bg-teal-50"
              >
                <FaGithub size={22} /> GitHub
              </button>
            </div>

            <p className="mt-2 text-center text-sm text-teal-700/70">
              Don't have an account?
              <a
                href="#"
                className="font-bold text-teal-700 hover:underline ml-1"
              >
                Sign up
              </a>
            </p>
          </form>
        </div>

        {/* Right side */}
        <section className="hidden md:w-1/2 md:flex flex-col bg-teal-50 bg-linear-to-t from-teal-100 to-transparent px-8 text-center pt-1">
          <h1 className="mt-5 text-4xl font-extrabold">Welcome back!</h1>
          <p className="text-teal-800/70 text-sm text-center">
            Log in to continue your journey and get things done
          </p>
          <img
            src={heroArt}
            className="mt-10 max-h-100 scale-x-[-1] object-contain"
          />
        </section>
      </div>
    </main>
  );
};

export default AuthPage;
