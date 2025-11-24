// components/Navbar.jsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/#features", label: "Features" },
    { href: "/#testimonials", label: "Testimonials" },
  ];

  const displayName = user?.displayName || user?.email || "User";

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white">
            N
          </span>
          <span className="text-lg font-semibold tracking-tight text-slate-900">
            Next Firebase Shop
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          <div className="flex gap-6 text-sm font-medium text-slate-600">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative transition hover:text-slate-900"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          {!user && (
            <div className="flex items-center gap-3 text-sm">
              <Link
                href="/login"
                className="rounded-full border border-slate-300 px-4 py-1.5 text-slate-700 transition hover:border-indigo-500 hover:text-indigo-600"
              >
                Login
              </Link>
              <Link
                href="/login?mode=register"
                className="rounded-full bg-indigo-600 px-4 py-1.5 font-medium text-white shadow-sm transition hover:bg-indigo-500"
              >
                Register
              </Link>
            </div>
          )}

          {user && (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm shadow-sm transition hover:border-indigo-500"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-xs font-semibold text-white">
                  {displayName[0]?.toUpperCase()}
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-xs text-slate-500">Logged in as</span>
                  <span className="text-sm font-medium text-slate-900">
                    {displayName}
                  </span>
                </div>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-2 text-sm shadow-lg">
                  <div className="mb-2 rounded-lg bg-slate-50 p-2">
                    <p className="text-xs text-slate-500">Email</p>
                    <p className="truncate text-sm text-slate-800">
                      {user.email}
                    </p>
                  </div>
                  <Link
                    href="/dashboard/add-product"
                    className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50"
                  >
                    Add Product
                  </Link>
                  <Link
                    href="/dashboard/manage-products"
                    className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50"
                  >
                    Manage Products
                  </Link>
                  <button
                    onClick={logout}
                    className="mt-1 block w-full rounded-lg px-3 py-2 text-left text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="inline-flex items-center justify-center rounded-lg border border-slate-200 p-2 md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          <Menu className="h-5 w-5" />
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 text-sm text-slate-700">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-2 py-2 hover:bg-slate-50"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {!user ? (
              <>
                <Link
                  href="/login"
                  className="rounded-lg border border-slate-300 px-2 py-2 text-center hover:bg-slate-50"
                  onClick={() => setMobileOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/login?mode=register"
                  className="rounded-lg bg-indigo-600 px-2 py-2 text-center font-medium text-white hover:bg-indigo-500"
                  onClick={() => setMobileOpen(false)}
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <p className="text-xs text-slate-500">
                  Logged in as {user.email}
                </p>
                <Link
                  href="/dashboard/add-product"
                  className="rounded-lg px-2 py-2 hover:bg-slate-50"
                  onClick={() => setMobileOpen(false)}
                >
                  Add Product
                </Link>
                <Link
                  href="/dashboard/manage-products"
                  className="rounded-lg px-2 py-2 hover:bg-slate-50"
                  onClick={() => setMobileOpen(false)}
                >
                  Manage Products
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="rounded-lg px-2 py-2 text-left text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
