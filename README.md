# 📦 Dabba Tracker

**Dabba Tracker** is a Next.js based delivery management system designed to track and manage tiffin (dabba) deliveries efficiently.  
It includes separate portals for **Admins** and **Agents**, allowing admins to monitor deliveries and manage agents/customers seamlessly.

---

## 🚀 Features

- 🔐 Separate Login & Signup for:
  - **Admin** (`@admin.com`)
  - **Agent** (`@agent.com`)
- 📊 **Admin Dashboard** with:
  - Agent vs Customer Statistics (Pie Chart)
  - Recent Deliveries Overview
- 👨‍💼 **Agent Management** (Add, Edit, Delete Agents)
- 👥 **Customer Management** (Linked with Agents)
- 🚚 **Delivery Management** (Track Delivery Status: Pending, Delivered, Cancelled)
- 🧾 MongoDB Integration using Mongoose Schemas

---
## 🧩 Folder Structure

app →
│
├── admin/ → # Admin Dashboard
│ ├── agents/ → # Manage Agents
│ ├── customer/ → # Manage Customers
│ └── page.jsx # Admin Dashboard Page
│
├── agent/ → # Agent Login & Signup Pages
│ ├── login/ →
│ │ └── page.jsx
│ └── signup/ →
│ └── page.jsx
│
├── api/ → # API Routes (Next.js App Router)
│ ├── agentauth/ → # Authentication for Agents
│ │ ├── login/ →
│ │ │ └── route.js
│ │ └── signup/ →
│ │ └── route.js
│ │
│ ├── agents/ → # Agent CRUD API
│ │ ├── [id]/route.js
│ │ └── route.js
│ │
│ ├── customer/ → # Customer CRUD API
│ │ ├── [id]/route.js
│ │ └── route.js
│ │
│ ├── deliveries/ → # Delivery CRUD API
│ │ └── route.js
│ │
│ └── insights/ → # Dashboard Data API
│ └── route.js
│
├── deliveries/ →
│ └── AddDeliveryForm.jsx # Component for adding new deliveries
│
├── login/ →
│ └── page.jsx # Admin Login Page
│
├── signup/ →
│ └── page.jsx # Admin Signup Page
│
├── lib/ → # MongoDB Connection Setup
│
├── models/ → # Database Models
│ ├── agent.js
│ ├── customer.js
│ └── delivery.js
│
├── public/ → # Static Assets
│
├── globals.css # Global Styles
├── layout.js # Root Layout for Next.js App
└── next.config.mjs # Next.js Configuration


## 🧠 Models Overview

### 🧑‍💼 Agent Model

{
  name: String,
  contact: String,  // 10 digits only
  area: String,
  totalCustomers: Number (default: 0)
}
👥 Customer Model
{
  name: String,
  contact: String,  // 10 digits only
  area: String,
  agent: ObjectId (ref: "Agent")
}
🚚 Delivery Model

{
  orderId: String,
  customer: ObjectId (ref: "Customer"),
  agent: ObjectId (ref: "Agent"),
  status: ["pending", "delivered", "cancelled"],
  pickupTime: Date,
  deliveryTime: Date,
  distanceKm: Number,
  timestamps: true
}
⚙️ Tech Stack
Frontend: Next.js 14 (App Router)

Backend: Node.js (via Next.js API routes)

Database: MongoDB with Mongoose

Styling: Tailwind CSS

Charting: Recharts (for Admin Dashboard Analytics)

🧭 How It Works
Admin Login

Admin logs in with @admin.com domain.

Can view dashboard, agents, customers, and recent deliveries.

Agent Login

Agent logs in with @agent.com domain.

Manages deliveries and updates delivery status.

Delivery Tracking

Deliveries are linked to both Agent and Customer.

Admin can monitor delivery progress and completion.
