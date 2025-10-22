import React, { useState, useEffect } from "react";
import {
  Package,
  AlertTriangle,
  Plus,
  Edit2,
  Trash2,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost:8000";

export default function InventoryDashboard() {
  const [products, setProducts] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [view, setView] = useState("products");
  const [formData, setFormData] = useState({
    sku: "",
    name: "",
    description: "",
    category: "",
    quantity: 0,
    reorder_level: 10,
    price: 0,
    supplier: "",
  });

  useEffect(() => {
    fetchProducts();
    fetchLowStock();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/products`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products. Please check your connection.");
    }
  };

  const fetchLowStock = async () => {
    try {
      const response = await fetch(`${API_URL}/products/low-stock/alert`);
      const data = await response.json();
      setLowStock(data);

      // if (data.length > 0) {
      //   toast.warning(`${data.length} product(s) need reordering!`, {
      //     autoClose: 5000,
      //   });
      // }
    } catch (error) {
      console.error("Error fetching low stock:", error);
      toast.error("Failed to fetch low stock alerts.");
    }
  };

  const handleSaveProduct = async () => {
    if (!formData.sku || !formData.name) {
      toast.error("SKU and Name are required fields!");
      return;
    }

    try {
      const url = currentProduct
        ? `${API_URL}/products/${currentProduct.id}`
        : `${API_URL}/products`;

      const method = currentProduct ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const savedProduct = await response.json();
        fetchProducts();
        fetchLowStock();
        resetForm();

        if (currentProduct) {
          toast.success(`Product "${savedProduct.name}" updated successfully!`);
        } else {
          toast.success(`Product "${savedProduct.name}" created successfully!`);
        }
      } else {
        const error = await response.json();
        toast.error(`Error: ${error.detail || "Failed to save product"}`);
      }
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Error saving product. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    const product = products.find((p) => p.id === id);

    if (window.confirm(`Are you sure you want to delete "${product?.name}"?`)) {
      try {
        const response = await fetch(`${API_URL}/products/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          fetchProducts();
          fetchLowStock();
          toast.success(`Product "${product?.name}" deleted successfully!`);
        } else {
          const error = await response.json();
          toast.error(`Failed to delete product: ${error.detail}`);
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("Error deleting product. Please try again.");
      }
    }
  };

  const handleStockMovement = async (productId, type) => {
    const product = products.find((p) => p.id === productId);
    const quantity = prompt(
      `Enter quantity to ${type === "in" ? "add" : "remove"}:`
    );

    if (quantity && !isNaN(quantity)) {
      const qty = parseInt(quantity);

      if (qty <= 0) {
        toast.error("Quantity must be greater than 0!");
        return;
      }

      try {
        const response = await fetch(`${API_URL}/stock-movements`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            product_id: productId,
            quantity: qty,
            movement_type: type,
            notes: `${type === "in" ? "Stock in" : "Stock out"} via dashboard`,
          }),
        });

        if (response.ok) {
          fetchProducts();
          fetchLowStock();

          if (type === "in") {
            toast.success(`Added ${qty} units to "${product?.name}"`);
          } else {
            toast.info(`Removed ${qty} units from "${product?.name}"`);
          }
        } else {
          const error = await response.json();
          toast.error(`Stock movement failed: ${error.detail}`);
        }
      } catch (error) {
        console.error("Error updating stock:", error);
        toast.error("Error updating stock. Please try again.");
      }
    } else if (quantity !== null) {
      toast.error("Please enter a valid number!");
    }
  };

  const editProduct = (product) => {
    setCurrentProduct(product);
    setFormData({
      sku: product.sku,
      name: product.name,
      description: product.description || "",
      category: product.category || "",
      quantity: product.quantity,
      reorder_level: product.reorder_level,
      price: product.price,
      supplier: product.supplier || "",
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      sku: "",
      name: "",
      description: "",
      category: "",
      quantity: 0,
      reorder_level: 10,
      price: 0,
      supplier: "",
    });
    setCurrentProduct(null);
    setShowModal(false);
  };

  const totalValue = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const totalItems = products.reduce((sum, p) => sum + p.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Package className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">LedgerLink</h1>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <Plus className="w-5 h-5" />
              Add Product
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Products</p>
                <p className="text-3xl font-bold text-gray-900">
                  {products.length}
                </p>
              </div>
              <Package className="w-12 h-12 text-blue-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Items</p>
                <p className="text-3xl font-bold text-gray-900">{totalItems}</p>
              </div>
              <TrendingUp className="w-12 h-12 text-green-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Value</p>
                <p className="text-3xl font-bold text-gray-900">
                  ${totalValue.toFixed(2)}
                </p>
              </div>
              <TrendingUp className="w-12 h-12 text-purple-600" />
            </div>
          </div>
        </div>

        {lowStock.length > 0 && (
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6 rounded">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <p className="text-amber-800 font-semibold">
                {lowStock.length} product(s) need reordering
              </p>
            </div>
          </div>
        )}

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setView("products")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              view === "products"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            All Products
          </button>
          <button
            onClick={() => setView("lowstock")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              view === "lowstock"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Low Stock
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  SKU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {(view === "products" ? products : lowStock).map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.sku}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 py-1 rounded ${
                        product.quantity <= product.reorder_level
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {product.quantity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStockMovement(product.id, "in")}
                        className="text-green-600 hover:text-green-800"
                        title="Add Stock"
                      >
                        <TrendingUp className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleStockMovement(product.id, "out")}
                        className="text-orange-600 hover:text-orange-800"
                        title="Remove Stock"
                      >
                        <TrendingDown className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => editProduct(product)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {currentProduct ? "Edit Product" : "Add New Product"}
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SKU *
                  </label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) =>
                      setFormData({ ...formData, sku: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Supplier
                  </label>
                  <input
                    type="text"
                    value={formData.supplier}
                    onChange={(e) =>
                      setFormData({ ...formData, supplier: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        quantity: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reorder Level *
                  </label>
                  <input
                    type="number"
                    value={formData.reorder_level}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        reorder_level: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex gap-3 justify-end mt-6">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveProduct}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  {currentProduct ? "Update" : "Create"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
