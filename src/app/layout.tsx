import type { Metadata } from "next";
import "./globals.css";
import { FiUsers } from "react-icons/fi";
import Link from "next/link";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "User & Posts Dashboard",
  description: "Dashboard built with Next.js, TypeScript, Zustand, and Zod",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 min-h-screen">
        <Toaster position="top-right" richColors />
        <nav className="bg-white border-b border-slate-200 px-6 py-8 sticky top-0 z-10 shadow-sm">
          <Link
            href="/"
            className="font-bold text-blue-600 text-xl tracking-tight hover:text-blue-700 transition-colors"
          >
            <div className="flex items-center gap-2">
              <FiUsers />
              <span>UserDash</span>
            </div>
          </Link>
        </nav>
        <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
