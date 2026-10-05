import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";

export async function GET() {
  try {
    const { rows } = await db.query<{ category: string }>(
      `
      SELECT DISTINCT category
      FROM products
      WHERE is_active = true
        AND category IS NOT NULL
        AND TRIM(category) <> ''
      ORDER BY category ASC
      `
    );

    const categories = rows.map((row: { category: string }) => row.category);

    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Categories fetch error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
