import { connectDB } from "@/lib/mongodb";
import AgentUser from "@/models/AgentUser"
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const agentuser = await AgentUser.findOne({ email });
    if (!agentuser ) {
      return NextResponse.json({ message: "AgentUser not found" }, { status: 404 });
    }

    const valid = await bcrypt.compare(password, agentuser .password);
    if (!valid) {
      return NextResponse.json({ message: "Invalid password" }, { status: 401 });
    }

    return NextResponse.json({ message: "Login successful", agentuser  }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
