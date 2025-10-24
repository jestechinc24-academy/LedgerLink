"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function ActivityItem({ activity }) {
  const isIncrease = activity.trend === "up";

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
      className="flex items-start justify-between py-3 px-3 rounded-lg border border-transparent
                 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-200
                 hover:shadow-sm cursor-pointer"
    >
      <div className="flex items-center space-x-3">
        <div
          className={`p-2 rounded-full transition-colors duration-200 ${
            isIncrease
              ? "bg-green-100 dark:bg-green-900/30 text-green-600"
              : "bg-red-100 dark:bg-red-900/30 text-red-600"
          }`}
        >
          {isIncrease ? (
            <ArrowUpRight size={16} />
          ) : (
            <ArrowDownRight size={16} />
          )}
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
            {activity.type}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {activity.description}
          </p>
        </div>
      </div>
      <p className="text-xs text-gray-400">{activity.time}</p>
    </motion.div>
  );
}
