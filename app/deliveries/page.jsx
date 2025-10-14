"use client";
import { useEffect, useState } from "react";
import AddDeliveryForm from "./AddDeliveryForm";

export default function DeliveriesPage() {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch all deliveries
  const fetchDeliveries = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/deliveries");
      const data = await res.json();
      setDeliveries(data);
    } catch (err) {
      console.error("Error fetching deliveries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeliveries();
  }, []);

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">📦 Delivery Management</h1>

      {/* Add new delivery */}
      <AddDeliveryForm onDeliveryAdded={fetchDeliveries} />

      {/* Delivery List */}
      {loading ? (
        <p>Loading deliveries...</p>
      ) : deliveries.length === 0 ? (
        <p className="text-gray-500">No deliveries yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {deliveries.map((d) => (
            <div
              key={d._id}
              className="border rounded-xl p-4 bg-white shadow-md hover:shadow-lg transition"
            >
              <h2 className="font-semibold text-lg mb-1">
                🧾 Order #{d._id.slice(-5).toUpperCase()}
              </h2>
              <p>👤 Customer: {d.customer?.name || "N/A"}</p>
              <p>🚚 Agent: {d.agent?.name || "N/A"}</p>
              <p>📍 Distance: {d.distanceKm || 0} km</p>
              <p>⏰ Status: <span className="font-medium">{d.status}</span></p>

              {d.pickupTime && d.deliveryTime && (
                <p>
                  ⌛ Duration:{" "}
                  {(
                    (new Date(d.deliveryTime) - new Date(d.pickupTime)) /
                    (1000 * 60)
                  ).toFixed(1)}{" "}
                  mins
                </p>
              )}
              <p className="text-sm text-gray-500 mt-1">
                Added on {new Date(d.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
