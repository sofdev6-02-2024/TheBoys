import React from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => (
  <div className="absolute top-[+130px] right-20 flex justify-end mb-6 hidden sm:flex">
    {Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index}
        className={`w-12 h-12 rounded-full mx-1 ${
          currentPage === index + 1 ? "bg-red-500 text-white" : "bg-gray-300 text-black"
        }`}
        onClick={() => onPageChange(index + 1)}
      >
        {index + 1}
      </button>
    ))}
  </div>
);

export default Pagination;
