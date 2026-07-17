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
        l.id,
        l.name,
        l.email,
        l.phone,
        l.service,
        ld.message,
        ld.query_status,
        ld.remark,
        ld.created_at
      FROM leads l
      INNER JOIN lead_details ld
      ON l.id = ld.lead_id
      WHERE l.id=$1
      `,
      [id]
    );

    if (!rows[0]) {
      return NextResponse.json({ message: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  const { name, email, phone, service, message } = body;

  if (typeof name !== "string" || !name.trim()) {
    return NextResponse.json({ message: "Name is required" }, { status: 400 });
  }

  if (typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
    return NextResponse.json({ message: "A valid email is required" }, { status: 400 });
  }

  if (typeof phone !== "string" || !phone.trim()) {
    return NextResponse.json({ message: "Phone is required" }, { status: 400 });
  }

  if (typeof service !== "string" || !service.trim()) {
    return NextResponse.json({ message: "Service is required" }, { status: 400 });
  }

  const client = await db.connect();

  try {
    await client.query("BEGIN");

    await client.query(
      `
      UPDATE leads
      SET name=$1,email=$2,phone=$3,service=$4
      WHERE id=$5
      `,
      [name, email, phone, service, id]
    );

    await client.query(
      `
      UPDATE lead_details
      SET message=$1
      WHERE lead_id=$2
      `,
      [message, id]
    );

    await client.query("COMMIT");

    return NextResponse.json({
      success: true,
      message: "Lead updated successfully",
    });
  } catch (error) {
    await client.query("ROLLBACK");

    return NextResponse.json(
      { message: "Update failed" },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const { rowCount } = await db.query("DELETE FROM leads WHERE id=$1", [id]);

    if (!rowCount) {
      return NextResponse.json({ message: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Lead deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Delete failed" },
      { status: 500 }
    );
  }
}