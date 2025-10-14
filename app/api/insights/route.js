import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Delivery from "@/models/Delivery";

export async function GET() {
  try {
    await connectDB();

    const today = new Date().toDateString();
    const deliveries = await Delivery.find();
    const totalToday = deliveries.filter(
      (d) => new Date(d.deliveryTime).toDateString() === today
    ).length;

    // Friendly AI-style message without external API
    let aiMessage = "";

    if (totalToday === 0) {
      aiMessage = "No deliveries yet today, but a great day ahead! 🌞";
    } else if (totalToday < 5) {
      aiMessage = `Hey Admin! Only ${totalToday} deliveries today — keep going! 🚚✨`;
    } else if (totalToday < 10) {
      aiMessage = `Great job! ${totalToday} deliveries completed today! 🎉`;
    } else {
      aiMessage = `Amazing! ${totalToday} deliveries wrapped up today! 🔥`;
    }

    return NextResponse.json({ totalToday, aiMessage });
  } catch (error) {
    console.error("AI Insights Error:", error.message);
    return NextResponse.json({
      totalToday: 0,
      aiMessage:
        "Hello Admin! Could not fetch AI insights right now, but you have a great day ahead! 🚀",
    });
  }
}
