// app/products/products-client.jsx
"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";

export default function ProductsClient({ initialProducts }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const categories = [
    "all",
    ...Array.from(new Set(initialProducts.map((p) => p.category))),
  ];

  const filtered = useMemo(
    () =>
      initialProducts.filter((p) => {
        const text = (p.title + " " + p.shortDescription).toLowerCase();
        const matchSearch = text.includes(search.toLowerCase());
        const matchCategory = category === "all" || p.category === category;
        return matchSearch && matchCategory;
      }),
    [initialProducts, search, category]
  );

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-900">
          Product catalog
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Browse all available products. Use search and filters to refine the
          list.
        </p>
      </header>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 gap-2">
          <input
            type="text"
            placeholder="Search by name or description…"
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm shadow-sm outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 text-xs md:text-sm">
          <span className="text-slate-500">Category:</span>
          <select
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs shadow-sm outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === "all" ? "All" : c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-slate-500">
            No products match your search.
          </p>
        )}
      </div>
    </div>
  );
}
