// app/api/customer/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Customer from "@/models/Customer";
import Agent from "@/models/Agent";

//get
export async function GET() {
  await connectDB();
  const customers = await Customer.find().populate("agent", "name");
  return NextResponse.json(customers);
}

//post
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const agent = await Agent.findById(body.agent);
    if (!agent) {
      return NextResponse.json({ message: "Agent not found" }, { status: 404 });
    }

    const customer = new Customer({
      name: body.name,
      contact: body.contact,
      area: body.area,
      agent: agent._id,
    });
    await customer.save();

    await Agent.findByIdAndUpdate(agent._id, { $inc: { totalCustomers: 1 } });

    return NextResponse.json({ message: "Customer added", customer }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
