// app/api/agents/[id]/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Agent from "@/models/Agent";

//update
export async function PUT(req, { params }) {
  try {
    await connectDB();
    const body = await req.json();
    const agent = await Agent.findByIdAndUpdate(params.id, {
      ...body,
      totalCustomers: Number(body.totalCustomers)
    }, { new: true });

    if (!agent) return NextResponse.json({ message: "Agent not found" }, { status: 404 });

    return NextResponse.json({ message: "Agent updated", agent });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

//delte
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const agent = await Agent.findByIdAndDelete(params.id);

    if (!agent) return NextResponse.json({ message: "Agent not found" }, { status: 404 });

    return NextResponse.json({ message: "Agent deleted" });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
