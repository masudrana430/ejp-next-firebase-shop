// app/dashboard/manage-products/ManageProductsClient.jsx
"use client";

import { useState } from "react";
import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function ManageProductsClient({ initialProducts }) {
  const [products, setProducts] = useState(initialProducts);
  const [loadingId, setLoadingId] = useState(null);
  const [error, setError] = useState(null);

  const handleDelete = async (id) => {
    setLoadingId(id);
    setError(null);

    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: "DELETE",
    });

    setLoadingId(null);

    if (!res.ok) {
      setError("Failed to delete product.");
      return;
    }

    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-3">
      {error && (
        <p className="text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3 hidden md:table-cell">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3 hidden lg:table-cell">Priority</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, idx) => (
              <tr
                key={p.id}
                className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/40"}
              >
                <td className="px-4 py-3">
                  <p className="font-medium text-slate-900">{p.title}</p>
                  <p className="mt-0.5 line-clamp-1 text-xs text-slate-500">
                    {p.shortDescription}
                  </p>
                </td>
                <td className="px-4 py-3 hidden md:table-cell text-xs text-slate-600">
                  {p.category}
                </td>
                <td className="px-4 py-3 text-sm text-slate-800">
                  ${Number(p.price).toFixed(2)}
                </td>
                <td className="px-4 py-3 hidden lg:table-cell text-xs text-slate-600">
                  {p.priority || "Standard"}
                </td>
                <td className="px-4 py-3 text-right text-xs">
                  <Link
                    href={`/products/${p.id}`}
                    className="rounded-full border border-slate-300 px-3 py-1 text-xs font-medium text-slate-700 transition hover:border-indigo-500 hover:text-indigo-600"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleDelete(p.id)}
                    disabled={loadingId === p.id}
                    className="ml-2 rounded-full border border-red-200 px-3 py-1 text-xs font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loadingId === p.id ? "Deleting…" : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-6 text-center text-sm text-slate-500"
                >
                  No products yet. Try adding one on the{" "}
                  <Link
                    href="/dashboard/add-product"
                    className="text-indigo-600 underline"
                  >
                    Add Product
                  </Link>{" "}
                  page.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
