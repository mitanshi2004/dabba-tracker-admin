import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
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
  agent: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Agent", 
  required: true,
},

});

export default mongoose.models.Customer || mongoose.model("Customer", customerSchema);
