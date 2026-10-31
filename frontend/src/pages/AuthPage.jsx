import { useState } from "react";
import { motion, AnimatePresence, MotionConfig } from "motion/react";
import AuthForm from "../components/auth/AuthForm";
import AuthHero from "../components/auth/AuthHero";
import { slide } from "../components/auth/motion";

const AuthPage = () => {
  // Mode: true = login, false = signup
  const [isLogin, setIsLogin] = useState(true);
  const mode = isLogin ? "login" : "signup";

  return (
    // MotionConfig: users with "reduce motion" enabled get simpler animations
    <MotionConfig reducedMotion="user">
      <main className="grid min-h-dvh place-items-center p-3 text-teal-950 sm:p-6 w-full">

        {/* Card (fades up on load; the two halves swap sides on signup) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`flex flex-col w-full max-w-4xl overflow-hidden rounded-3xl bg-teal-50 shadow-2xl shadow-teal-900/20 md:min-h-175 md:flex-row ${
            isLogin ? "" : "md:flex-row-reverse"
          }`}
        >
          {/* Form side: `layout` makes it glide to its new position */}
          <motion.div
            layout="position"
            transition={slide}
            className="relative z-10 flex items-center p-3 md:w-1/2 md:p-7"
          >
            {/* The key changes with the mode: the old form exits, the new one enters */}
            <AnimatePresence mode="wait">
              <AuthForm
                key={mode}
                isLogin={isLogin}
                onSwitch={() => setIsLogin(!isLogin)}
              />
            </AnimatePresence>
          </motion.div>

          {/* Image side */}
          <AuthHero isLogin={isLogin} />
        </motion.div>
      </main>
    </MotionConfig>
  );
};

export default AuthPage;