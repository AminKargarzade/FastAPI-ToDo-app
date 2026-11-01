import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "motion/react";
import { itemVariants } from "./motion";

// A reusable input component with an icon, and an eye toggle for passwords
const Field = ({ id, label, icon: Icon, type = "text", ...props }) => {
  const [show, setShow] = useState(false);
  
  // Check if this field is a password type
  const isPassword = type === "password";

  return (
    // Applies the staggered slide-up animation from parent
    <motion.div variants={itemVariants} className="grid gap-2">
      <label htmlFor={id} className="text-sm font-bold">
        {label}
      </label>
      
      {/* 
        group: Allows child elements (like the icon box) to react to the input's focus state
        focus-within: Applies styles to the wrapper when the input inside is clicked
      */}
      <div className="group flex items-center gap-2 rounded-2xl border-2 border-teal-100 bg-teal-50/60 p-2 transition-all duration-200 focus-within:border-teal-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-teal-500/20">
        
        {/* Icon box: changes background to teal-500 when the input is focused */}
        <span className="p-2 bg-teal-100 rounded-xl transition-colors duration-200 group-focus-within:bg-teal-500 group-focus-within:text-white">
          <Icon size={18} />
        </span>
        
        {/* The actual input field (switches type between text/password based on show state) */}
        <input
          id={id}
          type={isPassword && show ? "text" : type}
          required
          className="outline-none flex-1 min-w-0 bg-transparent"
          {...props}
        />
        
        {/* Eye toggle button (only shows if it's a password field) */}
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