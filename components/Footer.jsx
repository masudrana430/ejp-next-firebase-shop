// components/Footer.jsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Next Firebase Shop. All rights reserved.</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/#features" className="hover:text-slate-900">
            Features
          </Link>
          <Link href="/#testimonials" className="hover:text-slate-900">
            Customers
          </Link>
          <Link href="/products" className="hover:text-slate-900">
            Products
          </Link>
          <a href="#" className="hover:text-slate-900">
            Twitter
          </a>
          <a href="#" className="hover:text-slate-900">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
