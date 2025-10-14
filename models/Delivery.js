import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema(
  {
    orderId: { type: String },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
    agent: { type: mongoose.Schema.Types.ObjectId, ref: "Agent", required: true },
    status: {
      type: String,
      enum: ["pending", "delivered", "cancelled"],
      default: "pending",
    },
    pickupTime: Date,
    deliveryTime: Date,
    distanceKm: Number,
  },
  { timestamps: true }
);

export default mongoose.models.Delivery ||
  mongoose.model("Delivery", deliverySchema);
