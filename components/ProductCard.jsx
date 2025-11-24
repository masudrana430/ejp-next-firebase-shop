// components/ProductCard.jsx
import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus-within:ring-2 focus-within:ring-indigo-500">
      <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-100">
        <img
          src={
            product.imageUrl ||
            "https://images.unsplash.com/photo-1512499617640-c2f999098c01?auto=format&fit=crop&w=800&q=80"
          }
          alt={product.title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="mt-3 flex-1">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>{product.category}</span>
          <span className="font-semibold text-indigo-600">
            ${Number(product.price).toFixed(2)}
          </span>
        </div>
        <h3 className="mt-1 line-clamp-1 text-sm font-semibold text-slate-900">
          {product.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs text-slate-600">
          {product.shortDescription}
        </p>
      </div>
      <div className="mt-3 flex justify-between gap-2">
        <Link
          href={`/products/${product.id}`}
          className="inline-flex flex-1 items-center justify-center rounded-full border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-indigo-500 hover:text-indigo-600"
        >
          Details
        </Link>
      </div>
    </div>
  );
}
