import { useState } from "react";
import InventorySidebar from "../components/Sidebar/InventorySidebar";
import Dashboard from "../components/Dashboard/Dashboard";
import ProductsList from "../components/Products/ProductsList";

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState("dashboard");

  const ComingSoon = ({ title }) => (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
        {title}
      </h1>
      <p className="text-gray-500 dark:text-gray-400 text-lg">
        Feature coming soon...
      </p>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "products":
        return <ProductsList />;
      case "users":
        return <ComingSoon title="Users" />;
      case "orders":
        return <ComingSoon title="Orders" />;
      case "suppliers":
        return <ComingSoon title="Suppliers" />;
      case "reports":
        return <ComingSoon title="Reports" />;
      case "categories":
        return <ComingSoon title="Categories" />;
      case "settings":
        return <ComingSoon title="Settings" />;
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
