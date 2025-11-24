// app/dashboard/manage-products/page.jsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import ManageProductsClient from "./ManageProductsClient";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function ManageProductsPage() {
  const { user, authLoading } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState(null);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login");
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/products`);
        const data = await res.json();
        setProducts(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingProducts(false);
      }
    };
    load();
  }, []);

  if (authLoading || (!user && !authLoading)) {
    return <p className="text-sm text-slate-500">Checking authentication…</p>;
  }

  if (loadingProducts || !products) {
    return <p className="text-sm text-slate-500">Loading products…</p>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-slate-900">
        Manage products
      </h1>
      <p className="text-sm text-slate-600">
        View and delete products. This page is only accessible to authenticated
        users.
      </p>
      <ManageProductsClient initialProducts={products} />
    </div>
  );
}
