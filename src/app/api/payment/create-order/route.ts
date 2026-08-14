import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../lib/db";
import { razorpay } from "../../../../lib/razorpay";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { dbOrderId } = body;

    if (!dbOrderId) {
      return NextResponse.json(
        { message: "DB order ID is required" },
        { status: 400 }
      );
    }

    // Get existing order + product
    const { rows } = await db.query(
      `
      SELECT
        o.id,
        o.amount,
        o.customer_name,
        o.customer_email,
        o.customer_phone,
        p.title
      FROM orders o
      INNER JOIN products p
        ON o.product_id = p.id
      WHERE o.id = $1
      `,
      [dbOrderId]
    );

    if (!rows.length) {
      return NextResponse.json(
        { message: "Order not found" },
        { status: 404 }
      );
    }

    const order = rows[0];

    // Amount is already stored in our DB
    const amount = Number(order.amount);

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `receipt_${order.id}_${Date.now()}`,
    });

    // Save Razorpay order ID in existing DB order
    await db.query(
      `
      UPDATE orders
      SET razorpay_order_id = $1
      WHERE id = $2
      `,
      [razorpayOrder.id, dbOrderId]
    );

    return NextResponse.json({
      success: true,
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      dbOrderId: order.id,
      product: {
        title: order.title,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Unable to create payment order" },
      { status: 500 }
    );
  }
}