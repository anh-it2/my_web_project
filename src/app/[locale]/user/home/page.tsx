"use client";
import useLoadingStore from "@/app/store/loadingStore";
import { Typography } from "antd";
import { motion } from "framer-motion";
import { useEffect } from "react";
import ChallengeProblemCard from "./components/ChallengeProblemCard";
import PopularKeywordsCard from "./components/PopularKeywordsCard";
import StatCard from "./components/StartCard";
import "./style.scss";

const { Title, Text } = Typography;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const statCardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
    },
  }),
};

export default function UserHomePage() {
  const stopLoading = useLoadingStore((state) => state.stopLoading);

  useEffect(() => {
    stopLoading();
  }, [stopLoading]);

  return (
    <motion.div
      className="home__page"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="flex flex-col h-screen p-2 gap-4 overflow-y-auto no__scroll__width">
        <motion.div
          className="flex flex-col items-center"
          variants={itemVariants}
        >
          <Title level={2} style={{ color: "rgb(174, 29, 44)" }}>
            HUSTack
          </Title>
          <Text className="text-base">
            Empower your programming journey and solve real-world problems
          </Text>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-2 items-center justify-between"
          variants={itemVariants}
        >
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={statCardVariants}
            className="w-full"
          >
            <StatCard title="problems" number={1500} />
          </motion.div>
          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            variants={statCardVariants}
            className="w-full"
          >
            <StatCard title="contests" number={1000} />
          </motion.div>
          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={statCardVariants}
            className="w-full"
          >
            <StatCard title="users" number={15000} />
          </motion.div>
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={statCardVariants}
            className="w-full"
          >
            <StatCard title="submissions" number={1500000} />
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-3 gap-2 items-start"
          variants={itemVariants}
        >
          <motion.div
            className="grid col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ChallengeProblemCard />
          </motion.div>
          <motion.div
            className="grid col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <PopularKeywordsCard />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
