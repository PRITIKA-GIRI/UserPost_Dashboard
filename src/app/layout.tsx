import type { Metadata } from "next";
import "./globals.css";

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
        <nav className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-10 shadow-sm">
          <a
            href="/"
            className="font-bold text-blue-600 text-xl tracking-tight hover:text-blue-700 transition-colors"
          >
            👥 UserDash
          </a>
        </nav>
        <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
