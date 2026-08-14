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
    const category = req.nextUrl.searchParams.get("category") ?? "";
    const active = req.nextUrl.searchParams.get("active");

    const conditions: string[] = [];
    const values: unknown[] = [];

    if (search) {
      values.push(`%${search}%`);

      conditions.push(`
        (
          title ILIKE $${values.length}
          OR short_description ILIKE $${values.length}
        )
      `);
    }

    if (category) {
      values.push(category);
      conditions.push(`category = $${values.length}`);
    }

    if (active === "true" || active === "false") {
      values.push(active === "true");
      conditions.push(`is_active = $${values.length}`);
    }

    const whereClause = conditions.length
      ? `WHERE ${conditions.join(" AND ")}`
      : "";

    values.push(limit, offset);

    const limitParam = values.length - 1;
    const offsetParam = values.length;

    const { rows } = await db.query(
      `
      SELECT *,
      COUNT(*) OVER()::int AS total_count
      FROM products
      ${whereClause}
      ORDER BY created_at ${sort}
      LIMIT $${limitParam}
      OFFSET $${offsetParam}
      `,
      values
    );

    const total = rows[0]?.total_count ?? 0;

    const products = rows.map(
      ({ total_count, ...rest }: { total_count: number; [key: string]: unknown }) => rest
    );

    return NextResponse.json({
      products,
      total,
      page,
      limit,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

function validateProduct(body: {
  title?: unknown;
  slug?: unknown;
  price?: unknown;
}) {
  const { title, slug, price } = body;

  if (typeof title !== "string" || !title.trim()) {
    return "Title is required";
  }

  if (typeof slug !== "string" || !slug.trim()) {
    return "Slug is required";
  }

  if (typeof price !== "number") {
    return "Price is required";
  }

  return null;
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const error = validateProduct(body);

  if (error) {
    return NextResponse.json(
      { message: error },
      { status: 400 }
    );
  }

  const {
    title,
    slug,
    short_description,
    description,
    price,
    discount_price,
    category,
    thumbnail,
    gallery,
    features,
    delivery_time,
    is_featured,
    is_active,
  } = body;

  try {
    await db.query(
      `
      INSERT INTO products(
        title,
        slug,
        short_description,
        description,
        price,
        discount_price,
        category,
        thumbnail,
        gallery,
        features,
        delivery_time,
        is_featured,
        is_active
      )
      VALUES(
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13
      )
      `,
      [
        title,
        slug,
        short_description,
        description,
        price,
        discount_price,
        category,
        thumbnail,
        gallery,
        features,
        delivery_time,
        is_featured ?? false,
        is_active ?? true,
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Product created successfully",
    });
  } catch (error) {
    console.error("Create Product Error:", error);
    return NextResponse.json(
      { message: "Failed to create product" },
      { status: 500 }
    );
  }
}