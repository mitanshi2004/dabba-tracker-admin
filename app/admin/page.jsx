"use client";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

function AIInsights() {
  const [insight, setInsight] = useState({
    totalToday: 0,
    aiMessage: "Loading AI insights..."
  });

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const res = await fetch("/api/insights", { cache: "no-store" });
        const data = await res.json();
        setInsight(data);
      } catch (err) {
        console.error("AI Insights fetch error:", err);
        setInsight({
          totalToday: 0,
          aiMessage: "Failed to fetch insights."
        });
      }
    };
    fetchInsights();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-12 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">🤖 AI Insights</h2>
      <div className="border rounded-lg h-64 p-4 overflow-y-auto bg-gray-50 text-gray-700 mb-4">
        <p><b>AI:</b> {insight.aiMessage}</p>
      </div>
      <p className="text-lg font-medium text-purple-600 text-center">
        Total Deliveries Today: {insight.totalToday}
      </p>
    </div>
  );
}

export default function AdminDashboard() {
  const [data, setData] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);

  const COLORS = ["#8884d8", "#82ca9d"];

  useEffect(() => {
    async function fetchStats() {
      try {
        const [agentRes, custRes, delivRes] = await Promise.all([
          fetch("/api/agents", { cache: "no-store" }),
          fetch("/api/customer", { cache: "no-store" }),
          fetch("/api/deliveries", { cache: "no-store" }),
        ]);

        if (!agentRes.ok || !custRes.ok || !delivRes.ok) {
          throw new Error("One or more API calls failed");
        }

        const agents = await agentRes.json();
        const customers = await custRes.json();
        const deliveriesData = await delivRes.json();

        setData([
          { name: "Agents", value: agents.length },
          { name: "Customers", value: customers.length },
        ]);
        setDeliveries(deliveriesData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl text-gray-600 font-[Lexend]">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-[Lexend] p-6">
      {/* Header */}
      <h1 className="text-4xl font-bold text-purple-600 text-center mb-10">
        Admin Dashboard
      </h1>

      {/* Top Buttons */}
      <div className="flex justify-center gap-6 mb-10">
        <a href="/admin/agents" className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          Manage Agents
        </a>
        <a href="/admin/customer" className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
          Manage Customers
        </a>
        <a href="/deliveries" className="px-8 py-3 bg-red-500 text-white rounded-lg hover:bg-green-600 transition">
          Delivery Management
        </a>
      </div>

      {/* Dashboard Section */}
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Pie Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Agents vs Customers</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Delivery Status Table */}
        <div className="bg-white rounded-2xl shadow-lg p-6 overflow-x-auto">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            🚚 Recent Deliveries ({deliveries.length})
          </h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600">
                <th className="p-3 border-b">#</th>
                <th className="p-3 border-b">Customer</th>
                <th className="p-3 border-b">Agent</th>
                <th className="p-3 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {deliveries.slice(-5).reverse().map((d, i) => (
                <tr key={d._id}>
                  <td className="p-3 border-b">{i + 1}</td>
                  <td className="p-3 border-b">{d.customer?.name || "N/A"}</td>
                  <td className="p-3 border-b">{d.agent?.name || "N/A"}</td>
                  <td className={`p-3 border-b font-semibold ${
                    d.status === "delivered" ? "text-green-600" :
                    d.status === "pending" ? "text-yellow-600" : "text-gray-600"
                  }`}>
                    {d.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Insights */}
      <AIInsights />
    </div>
  );
}
