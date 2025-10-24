"use client";
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import {
  PackageCheck,
  PackageX,
  AlertTriangle,
  PieChart as PieIcon,
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
} from "lucide-react";

export default function Reports() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
  }, []);

  // Group products by category
  const categoryData = Object.values(
    products.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = {
          category: product.category,
          totalStock: 0,
          totalValue: 0,
          revenue: 0,
        };
      }
      acc[product.category].totalStock += Number(product.stock);
      acc[product.category].totalValue += product.price * product.stock;
      acc[product.category].revenue += (product.sales || 0) * product.price;
      return acc;
    }, {})
  );

  // Calculate status counts
  const statusCounts = {
    in: products.filter((p) => p.status === "in-stock").length,
    low: products.filter((p) => p.status === "low-stock").length,
    out: products.filter((p) => p.status === "out-of-stock").length,
  };

  // Identify top and least performing category
  const sortedByRevenue = [...categoryData].sort(
    (a, b) => b.revenue - a.revenue
  );

  const topCategory = sortedByRevenue[0];
  const leastCategory = sortedByRevenue[sortedByRevenue.length - 1];

  // Total potential revenue
  const totalPotentialRevenue = categoryData.reduce(
    (sum, c) => sum + c.totalValue,
    0
  );

  const COLORS = ["#0066FF", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#111827] dark:text-[#DEDEDE]">
          Reports
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Inventory and sales analytics overview
        </p>
      </div>

      {/* Status Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          whileHover={{ y: -3 }}
          className="flex items-center gap-3 bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-200 dark:border-green-700"
        >
          <PackageCheck className="text-green-600 dark:text-green-400" />
          <div>
            <p className="text-xs text-gray-500">In Stock</p>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {statusCounts.in}
            </h3>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -3 }}
          className="flex items-center gap-3 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-xl border border-yellow-200 dark:border-yellow-700"
        >
          <AlertTriangle className="text-yellow-600 dark:text-yellow-400" />
          <div>
            <p className="text-xs text-gray-500">Low Stock</p>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {statusCounts.low}
            </h3>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -3 }}
          className="flex items-center gap-3 bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-200 dark:border-red-700"
        >
          <PackageX className="text-red-600 dark:text-red-400" />
          <div>
            <p className="text-xs text-gray-500">Out of Stock</p>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {statusCounts.out}
            </h3>
          </div>
        </motion.div>
      </div>

      {/* Top & Least Performing Categories */}
      {categoryData.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-4 flex items-center gap-3"
          >
            <TrendingUp className="text-blue-600 dark:text-blue-400" />
            <div>
              <p className="text-xs text-gray-500">Top Performing Category</p>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {topCategory?.category || "N/A"}
              </h3>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-xl p-4 flex items-center gap-3"
          >
            <TrendingDown className="text-purple-600 dark:text-purple-400" />
            <div>
              <p className="text-xs text-gray-500">Least Performing Category</p>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {leastCategory?.category || "N/A"}
              </h3>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700 rounded-xl p-4 flex items-center gap-3"
          >
            <DollarSign className="text-emerald-600 dark:text-emerald-400" />
            <div>
              <p className="text-xs text-gray-500">Potential Total Revenue</p>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                ${totalPotentialRevenue.toFixed(2)}
              </h3>
            </div>
          </motion.div>
        </div>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Stock Levels */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white dark:bg-[#1E1E1E] rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="text-blue-500" />
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Stock Levels by Category
            </h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <XAxis dataKey="category" stroke="#888" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="totalStock" fill="#0066FF" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Inventory Value Pie */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white dark:bg-[#1E1E1E] rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-4">
            <PieIcon className="text-purple-500" />
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Inventory Value by Category
            </h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="totalValue"
                nameKey="category"
                outerRadius={110}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
        Reports generated from your local inventory data.
      </p>
    </div>
  );
}
