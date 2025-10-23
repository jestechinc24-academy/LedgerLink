import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function ReportsDashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Dummy data — replace with API call or computed values
    setData([
      { name: "Smartphones", income: 15000, stock: 30, lowStock: 5 },
      { name: "Laptops", income: 22000, stock: 20, lowStock: 2 },
      { name: "Accessories", income: 5000, stock: 50, lowStock: 4 },
    ]);
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        Reports
      </h1>
      <p className="text-gray-500 dark:text-gray-400">
        Overview of category performance
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-[#1E1E1E] p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Net Income by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="income" fill="#4A90E2" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-[#1E1E1E] p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Stock Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                dataKey="stock"
                nameKey="name"
                outerRadius={100}
                fill="#4A90E2"
                label
              >
                {data.map((_, i) => (
                  <Cell
                    key={i}
                    fill={["#4A90E2", "#00C49F", "#FFBB28"][i % 3]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
