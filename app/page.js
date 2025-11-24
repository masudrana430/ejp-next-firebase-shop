// app/page.js
import Link from "next/link";
import ProductCard from "@/components/ProductCard";

const featuredProducts = [
  {
    id: "1",
    title: "Wireless Noise-Cancelling Headphones",
    shortDescription: "Immersive sound with 30h battery life.",
    description: "Full description...",
    price: 199,
    category: "Audio",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo0D9NsUy3dEgbqLNGTm7WCwVKlbGZNt71og&s",
  },
  {
    id: "2",
    title: "Minimalist Smartwatch",
    shortDescription: "Track health, sleep, and notifications.",
    description: "Full description...",
    price: 149,
    category: "Wearables",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo0D9NsUy3dEgbqLNGTm7WCwVKlbGZNt71og&s",
  },
  {
    id: "3",
    title: "Ergonomic Office Chair",
    shortDescription: "All-day comfort with lumbar support.",
    description: "Full description...",
    price: 329,
    category: "Office",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo0D9NsUy3dEgbqLNGTm7WCwVKlbGZNt71og&s",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* HERO */}
      <section className="grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
            Modern product catalog
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Discover and manage products with a clean, minimal dashboard.
          </h1>
          <p className="mt-4 text-sm text-slate-600 md:text-base">
            Next Firebase Shop gives you a simple landing page, curated product
            list, and protected admin tools to add and manage items.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="inline-flex items-center rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500"
            >
              Browse products
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center rounded-full border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-800 transition hover:border-indigo-500 hover:text-indigo-600"
            >
              Login to manage
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {featuredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* SECTION 1 – Features */}
      <section id="features" className="space-y-6">
        <h2 className="text-xl font-semibold text-slate-900">
          Built for quick demos
        </h2>
        <p className="text-sm text-slate-600 md:text-base">
          Focus on clean UI, responsive layouts, and simple flows to demonstrate
          Next.js App Router and Firebase Auth.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "App Router ready",
              desc: "Uses Next.js App Router and modern layout patterns.",
            },
            {
              title: "Firebase Auth",
              desc: "Google + email/password with protected routes.",
            },
            {
              title: "Express backend",
              desc: "Products are served from a minimal Node/Express API.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-4 text-sm shadow-sm"
            >
              <h3 className="text-sm font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-2 text-xs text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2 – How it works */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-slate-900">
          How the flow works
        </h2>
        <div className="grid gap-4 md:grid-cols-3 text-sm text-slate-600">
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <p className="font-semibold text-slate-900">1. Browse</p>
            <p className="mt-2 text-xs">
              Visitors browse the public landing and products pages.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <p className="font-semibold text-slate-900">2. Login</p>
            <p className="mt-2 text-xs">
              Users sign in with Google or email/password to unlock admin
              tools.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <p className="font-semibold text-slate-900">3. Manage</p>
            <p className="mt-2 text-xs">
              Authenticated users add and manage products via protected pages.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3 – Testimonials */}
      <section id="testimonials" className="space-y-6">
        <h2 className="text-xl font-semibold text-slate-900">
          What teams are saying
        </h2>
        <div className="grid gap-4 md:grid-cols-3 text-sm">
          {[
            "“Perfect for showing auth quickly.”",
            "“Clean, consistent layouts on all breakpoints.”",
            "“Great starter for product-based demos.”",
          ].map((quote, i) => (
            <figure
              key={i}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <p className="text-sm text-slate-700">{quote}</p>
              <figcaption className="mt-3 text-xs text-slate-500">
                Product Designer · Demo Corp
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* SECTION 4 – CTA banner */}
      <section className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-8 text-white">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Ready to try it?</h2>
            <p className="mt-1 text-sm text-indigo-100">
              Log in with Firebase and start adding products in minutes.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/login"
              className="rounded-full bg-white px-4 py-2 text-sm font-medium text-indigo-700 shadow-sm hover:bg-indigo-50"
            >
              Login / Register
            </Link>
            <Link
              href="/products"
              className="rounded-full border border-indigo-200 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500/30"
            >
              View catalog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
