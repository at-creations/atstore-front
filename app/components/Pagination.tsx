import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  const renderPagination = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`px-4 py-2 mx-1 ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded`}
          >
            {i}
          </button>
        );
      }
    } else {
      pages.push(
        <button
          key={1}
          onClick={() => onPageChange(1)}
          className={`px-4 py-2 mx-1 ${currentPage === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded`}
        >
          1
        </button>
      );

      if (currentPage > 3) {
        pages.push(<span key="start-ellipsis" className="px-4 py-2 mx-1">...</span>);
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`px-4 py-2 mx-1 ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded`}
          >
            {i}
          </button>
        );
      }

      if (currentPage < totalPages - 2) {
        pages.push(<span key="end-ellipsis" className="px-4 py-2 mx-1">...</span>);
      }

      pages.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className={`px-4 py-2 mx-1 ${currentPage === totalPages ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded`}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex justify-center mt-8">
      {totalPages > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 rounded disabled:opacity-30 text-gray-900 dark:text-white"
          style={{ backgroundColor: 'transparent' }}
        >
          <FaChevronLeft />
        </button>
      )}
      {renderPagination()}
      {totalPages > 1 && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 rounded disabled:opacity-30 text-gray-900 dark:text-white"
          style={{ backgroundColor: 'transparent' }}
        >
          <FaChevronRight />
        </button>
      )}
    </div>
  );
};

export default Pagination;