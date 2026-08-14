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
      SELECT *
      FROM products
      WHERE id = $1
      `,
      [id]
    );

    if (!rows.length) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const body = await req.json();

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
    const { rowCount } = await db.query(
      `
      UPDATE products
      SET
        title=$1,
        slug=$2,
        short_description=$3,
        description=$4,
        price=$5,
        discount_price=$6,
        category=$7,
        thumbnail=$8,
        gallery=$9,
        features=$10,
        delivery_time=$11,
        is_featured=$12,
        is_active=$13,
        updated_at=NOW()
      WHERE id=$14
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
        is_featured,
        is_active,
        id,
      ]
    );

    if (!rowCount) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Update failed" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const { rowCount } = await db.query(
      `
      DELETE FROM products
      WHERE id=$1
      `,
      [id]
    );

    if (!rowCount) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Delete failed" },
      { status: 500 }
    );
  }
}