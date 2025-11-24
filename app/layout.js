// app/layout.js
import "./globals.css";
// import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Providers } from "@/components/Providers";

export const metadata = {
  title: "Next Firebase Shop",
  description: "Simple product catalog with Firebase auth and protected pages.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <Providers>
          <Navbar />
          <main className="mx-auto max-w-6xl px-4 pt-8 md:px-6">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
