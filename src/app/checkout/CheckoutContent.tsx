"use client";

import { FormEvent, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Script from "next/script";
import Link from "next/link";
import { Lock, ArrowLeft, AlertCircle } from "lucide-react";
import { Product, CheckoutFormState } from "@/types/product";
import "@/types/razorpay";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { CheckoutLoadingSkeleton, CheckoutNotFound } from "@/components/checkout/CheckoutStateViews";

export default function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const productId = searchParams.get("productId");

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [form, setForm] = useState<CheckoutFormState>({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    company_name: "",
    notes: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setErrorMessage(null);
        if (!productId) throw new Error("No product selected for checkout.");

        const response = await fetch(`/api/products/${productId}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to fetch product details");

        setProduct(data.product || data);
      } catch (err) {
        console.error(err);
        setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!productId || !product) {
      setErrorMessage("Valid product selection is required.");
      return;
    }

    try {
      setSubmitting(true);

      const orderRes = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: Number(productId),
          customer_name: form.customer_name,
          customer_email: form.customer_email,
          customer_phone: form.customer_phone,
          company_name: form.company_name || null,
          notes: form.notes || null,
        }),
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.message || "Failed to initialize order.");

      const paymentRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dbOrderId: orderData.order.id }),
      });
      const paymentData = await paymentRes.json();
      if (!paymentRes.ok) throw new Error(paymentData.message || "Failed to initialize Razorpay payment.");

      const RazorpaySDK = window.Razorpay;
      if (!RazorpaySDK) throw new Error("Razorpay SDK failed to load. Please refresh and try again.");

      const rzp = new RazorpaySDK({
        key: paymentData.key,
        amount: paymentData.amount,
        currency: paymentData.currency,
        name: "Your Store",
        description: product.title,
        order_id: paymentData.orderId,
        prefill: {
          name: form.customer_name,
          email: form.customer_email,
          contact: form.customer_phone,
        },
        handler: async (resp) => {
          try {
            const verifyRes = await fetch("/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                dbOrderId: paymentData.dbOrderId,
                razorpay_order_id: resp.razorpay_order_id,
                razorpay_payment_id: resp.razorpay_payment_id,
                razorpay_signature: resp.razorpay_signature,
              }),
            });
            if (!verifyRes.ok) throw new Error("Payment verification failed");
            router.push(`/payment/success?orderId=${paymentData.dbOrderId}`);
          } catch {
            router.push(`/payment/failed?orderId=${paymentData.dbOrderId}`);
          }
        },
      });
      rzp.open();
    } catch (err) {
      console.error(err);
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  };

  if (loading) return <CheckoutLoadingSkeleton />;
  if (!product) return <CheckoutNotFound />;

  return (
    <main className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-10 pb-20 transition-colors">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link
              href={`/products/${product.id}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 mb-2 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Product Details
            </Link>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Secure Checkout
            </h1>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900 px-3.5 py-2 rounded-xl w-fit">
            <Lock className="w-4 h-4" />
            256-Bit Encrypted & SSL Secured
          </div>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 flex items-start gap-3 text-sm text-rose-800 dark:text-rose-300">
            <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1 font-medium">{errorMessage}</div>
            <button onClick={() => setErrorMessage(null)} className="text-xs font-semibold text-rose-600 hover:underline">
              Dismiss
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <CheckoutForm
            form={form}
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            finalPrice={product.discount_price ?? product.price}
          />
          <OrderSummary product={product} />
        </div>
      </div>
    </main>
  );
}