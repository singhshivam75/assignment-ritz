"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Lead, QUERY_STATUSES, QueryStatus } from "../../types/lead";

const STATUS_STYLES: Record<QueryStatus, string> = {
  Pending: "bg-amber-500/15 text-amber-400",
  "In Progress": "bg-blue-500/15 text-blue-400",
  Resolved: "bg-green-500/15 text-green-400",
  Closed: "bg-gray-500/15 text-gray-400",
};

interface StatusRemarkCellProps {
  lead: Lead;
  onUpdated: (leadId: number, query_status: QueryStatus, remark: string) => void;
}

export default function StatusRemarkCell({ lead, onUpdated }: StatusRemarkCellProps) {
  const [status, setStatus] = useState<QueryStatus>(lead.query_status);
  const [remark, setRemark] = useState(lead.remark ?? "");
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const save = async (nextStatus: QueryStatus, nextRemark: string) => {
    setSaving(true);
    setError(null);

    try {
      const response = await fetch(`/api/leads/${lead.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query_status: nextStatus, remark: nextRemark }),
      });

      if (!response.ok) {
        throw new Error("Failed to update");
      }

      onUpdated(lead.id, nextStatus, nextRemark);
      setDirty(false);
    } catch {
      setError("Could not save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">

      <select
        value={status}
        onChange={(e) => {
          const next = e.target.value as QueryStatus;
          setStatus(next);
          save(next, remark);
        }}
        className={`w-fit rounded-full border-0 px-2.5 py-1 text-xs font-medium outline-none ${STATUS_STYLES[status]}`}
      >
        {QUERY_STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <div className="flex items-center gap-2">
        <input
          value={remark}
          onChange={(e) => {
            setRemark(e.target.value);
            setDirty(true);
          }}
          placeholder="Add remark..."
          className="w-40 rounded border border-white/10 bg-black/40 px-2 py-1 text-xs text-white placeholder-gray-500 outline-none focus:border-[#D49A34]"
        />

        {dirty && (
          <button
            onClick={() => save(status, remark)}
            disabled={saving}
            className="rounded bg-[#D49A34] p-1 text-black disabled:opacity-60"
            aria-label="Save remark"
          >
            <Check size={12} />
          </button>
        )}
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
