import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProductDetailView } from "@/components/products/ProductDetailView";
import {
  getProductById,
  getRelatedProducts,
} from "@/lib/products-server";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) {
    return { title: "Product not found" };
  }
  return {
    title: product.title,
    description:
      product.short_description ||
      `Buy ${product.title} from Ritz Media World catalog.`,
  };
}

export default async function ProductDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const related = await getRelatedProducts(product.category, product.id, 4);

  return <ProductDetailView product={product} related={related} />;
}
