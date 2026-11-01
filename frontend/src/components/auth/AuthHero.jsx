import { motion, AnimatePresence } from "motion/react";
import heroArt from "../../assets/illustration.png";
import { slide } from "./motion";

// Text content for both modes
const HERO = {
  login: {
    title: "Welcome back!",
    text: "Log in to continue your journey and get things done",
  },
  signup: {
    title: "Join us today!",
    text: "Create an account and start organizing your tasks",
  },
};

// The image side of the card (hidden on phones)
const AuthHero = ({ isLogin }) => {
  const mode = isLogin ? "login" : "signup";

  return (
    <motion.section
      layout="position" // Smoothly animates the layout when sliding
      transition={slide} // Applies the custom slide timing
      className="relative isolate hidden overflow-hidden md:w-1/2 md:flex flex-col bg-teal-50 bg-linear-to-t from-teal-100 to-transparent px-8 text-center pt-1"
    >
      {/* Soft glowing blobs that drift while the panel slides */}
      <motion.span
        aria-hidden="true" // Hides decorative elements from screen readers
        animate={{ x: isLogin ? 0 : 128, y: isLogin ? 0 : 64 }} // Moves when switching modes
        transition={{ duration: 1, ease: "easeOut" }}
        className="pointer-events-none absolute -top-20 -left-20 -z-10 size-72 rounded-full bg-teal-300/40 blur-3xl"
      />
      <motion.span
        aria-hidden="true"
        animate={{ x: isLogin ? 0 : -128, y: isLogin ? 0 : -64 }} // Moves in opposite direction
        transition={{ duration: 1, ease: "easeOut" }}
        className="pointer-events-none absolute -right-16 -bottom-24 -z-10 size-80 rounded-full bg-teal-200/60 blur-3xl"
      />

      {/* Title + text: the old one blurs out, the new one blurs in */}
      <div className="mt-5">
        {/* AnimatePresence allows the outgoing text to finish animating before the new one appears */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mode} // Forces React to treat login and signup text as different elements
            initial={{ opacity: 0, y: 12, filter: "blur(6px)" }} // Starts invisible, down, and blurry
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} // Fades in, moves up, becomes clear
            exit={{ opacity: 0, y: -12, filter: "blur(6px)" }} // Fades out, moves up, becomes blurry
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-4xl font-extrabold">{HERO[mode].title}</h1>
            <p className="text-teal-800/70 text-sm">{HERO[mode].text}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* The image turns to face the form (flips horizontally) */}
      <motion.img
        src={heroArt}
        initial={false} // Prevents a flip animation on the initial page load
        animate={{ scaleX: isLogin ? -1 : 1 }} // -1 flips it, 1 is normal
        transition={slide}
        className="mt-10 max-h-150 object-contain"
      />
    </motion.section>
  );
};

export default AuthHero;
