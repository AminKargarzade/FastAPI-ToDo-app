import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import AuthForm from "../components/auth/AuthForm";
import AuthHero from "../components/auth/AuthHero";
import { slide } from "../components/auth/motion";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  
  // Converts the boolean to a string ("login" or "signup") for text and keys
  const mode = isLogin ? "login" : "signup";

  return (
    // Full-screen wrapper to center the card
    <main className="grid min-h-dvh place-items-center p-3 text-teal-950 sm:p-6 w-full">

      {/* 
        Card Container: 
        1. Fades up on the very first page load.
        2. Uses `md:flex-row-reverse` to swap the form and image positions when signing up.
      */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`flex flex-col w-full max-w-4xl overflow-hidden rounded-3xl bg-teal-50 shadow-2xl shadow-teal-900/20 md:min-h-175 md:flex-row ${
          isLogin ? "" : "md:flex-row-reverse"
        }`}
      >
        {/* Form Side Container: `layout="position"` makes it smoothly glide to its new side */}
        <motion.div
          layout="position"
          transition={slide}
          className="relative z-10 flex items-center p-3 md:w-1/2 md:p-7"
        >
          {/* 
            AnimatePresence mode="wait": Waits for the old form to finish fading out before the new form fades in. 
            key={mode}: Forces React to treat Login and Signup as completely separate forms.
          */}
          <AnimatePresence mode="wait">
            <AuthForm
              key={mode}
              isLogin={isLogin}
              onSwitch={() => setIsLogin(!isLogin)} // Flips the state to trigger the swap
            />
          </AnimatePresence>
        </motion.div>

        {/* Image Side (Handles its own animations internally) */}
        <AuthHero isLogin={isLogin} />
      </motion.div>
    </main>
  );
};

export default AuthPage;