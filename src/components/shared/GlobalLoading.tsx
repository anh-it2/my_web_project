"use client";

import useLoadingStore from "@/app/store/loadingStore";
import { Spin } from "antd";
import { motion, AnimatePresence } from "framer-motion";

const loadingVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function GlobalLoading() {
  const isLoading = useLoadingStore((state) => state.isLoading);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="loading"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-sm"
          variants={loadingVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.2 }}
        >
          <div className="flex flex-col items-center gap-3 rounded-lg bg-white px-6 py-5 shadow-lg">
            <Spin size="large" />
            <span className="text-sm text-gray-600">Loading...</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

