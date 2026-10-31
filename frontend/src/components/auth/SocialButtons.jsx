import { motion } from "motion/react";
import { RxGithubLogo } from "react-icons/rx";
import { FcGoogle } from "react-icons/fc";
import { itemVariants } from "./motion";

const socialBtn =
  "flex items-center justify-center gap-2 border-2 rounded-2xl border-teal-100 bg-white py-2 text-sm font-bold text-teal-900 transition-colors hover:border-teal-300 hover:bg-teal-50";

// Divider + Google / GitHub buttons
const SocialButtons = () => (
  <motion.div variants={itemVariants} className="grid gap-4">
    <div className="flex items-center py-2">
      <div className="grow border-t border-teal-100"></div>
      <span className="shrink-0 mx-4 text-xs text-teal-800/50">
        Or continue with
      </span>
      <div className="grow border-t border-teal-100"></div>
    </div>
    <div className="grid grid-cols-2 gap-3">
      <motion.button
        type="button"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        className={socialBtn}
      >
        <FcGoogle size={22} /> Google
      </motion.button>
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