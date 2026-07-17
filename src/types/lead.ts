export type QueryStatus = "Pending" | "In Progress" | "Resolved" | "Closed";

export interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string | null;
  query_status: QueryStatus;
  remark: string | null;
  created_at: string;
}

export interface LeadInput {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export const QUERY_STATUSES: QueryStatus[] = [
  "Pending",
  "In Progress",
  "Resolved",
  "Closed",
];
