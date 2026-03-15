"use client";

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
    <div className="flex items-center gap-1 justify-center mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1.5 text-sm rounded border border-slate-200 disabled:opacity-40 hover:bg-slate-50 transition"
      >
        ←
      </button>
      {visiblePages.map((page, idx) => {
        const prev = visiblePages[idx - 1];
        const showEllipsis = prev && page - prev > 1;
        return (
          <span key={page} className="flex items-center gap-1">
            {showEllipsis && <span className="px-1 text-slate-400">…</span>}
            <button
              onClick={() => onPageChange(page)}
              className={`px-3 py-1.5 text-sm rounded border transition ${
                page === currentPage
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-slate-200 hover:bg-slate-50"
              }`}
            >
              {page}
            </button>
          </span>
        );
      })}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1.5 text-sm rounded border border-slate-200 disabled:opacity-40 hover:bg-slate-50 transition"
      >
        →
      </button>
    </div>
  );
}
