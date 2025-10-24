import { useState } from "react";
import InventorySidebar from "../components/Sidebar/InventorySidebar";
import Dashboard from "../components/Dashboard/Dashboard";
import ProductsList from "../components/Products/ProductsList";
import CategoriesList from "../components/Categories/CategoriesList";
import ReportsDashboard from "../components/Reports/ReportsDashboard";
import UsersList from "../components/Users/UsersList";
import SettingsPage from "../components/Settings/SettingsPage";

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "products":
        return <ProductsList />;
      case "categories":
        return <CategoriesList />;
      case "reports":
        return <ReportsDashboard />;
      case "users":
        return <UsersList />;
      case "settings":
        return <SettingsPage />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Loading
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Feature coming soon
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-[#121212]">
      <InventorySidebar
        activeItem={activeSection}
        setActiveItem={setActiveSection}
      />
      <div className="flex-1 overflow-y-auto p-6">{renderSection()}</div>
    </div>
  );
}
