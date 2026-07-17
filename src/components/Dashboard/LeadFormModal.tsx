"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Lead, LeadInput } from "../../types/lead";

const SERVICES = [
  "Web Development",
  "Mobile App Development",
  "UI / UX Design",
  "Digital Marketing",
];

interface LeadFormModalProps {
  lead?: Lead | null;
  onClose: () => void;
  onSaved: () => void;
}

const EMPTY: LeadInput = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

export default function LeadFormModal({
  lead,
  onClose,
  onSaved,
}: LeadFormModalProps) {
  const [form, setForm] = useState<LeadInput>(
    lead
      ? {
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          service: lead.service,
          message: lead.message ?? "",
        }
      : EMPTY
  );
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const isEdit = Boolean(lead);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const response = await fetch(
        isEdit ? `/api/leads/${lead!.id}` : "/api/leads",
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">

      <div className="w-full max-w-lg rounded-xl border border-white/10 bg-[#111113] p-6 shadow-xl">

        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">
            {isEdit ? "Edit Lead" : "Add Lead"}
          </h2>

          <button
            onClick={onClose}
            className="rounded p-1 text-gray-400 hover:bg-white/10"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-300">
              Name
            </label>
            <input
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-[#D49A34]"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-[#D49A34]"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-300">
              Phone
            </label>
            <input
              name="phone"
              required
              value={form.phone}
              onChange={handleChange}
              className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-[#D49A34]"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-300">
              Service
            </label>
            <select
              name="service"
              required
              value={form.service}
              onChange={handleChange}
              className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-[#D49A34]"
            >
              <option value="">Select Service</option>
              {SERVICES.map((service) => (
                <option key={service}>{service}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-300">
              Message
            </label>
            <textarea
              name="message"
              rows={3}
              value={form.message}
              onChange={handleChange}
              className="w-full resize-none rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-[#D49A34]"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-300 hover:bg-white/10"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-[#D49A34] px-4 py-2 text-sm font-semibold text-black transition hover:brightness-110 disabled:opacity-60"
            >
              {saving ? "Saving..." : isEdit ? "Save Changes" : "Add Lead"}
            </button>
          </div>

        </form>

      </div>

    </div>
  );
}
