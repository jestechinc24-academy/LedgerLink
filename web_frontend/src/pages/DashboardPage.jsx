import { useState } from "react";
import InventorySidebar from "../components/Sidebar/InventorySidebar";
import Dashboard from "../components/Dashboard/Dashboard";
import ProductsList from "../components/Products/ProductsList";

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "products":
        return <ProductsList />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-[#121212]">
      <InventorySidebar
        activeItem={activeSection}
        setActiveItem={setActiveSection}
      />
      <div className="flex-1 overflow-y-auto">{renderSection()}</div>
    </div>
  );
}
