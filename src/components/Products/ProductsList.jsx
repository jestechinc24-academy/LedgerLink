"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  Plus,
  Edit3,
  Trash2,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import Notification from "../UI/Notification";

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [notification, setNotification] = useState({
    message: "",
    type: "success",
  });

  const [newProduct, setNewProduct] = useState({
    name: "",
    sku: "",
    category: "",
    price: "",
    stock: "",
    minStock: "",
  });

  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  // 🔹 Load from localStorage
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const storedCategories =
      JSON.parse(localStorage.getItem("categories")) || [];
    setProducts(storedProducts);
    setCategories(storedCategories);
  }, []);

  // 🔹 Save products persistently
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products]);

  const getStatus = (stock, minStock) => {
    if (stock <= 0) return "out-of-stock";
    if (stock < minStock) return "low-stock";
    return "in-stock";
  };

  const resetForm = () => {
    setNewProduct({
      name: "",
      sku: "",
      category: "",
      price: "",
      stock: "",
      minStock: "",
    });
    setNewCategory("");
    setEditMode(false);
    setEditProductId(null);
  };

  const showNotification = (msg, type = "success") => {
    setNotification({ message: msg, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  // 🔹 Add or edit product
  const handleAddProduct = (e) => {
    e.preventDefault();

    let selectedCategory = newProduct.category;
    if (newCategory && !categories.includes(newCategory)) {
      const updatedCats = [...categories, newCategory];
      setCategories(updatedCats);
      localStorage.setItem("categories", JSON.stringify(updatedCats));
      selectedCategory = newCategory;
      showNotification("✅ New category added successfully!", "info");
    }

    const status = getStatus(
      Number(newProduct.stock),
      Number(newProduct.minStock)
    );

    if (editMode && editProductId) {
      const updated = products.map((p) =>
        p.id === editProductId
          ? {
              ...p,
              ...newProduct,
              category: selectedCategory,
              status,
              updated: new Date().toLocaleDateString(),
            }
          : p
      );
      setProducts(updated);
      showNotification("✏️ Product updated successfully!", "info");
    } else {
      const newProd = {
        id: Date.now(),
        name: newProduct.name,
        sku: newProduct.sku,
        category: selectedCategory,
        price: parseFloat(newProduct.price),
        stock: Number(newProduct.stock),
        minStock: Number(newProduct.minStock),
        status,
        updated: new Date().toLocaleDateString(),
      };
      setProducts([...products, newProd]);
      showNotification("✅ Product added successfully!", "success");
    }

    resetForm();
    setShowModal(false);
  };

  // 🔹 Delete product
  const handleDelete = (id) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
    showNotification("🗑️ Product deleted successfully!", "delete");
  };

  // 🔹 Edit product
  const handleEdit = (product) => {
    setEditMode(true);
    setEditProductId(product.id);
    setNewProduct({
      name: product.name,
      sku: product.sku,
      category: product.category,
      price: product.price,
      stock: product.stock,
      minStock: product.minStock,
    });
    setShowModal(true);
  };

  // 🔹 Search & Filter
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === "All" ||
      (filter === "In Stock" && p.status === "in-stock") ||
      (filter === "Low Stock" && p.status === "low-stock") ||
      (filter === "Out of Stock" && p.status === "out-of-stock");
    return matchesSearch && matchesFilter;
  });

  // 🔹 Calculate total potential revenue
  const totalRevenue = products
    .reduce((sum, p) => sum + p.price * p.stock, 0)
    .toFixed(2);

  // 🔹 Calculate best and worst performing categories (mock logic)
  const categorySales = categories.map((cat) => {
    const items = products.filter((p) => p.category === cat);
    const totalValue = items.reduce((sum, p) => sum + p.price * p.stock, 0);
    return { category: cat, totalValue };
  });

  const topCategory =
    categorySales.length > 0
      ? categorySales.reduce((a, b) => (a.totalValue > b.totalValue ? a : b))
      : null;

  const lowCategory =
    categorySales.length > 0
      ? categorySales.reduce((a, b) => (a.totalValue < b.totalValue ? a : b))
      : null;

  // 🔹 Status icons
  const statusIcon = {
    "in-stock": <CheckCircle size={14} className="text-green-500" />,
    "low-stock": <AlertTriangle size={14} className="text-yellow-500" />,
    "out-of-stock": <XCircle size={14} className="text-red-500" />,
  };

  return (
    <div className="p-6 space-y-6">
      {/* ✅ Notification */}
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: "", type: "" })}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] dark:text-[#DEDEDE]">
            Products
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage your product inventory
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-[#0066FF] hover:bg-[#3385FF] text-white font-medium px-4 py-2 rounded-xl flex items-center gap-2 transition-colors duration-200"
        >
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative w-full sm:w-1/2">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-gray-700 rounded-xl pl-9 pr-3 py-2 text-sm text-gray-700 dark:text-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
          />
        </div>

        <div className="flex items-center gap-2">
          <SlidersHorizontal size={18} className="text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm text-gray-700 dark:text-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
          >
            <option>All</option>
            <option>In Stock</option>
            <option>Low Stock</option>
            <option>Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6"
      >
        {filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm hover:border-blue-500/40 hover:shadow-md transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                {statusIcon[product.status]}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {product.name}
                </h3>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="text-blue-500 hover:text-blue-600"
                >
                  <Edit3 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
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
                Stock: <span className="font-medium">{product.stock}</span>
              </p>
              <p className="text-xs text-gray-500">Min: {product.minStock}</p>
            </div>
            <p className="text-xs text-gray-500 text-right">
              Updated {product.updated}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Summary Footer */}
      <div className="pt-4 text-center space-y-2">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Showing {filteredProducts.length} of {products.length} products
        </p>
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          💰 Total Potential Revenue: ${totalRevenue}
        </p>
        {topCategory && (
          <p className="text-xs text-green-500">
            🔼 Best Selling Category: {topCategory.category}
          </p>
        )}
        {lowCategory && (
          <p className="text-xs text-red-400">
            🔽 Least Performing Category: {lowCategory.category}
          </p>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
          <div className="bg-white dark:bg-[#1E1E1E] rounded-xl p-6 w-full max-w-md shadow-lg">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
              {editMode ? "Edit Product" : "Add New Product"}
            </h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <input
                type="text"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                required
                className="w-full border dark:border-gray-700 rounded-lg px-3 py-2 bg-transparent text-sm"
              />
              <input
                type="text"
                placeholder="SKU"
                value={newProduct.sku}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, sku: e.target.value })
                }
                required
                className="w-full border dark:border-gray-700 rounded-lg px-3 py-2 bg-transparent text-sm"
              />
              <select
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
                className="w-full border dark:border-gray-700 rounded-lg px-3 py-2 bg-transparent text-sm"
              >
                <option value="">Select Category</option>
                {categories.map((cat, i) => (
                  <option key={i} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Or add new category..."
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full border dark:border-gray-700 rounded-lg px-3 py-2 bg-transparent text-sm"
              />
              <input
                type="number"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                required
                className="w-full border dark:border-gray-700 rounded-lg px-3 py-2 bg-transparent text-sm"
              />
              <div className="flex gap-3">
                <input
                  type="number"
                  placeholder="Stock Level"
                  value={newProduct.stock}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, stock: e.target.value })
                  }
                  required
                  className="w-1/2 border dark:border-gray-700 rounded-lg px-3 py-2 bg-transparent text-sm"
                />
                <input
                  type="number"
                  placeholder="Min Stock"
                  value={newProduct.minStock}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, minStock: e.target.value })
                  }
                  required
                  className="w-1/2 border dark:border-gray-700 rounded-lg px-3 py-2 bg-transparent text-sm"
                />
              </div>
              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setShowModal(false);
                  }}
                  className="px-4 py-2 text-sm rounded-lg border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm rounded-lg bg-[#0066FF] hover:bg-[#3385FF] text-white"
                >
                  {editMode ? "Save Changes" : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
