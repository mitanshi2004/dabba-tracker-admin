"use client";
import { useEffect, useState } from "react";

export default function AgentsPage() {
  const [agents, setAgents] = useState([]);
  const [form, setForm] = useState({ name: "", contact: "", area: "", totalCustomers: "" });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", contact: "", area: "", totalCustomers: "" });

  const getAgents = async () => {
    const res = await fetch("/api/agents");
    const data = await res.json();
    setAgents(data);
  };

  useEffect(() => {
    getAgents();
  }, []);

  // Add new agent
  const addAgent = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/agents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, totalCustomers: Number(form.totalCustomers) }),
    });
    if (res.ok) {
      setForm({ name: "", contact: "", area: "", totalCustomers: "" });
      getAgents();
    } else {
      const data = await res.json();
      alert("Error: " + data.message);
    }
  };

  // Save edited agent
  const saveEdit = async (id) => {
    const res = await fetch(`/api/agents/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });
    if (res.ok) {
      setEditingId(null);
      getAgents();
    } else {
      const data = await res.json();
      alert("Error: " + data.message);
    }
  };

  // Delete agent
  const deleteAgent = async (id) => {
    if (!confirm("Are you sure you want to delete this agent?")) return;
    const res = await fetch(`/api/agents/${id}`, { method: "DELETE" });
    if (res.ok) getAgents();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Delivery Agents</h1>

      {/* Add Agent Form */}
      <form onSubmit={addAgent} className="space-y-3 mb-6">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          placeholder="Contact"
          value={form.contact}
          onChange={(e) => setForm({ ...form, contact: e.target.value })}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          placeholder="Area"
          value={form.area}
          onChange={(e) => setForm({ ...form, area: e.target.value })}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="number"
          placeholder="Total Customers"
          value={form.totalCustomers}
          onChange={(e) => setForm({ ...form, totalCustomers: e.target.value })}
          className="border p-2 rounded w-full"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Agent
        </button>
      </form>

      {/* Agents Table */}
      <table className="w-full border border-gray-300 text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Contact</th>
            <th className="border p-2">Area</th>
            <th className="border p-2">Customers Assigned</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((a) => (
            <tr key={a._id}>
              <td className="border p-2">
                {editingId === a._id ? (
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  a.name
                )}
              </td>
              <td className="border p-2">
                {editingId === a._id ? (
                  <input
                    type="text"
                    value={editForm.contact}
                    onChange={(e) => setEditForm({ ...editForm, contact: e.target.value })}
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  a.contact
                )}
              </td>
              <td className="border p-2">
                {editingId === a._id ? (
                  <input
                    type="text"
                    value={editForm.area}
                    onChange={(e) => setEditForm({ ...editForm, area: e.target.value })}
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  a.area
                )}
              </td>
              <td className="border p-2">
                {editingId === a._id ? (
                  <input
                    type="number"
                    value={editForm.totalCustomers}
                    onChange={(e) => setEditForm({ ...editForm, totalCustomers: e.target.value })}
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  a.totalCustomers
                )}
              </td>
              <td className="border p-2 space-x-2">
                {editingId === a._id ? (
                  <>
                    <button
                      onClick={() => saveEdit(a._id)}
                      className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setEditingId(a._id);
                        setEditForm({
                          name: a.name,
                          contact: a.contact,
                          area: a.area,
                          totalCustomers: a.totalCustomers,
                        });
                      }}
                      className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteAgent(a._id)}
                      className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
