// app/dashboard/add-product/AddProductForm.jsx
"use client";

import { useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function AddProductForm() {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setToast(null);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const body = {
      title: formData.get("title"),
      shortDescription: formData.get("shortDescription"),
      description: formData.get("description"),
      price: Number(formData.get("price")),
      priority: formData.get("priority"),
      date: formData.get("date"),
      category: formData.get("category") || "General",
      imageUrl: formData.get("imageUrl"),
    };

    const res = await fetch(`${API_BASE}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setLoading(false);

    if (!res.ok) {
      setError("Failed to add product. Try again.");
      return;
    }

    form.reset();
    setToast("Product added successfully!");
  };

  return (
    <div className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2 md:col-span-2">
          <label className="text-xs font-medium text-slate-700">Title</label>
          <input
            name="title"
            required
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm shadow-sm outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            placeholder="Minimalist desk lamp"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-700">
            Short description
          </label>
          <input
            name="shortDescription"
            required
            maxLength={80}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm shadow-sm outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            placeholder="One-line description (shown on cards)"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-700">Category</label>
          <input
            name="category"
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm shadow-sm outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            placeholder="e.g. Office, Audio"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-xs font-medium text-slate-700">
            Full description
          </label>
          <textarea
            name="description"
            required
            rows={4}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm shadow-sm outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            placeholder="Describe the product in detail…"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-700">Price</label>
          <input
            name="price"
            type="number"
            step="0.01"
            min="0"
            required
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm shadow-sm outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-700">
            Priority
          </label>
          <select
            name="priority"
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          >
            <option value="Standard">Standard</option>
            <option value="Featured">Featured</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-700">Date</label>
          <input
            name="date"
            type="date"
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm shadow-sm outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-xs font-medium text-slate-700">
            Image URL (optional)
          </label>
          <input
            name="imageUrl"
            type="url"
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm shadow-sm outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            placeholder="https://…"
          />
        </div>

        <div className="mt-2 md:col-span-2 flex justify-end gap-3">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center rounded-full bg-indigo-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Adding…" : "Submit"}
          </button>
        </div>
      </form>

      {toast && (
        <div className="pointer-events-none fixed bottom-6 right-6 max-w-xs rounded-xl bg-slate-900 px-4 py-3 text-xs text-white shadow-lg">
          {toast}
        </div>
      )}
      {error && (
        <p className="mt-3 text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
