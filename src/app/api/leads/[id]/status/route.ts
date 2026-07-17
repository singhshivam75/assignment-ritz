import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../lib/db";

const VALID_STATUSES = ["Pending", "In Progress", "Resolved", "Closed"];

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const body = await req.json();

  const { query_status, remark } = body;

  if (typeof query_status !== "string" || !VALID_STATUSES.includes(query_status)) {
    return NextResponse.json(
      { message: `Query status must be one of: ${VALID_STATUSES.join(", ")}` },
      { status: 400 }
    );
  }

  try {
    const { rowCount } = await db.query(
      `
      UPDATE lead_details
      SET query_status=$1,
          remark=$2
      WHERE lead_id=$3
      `,
      [query_status, remark ?? null, id]
    );

    if (!rowCount) {
      return NextResponse.json({ message: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Status updated successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Status update failed" },
      { status: 500 }
    );
  }
}