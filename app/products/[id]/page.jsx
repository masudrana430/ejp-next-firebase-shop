// app/products/[id]/page.jsx
import { use } from "react";
import ProductDetailsClient from "./ProductDetailsClient";

export default function ProductDetailsPage({ params }) {
  // params is a Promise → unwrap it with React.use
  const { id } = use(params);

  return <ProductDetailsClient id={id} />;
}

