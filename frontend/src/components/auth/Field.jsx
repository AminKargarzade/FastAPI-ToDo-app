import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "motion/react";
import { itemVariants } from "./motion";

// Input with an icon on the left (and an eye button for password fields)
const Field = ({ id, label, icon: Icon, type = "text", ...props }) => {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <motion.div variants={itemVariants} className="grid gap-2">
      <label htmlFor={id} className="text-sm font-bold">
        {label}
      </label>
      <div className="group flex items-center gap-2 rounded-2xl border-2 border-teal-100 bg-teal-50/60 p-2 transition-all duration-200 focus-within:border-teal-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-teal-500/20">
        <span className="p-2 bg-teal-100 rounded-xl transition-colors duration-200 group-focus-within:bg-teal-500 group-focus-within:text-white">
          <Icon size={18} />
        </span>
        <input
          id={id}
          type={isPassword && show ? "text" : type}
          required
          className="outline-none flex-1 min-w-0 bg-transparent"
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            aria-label={show ? "Hide password" : "Show password"}
            className="ml-auto text-teal-800/60 transition-colors hover:text-teal-700"
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default Field;