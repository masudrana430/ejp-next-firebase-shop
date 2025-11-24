// app/products/page.jsx
import { fetchProducts } from "@/lib/api";
import ProductsClient from "./products-client";

export default async function ProductsPage() {
  const products = await fetchProducts();
  return <ProductsClient initialProducts={products} />;
}
