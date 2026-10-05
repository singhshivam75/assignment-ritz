import { db } from "@/lib/db";
import type { Product } from "@/types/product";

export type HomeStats = {
  activeProducts: number;
  categories: number;
  featuredProducts: number;
};

const EMPTY_STATS: HomeStats = {
  activeProducts: 0,
  categories: 0,
  featuredProducts: 0,
};

export async function getHomeStats(): Promise<HomeStats> {
  try {
    const { rows } = await db.query<{
      active_products: number;
      categories: number;
      featured_products: number;
    }>(`
      SELECT
        COUNT(*) FILTER (WHERE is_active = true)::int AS active_products,
        COUNT(DISTINCT category) FILTER (
          WHERE is_active = true AND category IS NOT NULL AND TRIM(category) <> ''
        )::int AS categories,
        COUNT(*) FILTER (WHERE is_active = true AND is_featured = true)::int AS featured_products
      FROM products
    `);

    const row = rows[0];
    if (!row) {
      return EMPTY_STATS;
    }

    return {
      activeProducts: row.active_products,
      categories: row.categories,
      featuredProducts: row.featured_products,
    };
  } catch (error) {
    console.error("getHomeStats:", error);
    return EMPTY_STATS;
  }
}

export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  try {
    const { rows } = await db.query(
      `
      SELECT *
      FROM products
      WHERE is_active = true
      ORDER BY is_featured DESC, created_at DESC
      LIMIT $1
      `,
      [limit]
    );
    return rows as Product[];
  } catch (error) {
    console.error("getFeaturedProducts:", error);
    return [];
  }
}

export async function getCatalogContextForAi(): Promise<string> {
  const products = await getFeaturedProducts(8);
  if (products.length === 0) {
    return "";
  }

  const lines = products.map((product) => {
    const price = product.discount_price ?? product.price;
    const category = product.category ? ` · ${product.category}` : "";
    return `- **${product.title}**${category} — ₹${Number(price).toLocaleString("en-IN")} (id: ${product.id})`;
  });

  return `

Live catalog snapshot (use for recommendations; link format /products/{id} or /products):
${lines.join("\n")}
`;
}
