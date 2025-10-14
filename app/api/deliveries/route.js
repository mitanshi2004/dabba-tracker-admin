import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Delivery from "@/models/Delivery";
import Customer from "@/models/Customer";
import Agent from "@/models/Agent";

//get
export async function GET() {
  try {
    await connectDB();
    const deliveries = await Delivery.find()
      .populate("customer")
      .populate("agent")
      .sort({ createdAt: -1 });

    return NextResponse.json(deliveries, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch deliveries", error: error.message },
      { status: 500 }
    );
  }
}

//post
export async function POST(req) {
  try {
    await connectDB();
    const { customerId, agentId, pickupTime, deliveryTime, distanceKm } = await req.json();

    if (!customerId || !agentId) {
      return NextResponse.json(
        { message: "Customer ID and Agent ID are required" },
        { status: 400 }
      );
    }

    const customerExists = await Customer.findById(customerId);
    const agentExists = await Agent.findById(agentId);

    if (!customerExists || !agentExists) {
      return NextResponse.json(
        { message: "Invalid Customer or Agent" },
        { status: 404 }
      );
    }

    const delivery = await Delivery.create({
      customer: customerId,
      agent: agentId,
      pickupTime,
      deliveryTime,
      distanceKm,
      status: "delivered", // default aajaiyenga
    });

    return NextResponse.json(
      { message: "Delivery added successfully", delivery },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error adding delivery", error: error.message },
      { status: 500 }
    );
  }
}
