export type ProductSort = "latest" | "oldest" | "price-low" | "price-high";

const SORT_VALUES: ProductSort[] = [
  "latest",
  "oldest",
  "price-low",
  "price-high",
];

export function parseProductSort(raw: string | null): ProductSort {
  if (raw && SORT_VALUES.includes(raw as ProductSort)) {
    return raw as ProductSort;
  }
  return "latest";
}

export function getProductOrderByClause(sort: ProductSort): string {
  switch (sort) {
    case "oldest":
      return "created_at ASC";
    case "price-low":
      return "COALESCE(discount_price, price) ASC, created_at DESC";
    case "price-high":
      return "COALESCE(discount_price, price) DESC, created_at DESC";
    case "latest":
    default:
      return "created_at DESC";
  }
}

export const PRODUCTS_PAGE_SIZE = 12;
