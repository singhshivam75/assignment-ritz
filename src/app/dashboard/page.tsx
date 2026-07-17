import { db } from "../../lib/db";

async function getStats() {
  const { rows } = await db.query(`
    SELECT
      COUNT(*)::int AS total,
      COUNT(*) FILTER (WHERE query_status = 'Pending')::int AS pending,
      COUNT(*) FILTER (WHERE query_status = 'In Progress')::int AS in_progress,
      COUNT(*) FILTER (WHERE query_status = 'Resolved')::int AS resolved,
      COUNT(*) FILTER (WHERE query_status = 'Closed')::int AS closed
    FROM lead_details
  `);

  return rows[0];
}

export default async function DashboardOverviewPage() {
  const stats = await getStats();

  const cards = [
    { label: "Total Leads", value: stats.total },
    { label: "Pending", value: stats.pending },
    { label: "In Progress", value: stats.in_progress },
    { label: "Resolved", value: stats.resolved },
    { label: "Closed", value: stats.closed },
  ];

  return (
    <div>

      <h1 className="text-2xl font-semibold text-white">
        Overview
      </h1>

      <p className="mt-1 text-sm text-gray-400">
        Summary of leads submitted through the website.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">

        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-white/10 bg-[#111113] p-5"
          >
            <p className="text-sm text-gray-400">{card.label}</p>
            <p className="mt-2 text-3xl font-semibold text-[#D49A34]">
              {card.value}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}
