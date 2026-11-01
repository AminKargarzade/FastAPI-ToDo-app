// The big swap between the form side and the image side
export const slide = { 
  duration: 0.8,
  ease: [0.77, 0, 0.175, 1] // Custom speed curve (starts slow, speeds up, slows down)
};

// Apply this to the PARENT wrapper (e.g., <motion.form> or the whole form container)
export const formVariants = {
  // Starting state: invisible and slightly shrunk (95%)
  hidden: { 
    opacity: 0, 
    scale: 0.95 
  },
  // Visible state: fades in and returns to 100% size
  show: {
    opacity: 1,
    scale: 1,
    transition: { 
      duration: 0.4, 
      delayChildren: 0.1, // Waits 0.1s before starting child animations
      staggerChildren: 0.06 // 0.06s delay between each child animating
    },
  },
  // Leaving state: fades out and shrinks before disappearing
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    transition: { duration: 0.2 }
  },
};

// Apply this to the CHILD items inside the form (e.g., inputs, buttons, SocialButtons)
export const itemVariants = {
  // Starting state: invisible and pushed down 16 pixels
  hidden: { 
    opacity: 0, 
    y: 16 
  },
  // Visible state: fades in and slides up to its normal position
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.4, 
      ease: "easeOut" // Starts fast, slows down smoothly at the end
    } 
  },
};