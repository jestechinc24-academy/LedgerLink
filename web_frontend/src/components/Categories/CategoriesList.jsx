import { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import AddCategoryModal from "./AddCategoryModal";

export default function CategoriesList() {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Fetch existing categories
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("categories")) || [];
    setCategories(saved);
  }, []);

  const addCategory = (newCat) => {
    if (!categories.find((c) => c.toLowerCase() === newCat.toLowerCase())) {
      const updated = [...categories, newCat];
      setCategories(updated);
      localStorage.setItem("categories", JSON.stringify(updated));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Categories
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition"
        >
          <PlusCircle size={18} />
          Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat, i) => (
          <div
            key={i}
            className="p-4 bg-white dark:bg-[#1E1E1E] rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
              {cat}
            </h2>
          </div>
        ))}
      </div>

      {showModal && (
        <AddCategoryModal
          onClose={() => setShowModal(false)}
          onAdd={addCategory}
        />
      )}
    </div>
  );
}
