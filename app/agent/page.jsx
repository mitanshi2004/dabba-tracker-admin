"use client";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function AgentPage() {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [insight, setInsight] = useState({
    totalToday: 0,
    aiMessage: "Fetching your performance insights..."
  });

  const COLORS = ["#22c55e", "#f59e0b"];

  // Fetch Deliveries
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/deliveries", { cache: "no-store" });
        const data = await res.json();
        setDeliveries(data);
      } catch (err) {
        console.error("Deliveries fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Fetch AI Insights
  useEffect(() => {
    async function fetchInsight() {
      try {
        const res = await fetch("/api/insights", { cache: "no-store" });
        const data = await res.json();
        setInsight(data);
      } catch (err) {
        console.error("Agent Insights error:", err);
        setInsight({
          totalToday: 0,
          aiMessage: "Unable to load AI insights."
        });
      }
    }
    fetchInsight();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-600 text-xl font-[Lexend]">
        Loading your dashboard...
      </div>
    );
  }

  const completed = deliveries.filter(d => d.status === "delivered").length;
  const pending = deliveries.filter(d => d.status === "pending").length;
  const pieData = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-[Lexend] p-6">
      {/* Header */}
      <h1 className="text-4xl font-bold text-blue-600 text-center mb-10">
        Agent Dashboard
      </h1>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
        <StatCard title="Total Deliveries" value={deliveries.length} color="text-blue-600" />
        <StatCard title="Completed" value={completed} color="text-green-600" />
        <StatCard title="Pending" value={pending} color="text-yellow-600" />
      </div>

      {/* Chart + Deliveries */}
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Pie Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Delivery Progress
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Deliveries */}
        <div className="bg-white rounded-2xl shadow-lg p-6 overflow-x-auto">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            📦 Recent Deliveries
          </h2>
          {deliveries.length === 0 ? (
            <p className="text-gray-500">No deliveries yet.</p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-600">
                  <th className="p-3 border-b">#</th>
                  <th className="p-3 border-b">Customer</th>
                  <th className="p-3 border-b">Status</th>
                </tr>
              </thead>
              <tbody>
                {deliveries.slice(-5).reverse().map((d, i) => (
                  <tr key={d._id}>
                    <td className="p-3 border-b">{i + 1}</td>
                    <td className="p-3 border-b">{d.customer?.name || "N/A"}</td>
                    <td
                      className={`p-3 border-b font-semibold ${
                        d.status === "delivered"
                          ? "text-green-600"
                          : d.status === "pending"
                          ? "text-yellow-600"
                          : "text-gray-600"
                      }`}
                    >
                      {d.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mt-12 max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">🤖 AI Insights</h2>
        <div className="border rounded-lg p-4 bg-gray-50 text-gray-700 mb-4">
          <p><b>AI:</b> {insight.aiMessage}</p>
        </div>
        <p className="text-lg font-medium text-blue-600 text-center">
          Deliveries Today: {insight.totalToday}
        </p>
      </div>
    </div>
  );
}

// Reusable small stat card
function StatCard({ title, value, color }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow text-center">
      <h3 className="text-lg text-gray-600">{title}</h3>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );
}
