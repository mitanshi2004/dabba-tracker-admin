import mongoose from "mongoose";

const agentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Phone number must be 10 digits"],
  },
  area: {
    type: String,
    required: true,
  },
  totalCustomers: {
    type: Number,
    default: 0,
  },
});

export default mongoose.models.Agent || mongoose.model("Agent", agentSchema);
