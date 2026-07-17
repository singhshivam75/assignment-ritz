"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Lead, QueryStatus, QUERY_STATUSES } from "../../../types/lead";
import LeadFormModal from "../../../components/Dashboard/LeadFormModal";
import StatusRemarkCell from "../../../components/Dashboard/StatusRemarkCell";

type SortOrder = "latest" | "oldest";
type StatusFilter = QueryStatus | "All";

const PAGE_SIZE = 10;

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sort, setSort] = useState<SortOrder>("latest");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const fetchLeads = async (
    order: SortOrder,
    pageNum: number,
    searchTerm: string,
    status: StatusFilter
  ) => {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams({
        sort: order,
        page: String(pageNum),
        limit: String(PAGE_SIZE),
      });

      if (searchTerm) params.set("search", searchTerm);
      if (status !== "All") params.set("status", status);

      const response = await fetch(`/api/leads?${params.toString()}`);

      if (!response.ok) {
        throw new Error("Failed to load leads");
      }

      const data = await response.json();
      setLeads(data.leads);
      setTotal(data.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- resetting to page 1 when filters change
    setPage((prev) => (prev === 1 ? prev : 1));
  }, [debouncedSearch, statusFilter]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- data fetch on dep change needs a loading flag
    fetchLeads(sort, page, debouncedSearch, statusFilter);
  }, [sort, page, debouncedSearch, statusFilter]);

  const handleSortChange = (order: SortOrder) => {
    setSort(order);
    setPage(1);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this lead? This cannot be undone.")) return;

    setDeletingId(id);

    try {
      const response = await fetch(`/api/leads/${id}`, { method: "DELETE" });

      if (!response.ok) {
        throw new Error("Failed to delete lead");
      }

      if (leads.length === 1 && page > 1) {
        setPage((prev) => prev - 1);
      } else {
        fetchLeads(sort, page, debouncedSearch, statusFilter);
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete lead");
    } finally {
      setDeletingId(null);
    }
  };

  const handleStatusUpdated = (
    leadId: number,
    query_status: QueryStatus,
    remark: string
  ) => {
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === leadId ? { ...lead, query_status, remark } : lead
      )
    );
  };

  return (
    <div>

      <div className="flex flex-wrap items-center justify-between gap-4">

        <div>
          <h1 className="text-2xl font-semibold text-white">
            Leads
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            {leads.length} lead{leads.length === 1 ? "" : "s"} submitted
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">

          <div className="relative">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email, phone..."
              className="w-64 rounded-lg border border-white/10 bg-[#111113] py-2 pl-9 pr-3 text-sm text-white placeholder-gray-500 outline-none focus:border-[#D49A34]"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            className="rounded-lg border border-white/10 bg-[#111113] px-3 py-2 text-sm text-white outline-none focus:border-[#D49A34]"
          >
            <option value="All">All Statuses</option>
            {QUERY_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => handleSortChange(e.target.value as SortOrder)}
            className="rounded-lg border border-white/10 bg-[#111113] px-3 py-2 text-sm text-white outline-none focus:border-[#D49A34]"
          >
            <option value="latest">Latest First</option>
            <option value="oldest">Oldest First</option>
          </select>

        </div>

      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-white/10 bg-[#111113]">

        <table className="w-full min-w-[900px] text-left text-sm">

          <thead className="border-b border-white/10 bg-white/5 text-xs uppercase tracking-wide text-gray-400">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Message</th>
              <th className="px-4 py-3">Status / Remark</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">

            {loading && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-gray-400">
                  Loading leads...
                </td>
              </tr>
            )}

            {!loading && error && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-red-400">
                  {error}
                </td>
              </tr>
            )}

            {!loading && !error && leads.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-gray-400">
                  {search || statusFilter !== "All"
                    ? "No leads match your search/filter."
                    : "No leads yet."}
                </td>
              </tr>
            )}

            {!loading &&
              !error &&
              leads.map((lead) => (
                <tr key={lead.id} className="align-top">
                  <td className="whitespace-nowrap px-4 py-3 text-gray-400">
                    {new Date(lead.created_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 font-medium text-white">
                    {lead.name}
                  </td>
                  <td className="px-4 py-3 text-gray-400">{lead.email}</td>
                  <td className="px-4 py-3 text-gray-400">{lead.phone}</td>
                  <td className="px-4 py-3 text-gray-400">{lead.service}</td>
                  <td className="max-w-xs px-4 py-3 text-gray-400">
                    {lead.message || "-"}
                  </td>
                  <td className="px-4 py-3">
                    <StatusRemarkCell lead={lead} onUpdated={handleStatusUpdated} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingLead(lead)}
                        className="rounded p-2 text-gray-400 hover:bg-white/10 hover:text-[#D49A34]"
                        aria-label="Edit lead"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => handleDelete(lead.id)}
                        disabled={deletingId === lead.id}
                        className="rounded p-2 text-gray-400 hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
                        aria-label="Delete lead"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

          </tbody>

        </table>

      </div>

      {!loading && !error && total > 0 && (
        <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
          <p>
            Page {page} of {totalPages}
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={page === 1}
              className="flex items-center gap-1 rounded-lg border border-white/10 bg-[#111113] px-3 py-1.5 text-white hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={16} />
              Prev
            </button>

            <button
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={page === totalPages}
              className="flex items-center gap-1 rounded-lg border border-white/10 bg-[#111113] px-3 py-1.5 text-white hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {editingLead && (
        <LeadFormModal
          lead={editingLead}
          onClose={() => setEditingLead(null)}
          onSaved={() => {
            setEditingLead(null);
            fetchLeads(sort, page, debouncedSearch, statusFilter);
          }}
        />
      )}

    </div>
  );
}
