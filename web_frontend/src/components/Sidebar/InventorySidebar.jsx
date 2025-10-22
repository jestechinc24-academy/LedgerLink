import { LayoutGrid, Package, Folder, Settings, Users } from "lucide-react";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutGrid /> },
  { id: "products", label: "Products", icon: <Package /> },
  { id: "categories", label: "Categories", icon: <Folder /> },
  { id: "users", label: "Users", icon: <Users /> },
  { id: "settings", label: "Settings", icon: <Settings /> },
];

export default function InventorySidebar({ activeItem, setActiveItem }) {
  return (
    <aside className="w-20 bg-gray-900 text-gray-200 flex flex-col items-center py-4 space-y-6">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveItem(item.id)}
          className={`p-3 rounded-xl transition ${
            activeItem === item.id
              ? "bg-blue-600 text-white"
              : "hover:bg-gray-700"
          }`}
        >
          {item.icon}
        </button>
      ))}
    </aside>
  );
}
