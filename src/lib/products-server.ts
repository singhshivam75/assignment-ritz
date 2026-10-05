import { db } from "@/lib/db";
import type { Product } from "@/types/product";

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const { rows } = await db.query(
      `SELECT * FROM products WHERE id = $1 AND is_active = true`,
      [id]
    );
    return (rows[0] as Product) ?? null;
  } catch (error) {
    console.error("getProductById:", error);
    return null;
  }
}

export async function getRelatedProducts(
  category: string | null,
  excludeId: number,
  limit = 4
): Promise<Product[]> {
  try {
    if (category) {
      const { rows } = await db.query(
        `
        SELECT *
        FROM products
        WHERE is_active = true
          AND category = $1
          AND id <> $2
        ORDER BY is_featured DESC, created_at DESC
        LIMIT $3
        `,
        [category, excludeId, limit]
      );
      if (rows.length > 0) {
        return rows as Product[];
      }
    }

    const { rows } = await db.query(
      `
      SELECT *
      FROM products
      WHERE is_active = true AND id <> $1
      ORDER BY is_featured DESC, created_at DESC
      LIMIT $2
      `,
      [excludeId, limit]
    );
    return rows as Product[];
  } catch (error) {
    console.error("getRelatedProducts:", error);
    return [];
  }
}
