"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import ProductCard from "./ProductCard";

export default function ProductsList() {
  const allProducts = [
    {
      id: 1,
      name: "iPhone 15 Pro",
      sku: "IPH15P-256-BLK",
      category: "Smartphones",
      price: 999.99,
      stock: 45,
      minStock: 20,
      status: "in-stock",
      updated: "10/22/2025",
    },
    {
      id: 2,
      name: "Samsung Galaxy S24",
      sku: "SGS24-128-WHT",
      category: "Smartphones",
      price: 849.99,
      stock: 12,
      minStock: 15,
      status: "low-stock",
      updated: "10/22/2025",
    },
    {
      id: 3,
      name: "MacBook Air M3",
      sku: "MBA-M3-13-SLV",
      category: "Laptops",
      price: 1299.99,
      stock: 0,
      minStock: 10,
      status: "out-of-stock",
      updated: "10/22/2025",
    },
    {
      id: 4,
      name: 'Dell Monitor 27"',
      sku: "DEL-MON-27-4K",
      category: "Electronics",
      price: 349.99,
      stock: 23,
      minStock: 10,
      status: "in-stock",
      updated: "10/22/2025",
    },
    {
      id: 5,
      name: "Wireless Mouse",
      sku: "WMS-001-BLK",
      category: "Accessories",
      price: 29.99,
      stock: 8,
      minStock: 15,
      status: "low-stock",
      updated: "10/22/2025",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredProducts = allProducts.filter((p) => {
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
        <button className="bg-[#0066FF] hover:bg-[#3385FF] text-white font-medium px-4 py-2 rounded-xl transition-colors duration-200">
          + Add Product
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
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>

      {/* Footer */}
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center pt-4">
        Showing {filteredProducts.length} of {allProducts.length} products
      </p>
    </div>
  );
}
