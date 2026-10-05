import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse the Ritz Media World catalog with search, filters, and secure checkout.",
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
