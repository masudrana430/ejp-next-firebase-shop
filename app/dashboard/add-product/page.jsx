// app/dashboard/add-product/page.jsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import AddProductForm from "./AddProductForm";

export default function AddProductPage() {
  const { user, authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login");
    }
  }, [authLoading, user, router]);

  if (authLoading || (!user && !authLoading)) {
    return <p className="text-sm text-slate-500">Checking authentication…</p>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-slate-900">Add product</h1>
      <p className="text-sm text-slate-600">
        Only logged-in users can create products. Fill in the fields below and
        submit to add a new item to the catalog.
      </p>
      <AddProductForm />
    </div>
  );
}
