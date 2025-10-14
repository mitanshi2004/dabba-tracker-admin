"use client";
import { useState, useEffect } from "react";

export default function AddDeliveryForm({ onDeliveryAdded }) {
  const [agents, setAgents] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    customerId: "",
    agentId: "",
    pickupTime: "",
    deliveryTime: "",
    distanceKm: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 🔹 Fetch agents & customers
  useEffect(() => {
    const fetchData = async () => {
      const [custRes, agentRes] = await Promise.all([
        fetch("/api/customer"),
        fetch("/api/agents"),
      ]);
      setCustomers(await custRes.json());
      setAgents(await agentRes.json());
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/deliveries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Delivery added successfully!");
        setForm({
          customerId: "",
          agentId: "",
          pickupTime: "",
          deliveryTime: "",
          distanceKm: "",
        });
        onDeliveryAdded(); // refresh list
      } else {
        setMessage(`${data.message}`);
      }
    } catch (err) {
      setMessage("Error adding delivery");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-50 p-6 rounded-xl shadow-md space-y-4"
    >
      <h2 className="text-xl font-semibold">➕ Add New Delivery</h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Customer</label>
          <select
            name="customerId"
            value={form.customerId}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">Select Customer</option>
            {customers.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Agent</label>
          <select
            name="agentId"
            value={form.agentId}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">Select Agent</option>
            {agents.map((a) => (
              <option key={a._id} value={a._id}>
                {a.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Pickup Time</label>
          <input
            type="datetime-local"
            name="pickupTime"
            value={form.pickupTime}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Delivery Time</label>
          <input
            type="datetime-local"
            name="deliveryTime"
            value={form.deliveryTime}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Distance (km)</label>
          <input
            type="number"
            step="0.1"
            name="distanceKm"
            value={form.distanceKm}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Adding..." : "Add Delivery"}
      </button>

      {message && <p className="text-sm mt-2">{message}</p>}
    </form>
  );
}
