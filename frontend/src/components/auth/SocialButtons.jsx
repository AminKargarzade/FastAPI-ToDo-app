import { motion } from "motion/react";
import { RxGithubLogo } from "react-icons/rx";
import { FcGoogle } from "react-icons/fc";
import { itemVariants } from "./motion";

// Reusable Tailwind classes for the social buttons
const socialBtn =
  "flex items-center justify-center gap-2 border-2 rounded-2xl border-teal-100 bg-white py-2 text-sm font-bold text-teal-900 transition-colors hover:border-teal-300 hover:bg-teal-50";

// Divider + Google / GitHub buttons
const SocialButtons = () => (
  // Applies the itemVariants animation (fades in & slides up when parent triggers)
  <motion.div variants={itemVariants} className="grid gap-4">
    
    {/* Divider section */}
    <div className="flex items-center py-2">

      {/* Left line: grows to fill empty space */}
      <div className="grow border-t border-teal-100"></div>

      {/* Center text: shrink-0 prevents it from squishing */}
      <span className="shrink-0 mx-4 text-xs text-teal-800/50">
        Or continue with
      </span>
      {/* Right line: grows to fill empty space */}
      <div className="grow border-t border-teal-100"></div>
    </div>

    {/* Button grid */}
    <div className="grid grid-cols-2 gap-3">
      
      {/* Google Button */}
      <motion.button
        type="button"
        whileHover={{ y: -2 }}      
        whileTap={{ scale: 0.97 }}  
        className={socialBtn}
      >
        <FcGoogle size={22} /> Google
      </motion.button>
      
      {/* GitHub Button */}
      <motion.button
        type="button"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        className={socialBtn}
      >
        <RxGithubLogo size={22} /> GitHub
      </motion.button>
      
    </div>
  </motion.div>
);

export default SocialButtons;