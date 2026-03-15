"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visiblePages = pages.filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1
  );

  return (
    <div className="flex items-center gap-2 justify-center mt-6">

      {/* PREV */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-2 py-2 text-sm font-medium rounded-xl  text-slate-600 disabled:opacity-40 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
      >
        <ChevronLeft className="w-4 h-4" />
        
      </button>

      {/* PAGE NUMBERS */}
      <div className="flex items-center gap-1">
        {visiblePages.map((page, idx) => {
          const prev = visiblePages[idx - 1];
          const showEllipsis = prev && page - prev > 1;
          return (
            <span key={page} className="flex items-center gap-1">
              {showEllipsis && (
                <span className="w-9 h-9 flex items-center justify-center text-slate-400 text-sm">
                  …
                </span>
              )}
              <button
                onClick={() => onPageChange(page)}
                className={`w-9 h-9 text-sm font-medium rounded-xl border transition-all duration-200 ${page === currentPage
                    ? "bg-blue-600 text-white border-blue-400 shadow-sm"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
                  }`}
              >
                {page}
              </button>
            </span>
          );
        })}
      </div>

      {/* NEXT */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-xl  text-slate-600 disabled:opacity-40 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
      >
       
        <ChevronRight className="w-4 h-4" />
      </button>

    </div>
  );
}