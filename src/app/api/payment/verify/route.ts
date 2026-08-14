import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "../../../../lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      dbOrderId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = body;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      await db.query(
        `
        UPDATE orders
        SET
          payment_status='Failed'
        WHERE id=$1
        `,
        [dbOrderId]
      );

      return NextResponse.json(
        {
          success: false,
          message: "Invalid payment signature",
        },
        { status: 400 }
      );
    }

    await db.query(
      `
      UPDATE orders
      SET
        payment_status='Success',
        razorpay_payment_id=$1,
        razorpay_signature=$2
      WHERE id=$3
      `,
      [
        razorpay_payment_id,
        razorpay_signature,
        dbOrderId,
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Payment verification failed" },
      { status: 500 }
    );
  }
}