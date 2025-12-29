// MotionRow.tsx
import { motion } from "framer-motion";
import { tableRowVariants } from "./motion";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MotionRow = (props: any) => {
  return (
    <motion.tr
      {...props}
      variants={tableRowVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={{ scale: 1.01, backgroundColor: "rgba(0, 0, 0, 0.02)" }}
      layout
    />
  );
};
