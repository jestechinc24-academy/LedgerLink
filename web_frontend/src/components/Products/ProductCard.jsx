import { motion } from "framer-motion";
import { MoreVertical } from "lucide-react";

export default function ProductCard({ product }) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#F1F3F8] dark:border-gray-700 p-5 shadow-sm hover:border-blue-500/40 hover:shadow-md transition-all duration-300"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {product.name}
        </h3>
        <MoreVertical size={16} className="text-gray-400" />
      </div>
      <p className="text-xs text-gray-500 mb-1">SKU: {product.sku}</p>
      <p className="text-sm text-gray-500 mb-3">
        Category: <span className="font-medium">{product.category}</span>
      </p>
      <p className="text-sm text-gray-400 mb-2">
        Price:{" "}
        <span className="font-semibold text-gray-900 dark:text-gray-100">
          ${product.price.toFixed(2)}
        </span>
      </p>
      <div className="flex justify-between items-center mb-4">
        <p className="text-xs text-gray-500">
          Stock Level: <span className="font-medium">{product.stock}</span>
        </p>
        <p className="text-xs text-gray-500">Min Stock: {product.minStock}</p>
      </div>

      <div className="flex items-center justify-between">
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${
            product.status === "in-stock"
              ? "bg-green-100 dark:bg-green-900/30 text-green-600"
              : product.status === "low-stock"
              ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600"
              : "bg-red-100 dark:bg-red-900/30 text-red-600"
          }`}
        >
          {product.status === "in-stock"
            ? "In Stock"
            : product.status === "low-stock"
            ? "Low Stock"
            : "Out of Stock"}
        </span>
        <p className="text-xs text-gray-500">Updated {product.updated}</p>
      </div>
    </motion.div>
  );
}
