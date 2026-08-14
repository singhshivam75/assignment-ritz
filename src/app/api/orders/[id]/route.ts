import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const { rows } = await db.query(
      `
      SELECT
        o.*,
        p.title,
        p.description,
        p.thumbnail,
        p.category
      FROM orders o
      INNER JOIN products p
      ON o.product_id = p.id
      WHERE o.id = $1
      `,
      [id]
    );

    if (!rows.length) {
      return NextResponse.json(
        { message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0]);
  } catch {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}