// app/api/agents/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Agent from "@/models/Agent";

//get
export async function GET() {
  await connectDB();
  const agents = await Agent.find();
  return NextResponse.json(agents);
}

//post
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const agent = new Agent(body);
    await agent.save();
    return NextResponse.json({ message: "Agent added", agent }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
