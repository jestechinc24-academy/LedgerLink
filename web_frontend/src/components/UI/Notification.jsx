"use client";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Trash2, Info } from "lucide-react";

export default function Notification({ message, type = "success", onClose }) {
  const icons = {
    success: <CheckCircle className="text-green-500" size={22} />,
    error: <XCircle className="text-red-500" size={22} />,
    delete: <Trash2 className="text-orange-500" size={22} />,
    info: <Info className="text-blue-500" size={22} />,
  };

  const bgColors = {
    success: "bg-green-50 dark:bg-green-900/30 border-green-400",
    error: "bg-red-50 dark:bg-red-900/30 border-red-400",
    delete: "bg-orange-50 dark:bg-orange-900/30 border-orange-400",
    info: "bg-blue-50 dark:bg-blue-900/30 border-blue-400",
  };

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          key="notification"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.3 }}
          className={`fixed top-5 right-5 flex items-center gap-3 px-4 py-3 rounded-xl shadow-md border ${bgColors[type]} z-50`}
        >
          {icons[type]}
          <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
            {message}
          </span>
          <button
            onClick={onClose}
            className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
