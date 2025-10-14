// app/api/customer/[id]/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Customer from "@/models/Customer";

//update
export async function PUT(req, { params }) {
  try {
    await connectDB();
    const body = await req.json();
    const customer = await Customer.findByIdAndUpdate(params.id, {
      ...body
    }, { new: true });

    if (!customer) return NextResponse.json({ message: "Customer not found" }, { status: 404 });

    return NextResponse.json({ message: "Customer updated", customer});
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
//delete
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const customer = await Customer.findByIdAndDelete(params.id);

    if (!customer) return NextResponse.json({ message: "Customer not found" }, { status: 404 });

    return NextResponse.json({ message: "Customer deleted" });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
