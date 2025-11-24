// app/products/[id]/ProductDetailsClient.jsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function ProductDetailsClient({ id }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);

        // This should log "1", "2", etc. when you open /products/1, /products/2...
        console.log("ProductDetailsClient id prop:", id);

        const res = await fetch(`${API_BASE}/products/${id}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch product ${id}: ${res.status}`);
        }

        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Error loading product:", err);
        setError("Could not load this product.");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      load();
    } else {
      setLoading(false);
      setError("No product id provided.");
    }
  }, [id]);

  if (loading) {
    return <p className="text-sm text-slate-500">Loading product…</p>;
  }

  if (error || !product) {
    return (
      <div className="space-y-4">
        <Link
          href="/products"
          className="inline-flex items-center text-sm text-slate-600 hover:text-indigo-600"
        >
          ← Back to products
        </Link>
        <p className="text-sm text-red-600">{error || "Product not found."}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        href="/products"
        className="inline-flex items-center text-sm text-slate-600 hover:text-indigo-600"
      >
        ← Back to products
      </Link>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="aspect-[21/9] w-full bg-slate-100">
          <img
            src={
              product.imageUrl ||
              "https://images.unsplash.com/photo-1512499617640-c2f999098c01?auto=format&fit=crop&w=1200&q=80"
            }
            alt={product.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="space-y-4 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                {product.category}
              </p>
              <h1 className="mt-1 text-2xl font-semibold text-slate-900">
                {product.title}
              </h1>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500">Price</p>
              <p className="text-lg font-semibold text-indigo-600">
                ${Number(product.price).toFixed(2)}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 text-xs text-slate-500">
            <span className="rounded-full bg-slate-100 px-3 py-1">
              Priority: {product.priority || "Standard"}
            </span>
            {product.date && (
              <span className="rounded-full bg-slate-100 px-3 py-1">
                Added on: {product.date}
              </span>
            )}
          </div>

          <p className="text-sm leading-relaxed text-slate-700">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
}
