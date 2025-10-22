import { Package, AlertTriangle, Folder, TrendingUp } from "lucide-react";
import ActivityItem from "./ActivityItem";
import LowStockItem from "./LowStockItem";

export default function Dashboard() {
  const stats = {
    overview: [
      {
        label: "Total Products",
        value: 5,
        icon: <Package className="w-6 h-6 text-blue-400" />,
        change: "↑ 12% from last month",
        changeColor: "text-green-500",
      },
      {
        label: "Categories",
        value: 4,
        icon: <Folder className="w-6 h-6 text-green-400" />,
        change: "Stable",
        changeColor: "text-gray-400",
      },
      {
        label: "Low Stock Items",
        value: 3,
        icon: <AlertTriangle className="w-6 h-6 text-yellow-400" />,
        change: "↓ 3 items critical",
        changeColor: "text-red-500",
      },
      {
        label: "Total Value",
        value: "$63,489.12",
        icon: <TrendingUp className="w-6 h-6 text-green-400" />,
        change: "↑ 8% from last month",
        changeColor: "text-green-500",
      },
    ],
    recentActivity: [
      {
        id: 1,
        type: "Stock added",
        description: "iPhone 15 Pro • 50 items",
        time: "3 hours ago",
        trend: "up",
      },
      {
        id: 2,
        type: "Stock decreased",
        description: "MacBook Air • 5 items sold",
        time: "6 hours ago",
        trend: "down",
      },
      {
        id: 3,
        type: "New category added",
        description: "Smart Accessories",
        time: "1 day ago",
        trend: "up",
      },
    ],
    lowStockProducts: [
      { id: 1, name: "Apple Watch Series 9", stock: 3 },
      { id: 2, name: "AirPods Pro 2", stock: 2 },
      { id: 3, name: "Magic Keyboard", stock: 1 },
    ],
  };

  return (
    <div className="p-6 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
      <p className="text-gray-500 mb-6">
        Overview of your inventory management system
      </p>

      {/* Stats Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.overview.map((stat, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-gray-100 dark:bg-[#1E1E1E] shadow-sm flex flex-col"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">{stat.label}</h2>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div>{stat.icon}</div>
            </div>
            <p className={`text-sm mt-3 ${stat.changeColor}`}>{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity + Low Stock Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#F1F3F8] dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[#111827] dark:text-[#DEDEDE] text-lg font-bold">
              Recent Activity
            </h3>
            <button className="text-[#0066FF] dark:text-[#4A90E2] text-sm font-medium hover:opacity-80">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {stats.recentActivity.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#F1F3F8] dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[#111827] dark:text-[#DEDEDE] text-lg font-bold">
              Low Stock Alert
            </h3>
            <button className="text-[#0066FF] dark:text-[#4A90E2] text-sm font-medium hover:opacity-80">
              Manage Stock
            </button>
          </div>
          <div className="space-y-3">
            {stats.lowStockProducts.map((product) => (
              <LowStockItem key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
