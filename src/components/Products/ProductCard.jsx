import { motion } from "framer-motion";
import {
  MoreVertical,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Edit2,
  Trash2,
} from "lucide-react";

export default function ProductCard({ product, onDelete, onEdit }) {
  const getStatusIcon = () => {
    if (product.status === "in-stock")
      return <CheckCircle2 className="text-green-500" size={16} />;
    if (product.status === "low-stock")
      return <AlertTriangle className="text-yellow-500" size={16} />;
    return <XCircle className="text-red-500" size={16} />;
  };

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#F1F3F8] dark:border-gray-700 p-5 shadow-sm hover:border-blue-500/40 hover:shadow-md transition-all duration-300"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {product.name}
          </h3>
        </div>
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

      <div className="flex justify-between items-center pt-2 border-t dark:border-gray-700">
        <p className="text-xs text-gray-500">Updated {product.updated}</p>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(product)}
            className="text-blue-500 hover:text-blue-600"
          >
            <Edit2 size={14} />
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="text-red-500 hover:text-red-600"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
