"use client";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export default function LowStockItem({ product }) {
  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
      className="flex items-center justify-between py-3 px-3 rounded-lg border border-transparent
                 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-200
                 hover:shadow-sm cursor-pointer"
    >
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600">
          <AlertTriangle size={16} />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
            {product.name}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Stock: {product.stock} left
          </p>
        </div>
      </div>
      <button className="text-xs text-[#0066FF] dark:text-[#4A90E2] font-medium hover:opacity-80">
        Restock
      </button>
    </motion.div>
  );
}
