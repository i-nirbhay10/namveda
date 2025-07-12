// Use dynamic import for CommonJS module
import Razorpay from "razorpay";
import { NextRequest, NextResponse } from "next/server";

console.log(
  process.env.RAZORPAY_KEY_ID,
  process.env.RAZORPAY_KEY_SECRET,
  process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  "RAZORPAY_KEY_SECRET"
);

export async function POST(req) {
  try {
    const body = await req.json();

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: body.amount * 100, // convert to paise
      currency: "INR",
      receipt: "receipt_order_" + Math.random().toString(36).substring(7),
    };

    const order = await instance.orders.create(options);

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
