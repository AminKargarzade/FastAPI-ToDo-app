// Animation settings for the auth page. Change these to tune the feel.

// The big swap between the form side and the image side
export const slide = { duration: 0.8, ease: [0.77, 0, 0.175, 1] };

// The form fades in, then its children rise in one after another
export const formVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, delayChildren: 0.1, staggerChildren: 0.06 },
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};