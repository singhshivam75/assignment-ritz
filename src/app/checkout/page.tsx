import { Suspense } from "react";
import CheckoutContent from "./CheckoutContent";
import { CheckoutLoadingSkeleton } from "@/components/checkout/CheckoutStateViews";

export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutLoadingSkeleton />}>
      <CheckoutContent />
    </Suspense>
  );
}