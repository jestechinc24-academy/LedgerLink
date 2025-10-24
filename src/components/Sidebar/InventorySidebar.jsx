"use client";
import { useState } from "react";
import {
  LayoutGrid,
  Package,
  Folder,
  Settings,
  Users,
  ShoppingCart,
  Truck,
  BarChart3,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutGrid size={20} /> },
  { id: "products", label: "Products", icon: <Package size={20} /> },
  { id: "orders", label: "Orders", icon: <ShoppingCart size={20} /> },
  { id: "suppliers", label: "Suppliers", icon: <Truck size={20} /> },
  { id: "reports", label: "Reports", icon: <BarChart3 size={20} /> },
  { id: "categories", label: "Categories", icon: <Folder size={20} /> },
  { id: "users", label: "Users", icon: <Users size={20} /> },
  { id: "settings", label: "Settings", icon: <Settings size={20} /> },
];

export default function InventorySidebar({ activeItem, setActiveItem }) {
  const [hovered, setHovered] = useState(null);

  return (
    <aside className="w-20 bg-gray-900 text-gray-200 flex flex-col items-center py-4 space-y-6 relative">
      {navItems.map((item) => (
        <div key={item.id} className="relative flex flex-col items-center">
          <button
            onClick={() => setActiveItem(item.id)}
            onMouseEnter={() => setHovered(item.id)}
            onMouseLeave={() => setHovered(null)}
            className={`p-3 rounded-2xl transition-all duration-200 flex items-center justify-center
              ${
                activeItem === item.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                  : "hover:bg-gray-700 hover:text-blue-400"
              }`}
          >
            {item.icon}
          </button>

          {/* Tooltip */}
          <AnimatePresence>
            {hovered === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 5, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute left-16 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs
                           font-medium py-1.5 px-3 rounded-lg shadow-md whitespace-nowrap z-50"
              >
                {item.label}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </aside>
  );
}
