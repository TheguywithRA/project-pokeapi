import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-red-500 text-white rounded-l disabled:opacity-50"
      >
        Previous
      </button>
      <span className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">{currentPage} / {totalPages}</span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-red-500 text-white rounded-r disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
