import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function AddProductModal({ onClose, onAdd }) {
  const [productName, setProductName] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [stockLevel, setStockLevel] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("categories")) || [];
    setCategories(saved);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productName || !category) return;

    const newProduct = {
      id: Date.now(),
      name: productName,
      sku,
      price: parseFloat(price),
      stockLevel: parseInt(stockLevel, 10),
      category,
    };

    onAdd(newProduct);
    onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="bg-white dark:bg-[#1E1E1E] p-6 rounded-xl w-full max-w-lg"
      >
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Name */}
          <input
            type="text"
            placeholder="Product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white"
          />

          {/* SKU */}
          <input
            type="text"
            placeholder="SKU"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white"
          />

          {/* Category Dropdown */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white"
          >
            <option value="">Select Category</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Price */}
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white"
          />

          {/* Stock Level */}
          <input
            type="number"
            placeholder="Stock Level"
            value={stockLevel}
            onChange={(e) => setStockLevel(e.target.value)}
            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white"
          />

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-md text-gray-800 dark:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              Add
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
