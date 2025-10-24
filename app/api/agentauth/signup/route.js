import { connectDB } from "@/lib/mongodb";
import AgentUser from "@/models/AgentUser";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    console.log("Signup API hit");

    await connectDB();
    console.log("Database connected");

    const body = await req.json();
    console.log("Body received:", body);

    const { name, email, phone, password } = body;

    if (!name || !email || !phone || !password) {
      return NextResponse.json({ message: "All fields required" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();
    
    if (!normalizedEmail.endsWith("@agent.com")) {
      return NextResponse.json({ message: "Only @agent.com emails allowed" }, { status: 400 });
    }

    const existingUser = await AgentUser.findOne({ email: normalizedEmail });
    if (existingUser) {
      return NextResponse.json({ message: "Agent-User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password hashed");

    const user = await AgentUser.create({
      name,
      email: normalizedEmail,
      phone,
      password: hashedPassword,
    });
    console.log("User created:", user._id);

    return NextResponse.json({ message: "Signup successful" }, { status: 201 });
  } catch (err) {
    console.error("Signup API error:", err.message, err.stack);
    return NextResponse.json({ message: err.message || "Server error" }, { status: 500 });
  }
}
