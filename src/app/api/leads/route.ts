import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { QUERY_STATUSES } from "../../../types/lead";

export async function GET(req: NextRequest) {
  try {
    const sort = req.nextUrl.searchParams.get("sort") === "oldest" ? "ASC" : "DESC";
    const page = Math.max(1, Number(req.nextUrl.searchParams.get("page")) || 1);
    const limit = Math.min(100, Math.max(1, Number(req.nextUrl.searchParams.get("limit")) || 10));
    const offset = (page - 1) * limit;
    const search = req.nextUrl.searchParams.get("search")?.trim() ?? "";
    const status = req.nextUrl.searchParams.get("status") ?? "";

    const conditions: string[] = [];
    const values: unknown[] = [];

    if (search) {
      values.push(`%${search}%`);
      conditions.push(
        `(l.name ILIKE $${values.length} OR l.email ILIKE $${values.length} OR l.phone ILIKE $${values.length})`
      );
    }

    if (QUERY_STATUSES.includes(status as (typeof QUERY_STATUSES)[number])) {
      values.push(status);
      conditions.push(`ld.query_status = $${values.length}`);
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

    values.push(limit, offset);
    const limitParam = values.length - 1;
    const offsetParam = values.length;

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
        ld.created_at,
        COUNT(*) OVER()::int AS total_count
      FROM leads l
      INNER JOIN lead_details ld
      ON l.id = ld.lead_id
      ${whereClause}
      ORDER BY ld.created_at ${sort}
      LIMIT $${limitParam} OFFSET $${offsetParam}
      `,
      values
    );

    const total = rows[0]?.total_count ?? 0;
    const leads = rows.map(({ total_count, ...rest }: { total_count: number; [key: string]: unknown }) => rest);

    return NextResponse.json({ leads, total, page, limit });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateLeadInput(body: {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  service?: unknown;
}) {
  const { name, email, phone, service } = body;

  if (typeof name !== "string" || !name.trim()) {
    return "Name is required";
  }

  if (typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
    return "A valid email is required";
  }

  if (typeof phone !== "string" || !phone.trim()) {
    return "Phone is required";
  }

  if (typeof service !== "string" || !service.trim()) {
    return "Service is required";
  }

  return null;
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const validationError = validateLeadInput(body);

  if (validationError) {
    return NextResponse.json({ message: validationError }, { status: 400 });
  }

  const { name, email, phone, service, message } = body;

  const client = await db.connect();

  try {
    await client.query("BEGIN");

    const lead = await client.query(
      `
      INSERT INTO leads(name,email,phone,service)
      VALUES($1,$2,$3,$4)
      RETURNING id
      `,
      [name, email, phone, service]
    );

    await client.query(
      `
      INSERT INTO lead_details(lead_id,message)
      VALUES($1,$2)
      `,
      [lead.rows[0].id, message]
    );

    await client.query("COMMIT");

    return NextResponse.json({
      success: true,
      message: "Lead created successfully",
    });
  } catch (error) {
    await client.query("ROLLBACK");

    return NextResponse.json(
      { message: "Failed to create lead" },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}