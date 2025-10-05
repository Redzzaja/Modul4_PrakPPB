// src/components/common/Pagination.jsx
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) {
    return null; // Jangan tampilkan pagination jika hanya ada 1 halaman
  }

  return (
    <nav
      className="flex items-center justify-center gap-4 mt-8 md:mt-12"
      aria-label="Pagination"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center p-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <ChevronLeft className="h-5 w-5 text-gray-600" />
        <span className="sr-only">Previous</span>
      </button>

      <div className="text-sm font-medium text-gray-700">
        Halaman <span className="font-bold text-blue-600">{currentPage}</span>{" "}
        dari <span className="font-bold">{totalPages}</span>
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center p-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <ChevronRight className="h-5 w-5 text-gray-600" />
        <span className="sr-only">Next</span>
      </button>
    </nav>
  );
}
