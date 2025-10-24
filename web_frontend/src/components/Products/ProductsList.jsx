"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, Plus } from "lucide-react";
import ProductCard from "./ProductCard";

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

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

  // Load localStorage
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const storedCategories =
      JSON.parse(localStorage.getItem("categories")) || [];
    setProducts(storedProducts);
    setCategories(storedCategories);
  }, []);

  // Save to localStorage whenever changed
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
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

  const handleAddProduct = (e) => {
    e.preventDefault();

    let selectedCategory = newProduct.category;
    if (newCategory && !categories.includes(newCategory)) {
      const updatedCats = [...categories, newCategory];
      setCategories(updatedCats);
      localStorage.setItem("categories", JSON.stringify(updatedCats));
      selectedCategory = newCategory;
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
    }

    resetForm();
    setShowModal(false);
  };

  const handleDelete = (id) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
  };

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

  return (
    <div className="p-6 space-y-6">
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
          >
            <ProductCard
              product={product}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </motion.div>
        ))}
      </motion.div>

      <p className="text-sm text-gray-500 dark:text-gray-400 text-center pt-4">
        Showing {filteredProducts.length} of {products.length} products
      </p>

      {/* Add/Edit Product Modal */}
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
