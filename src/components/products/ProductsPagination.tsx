import { ChevronLeft, ChevronRight } from "lucide-react";

type ProductsPaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
};

function pageItems(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const items: (number | "ellipsis")[] = [1];

  if (current > 3) {
    items.push("ellipsis");
  }

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i += 1) {
    items.push(i);
  }

  if (current < total - 2) {
    items.push("ellipsis");
  }

  items.push(total);
  return items;
}

export function ProductsPagination({
  page,
  totalPages,
  onPageChange,
  disabled,
}: ProductsPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const items = pageItems(page, totalPages);

  return (
    <nav
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
      aria-label="Products pagination"
    >
      <button
        type="button"
        disabled={disabled || page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="inline-flex h-10 items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-[#08184A] transition hover:border-[#D39B35]/50 hover:bg-[#D39B35]/5 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft className="h-4 w-4" />
        Prev
      </button>

      {items.map((item, index) =>
        item === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            className="px-2 text-sm text-slate-400"
          >
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            disabled={disabled}
            onClick={() => onPageChange(item)}
            className={`h-10 min-w-10 rounded-xl px-3 text-sm font-semibold transition ${
              item === page
                ? "bg-[#08184A] text-white shadow-md shadow-[#08184A]/20"
                : "border border-slate-200 bg-white text-[#08184A] hover:border-[#D39B35]/50 hover:bg-[#D39B35]/5"
            }`}
            aria-current={item === page ? "page" : undefined}
          >
            {item}
          </button>
        )
      )}

      <button
        type="button"
        disabled={disabled || page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="inline-flex h-10 items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-[#08184A] transition hover:border-[#D39B35]/50 hover:bg-[#D39B35]/5 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}
