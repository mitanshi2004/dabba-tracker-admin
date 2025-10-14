"use client";
import { useEffect, useState } from "react";

export default function CustomersPage() {
  const [customer, setCustomer] = useState([]);
  const [agents, setAgents] = useState([]);

  const [form, setForm] = useState({ name: "", contact: "", area: "", agent: "" });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", contact: "", area: "", agent: "" });

  const getCustomer = async () => {
    const res = await fetch("/api/customer");
    const data = await res.json();
    setCustomer(data);
  };

  useEffect(() => {
    getCustomer();
  }, []);

  // Add new agent
  const addCustomer = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/customer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      setForm({ name: "", contact: "", area: "", agent: "" });
      getCustomer();
    } else {
      const data = await res.json();
      alert("Error: " + data.message);
    }
  };

  // Save edited customer
  const saveEdit = async (id) => {
    const res = await fetch(`/api/customer/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });
    if (res.ok) {
      setEditingId(null);
      getCustomer();
    } else {
      const data = await res.json();
      alert("Error: " + data.message);
    }
  };

  // Delete customer
  const deleteCustomer = async (id) => {
    if (!confirm("Are you sure you want to delete this customer?")) return;
    const res = await fetch(`/api/customer/${id}`, { method: "DELETE" });
    if (res.ok) getCustomer();
  };
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await fetch("/api/agents");
        if (!res.ok) throw new Error("Failed to fetch agents");
        const data = await res.json();
        setAgents(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAgents();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Dabba Customer</h1>

      {/* Add Customer Form */}
      <form onSubmit={addCustomer} className="space-y-3 mb-6">
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
        <select
          value={form.agent}
          onChange={(e) => setForm({ ...form, agent: e.target.value })}
          className="border p-2 rounded w-full"
          required
        >
          <option value="">Select Agent</option>
          {agents.map((agent) => (
            <option key={agent._id} value={agent._id}>
              {agent.name}
            </option>
          ))}
        </select>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Customer
        </button>
      </form>

      {/* Customers */}
      <table className="w-full border border-gray-300 text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Contact</th>
            <th className="border p-2">Area</th>
            <th className="border p-2">Agent Assigned</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customer.map((a) => (
            <tr key={a._id}>
              <td className="border p-2">
                {editingId === a._id ? (
                  <input
                    type="text"
                    value={editForm.name || ""}
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
                    value={editForm.contact || ""}
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
                    value={editForm.area || ""}
                    onChange={(e) => setEditForm({ ...editForm, area: e.target.value })}
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  a.area
                )}
              </td>
              <td className="border p-2">
                {editingId === a._id ? (
                  <select
                    value={editForm.agent || ""}
                    onChange={(e) => setEditForm({ ...editForm, agent: e.target.value })}
                    className="border p-1 rounded w-full"
                  >
                    <option value="">Select Agent</option>
                    {agents.map((agent) => (
                      <option key={agent._id} value={agent._id}>
                        {agent.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  a.agent?.name || "N/A" //agar agent nhi toh na
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
                          agent: a.agent,
                        });
                      }}
                      className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCustomer(a._id)}
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
