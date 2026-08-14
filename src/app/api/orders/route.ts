import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../lib/db";

export async function GET(req: NextRequest) {
  try {
    const sort =
      req.nextUrl.searchParams.get("sort") === "oldest"
        ? "ASC"
        : "DESC";

    const page = Math.max(
      1,
      Number(req.nextUrl.searchParams.get("page")) || 1
    );

    const limit = Math.min(
      100,
      Math.max(1, Number(req.nextUrl.searchParams.get("limit")) || 10)
    );

    const offset = (page - 1) * limit;

    const search = req.nextUrl.searchParams.get("search")?.trim() ?? "";
    const status = req.nextUrl.searchParams.get("status") ?? "";

    const conditions: string[] = [];
    const values: unknown[] = [];

    if (search) {
      values.push(`%${search}%`);

      conditions.push(`
        (
          o.customer_name ILIKE $${values.length}
          OR o.customer_email ILIKE $${values.length}
          OR p.title ILIKE $${values.length}
        )
      `);
    }

    if (status) {
      values.push(status);
      conditions.push(`o.payment_status = $${values.length}`);
    }

    const whereClause =
      conditions.length > 0
        ? `WHERE ${conditions.join(" AND ")}`
        : "";

    values.push(limit, offset);

    const limitParam = values.length - 1;
    const offsetParam = values.length;

    const { rows } = await db.query(
      `
      SELECT
        o.*,
        p.title,
        p.thumbnail,
        COUNT(*) OVER()::int AS total_count
      FROM orders o
      INNER JOIN products p
      ON o.product_id = p.id
      ${whereClause}
      ORDER BY o.created_at ${sort}
      LIMIT $${limitParam}
      OFFSET $${offsetParam}
      `,
      values
    );

    const total = rows[0]?.total_count ?? 0;

    const orders = rows.map(
      ({ total_count, ...rest }: { total_count: number;[key: string]: unknown }) => rest
    );

    return NextResponse.json({
      orders,
      total,
      page,
      limit,
    });
  } catch {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const {
    product_id,
    customer_name,
    customer_email,
    customer_phone,
    company_name,
    notes,
  } = body;

  if (!product_id)
    return NextResponse.json(
      { message: "Product is required" },
      { status: 400 }
    );

  if (!customer_name?.trim())
    return NextResponse.json(
      { message: "Customer name is required" },
      { status: 400 }
    );

  if (!customer_email?.trim())
    return NextResponse.json(
      { message: "Customer email is required" },
      { status: 400 }
    );

  if (!customer_phone?.trim())
    return NextResponse.json(
      { message: "Customer phone is required" },
      { status: 400 }
    );

  try {
    const product = await db.query(
      `
      SELECT price, discount_price
      FROM products
      WHERE id=$1
      `,
      [product_id]
    );

    if (!product.rows.length) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    const productPrice = Number(product.rows[0].price);
    const discountPrice = product.rows[0].discount_price
      ? Number(product.rows[0].discount_price)
      : null;

    const amount = discountPrice ?? productPrice;

    const { rows } = await db.query(
      `
      INSERT INTO orders(
        product_id,
        customer_name,
        customer_email,
        customer_phone,
        company_name,
        amount,
        notes
      )
      VALUES($1,$2,$3,$4,$5,$6,$7)
      RETURNING *
      `,
      [
        product_id,
        customer_name,
        customer_email,
        customer_phone,
        company_name,
        amount,
        notes,
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Order created successfully",
      order: rows[0],
    });
  } catch {
    return NextResponse.json(
      { message: "Failed to create order" },
      { status: 500 }
    );
  }
}