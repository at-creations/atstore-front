import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const renderPagination = () => {
    const pages = [];

    if (totalPages <= 5) {
      // Show all pages when there are 5 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            aria-current={currentPage === i ? "page" : undefined}
            className={`
              flex items-center justify-center h-10 w-10 rounded-full mx-1 transition-all duration-200
              ${
                currentPage === i
                  ? "bg-blue-500 text-white shadow-md hover:bg-blue-600"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
              }
              font-medium text-sm
            `}
          >
            {i}
          </button>
        );
      }
    } else {
      // First page button
      pages.push(
        <button
          key={1}
          onClick={() => onPageChange(1)}
          aria-current={currentPage === 1 ? "page" : undefined}
          className={`
            flex items-center justify-center h-10 w-10 rounded-full mx-1 transition-all duration-200
            ${
              currentPage === 1
                ? "bg-blue-500 text-white shadow-md hover:bg-blue-600"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
            }
            font-medium text-sm
          `}
        >
          1
        </button>
      );

      // Show ellipsis if needed
      if (currentPage > 3) {
        pages.push(
          <button
            key="start-ellipsis"
            className="flex items-center justify-center h-10 px-2 text-gray-400 dark:text-gray-500"
            disabled
          >
            <span className="tracking-wider">•••</span>
          </button>
        );
      }

      // Middle pages
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            aria-current={currentPage === i ? "page" : undefined}
            className={`
              flex items-center justify-center h-10 w-10 rounded-full mx-1 transition-all duration-200
              ${
                currentPage === i
                  ? "bg-blue-500 text-white shadow-md hover:bg-blue-600"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
              }
              font-medium text-sm
            `}
          >
            {i}
          </button>
        );
      }

      // Show ellipsis if needed
      if (currentPage < totalPages - 2) {
        pages.push(
          <button
            key="end-ellipsis"
            className="flex items-center justify-center h-10 px-2 text-gray-400 dark:text-gray-500"
            disabled
          >
            <span className="tracking-wider">•••</span>
          </button>
        );
      }

      // Last page button
      pages.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          aria-current={currentPage === totalPages ? "page" : undefined}
          className={`
            flex items-center justify-center h-10 w-10 rounded-full mx-1 transition-all duration-200
            ${
              currentPage === totalPages
                ? "bg-blue-500 text-white shadow-md hover:bg-blue-600"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
            }
            font-medium text-sm
          `}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <nav aria-label="Pagination" className="flex justify-center mt-8">
      <div className="inline-flex items-center rounded-full bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 px-2">
        {totalPages > 1 && (
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
            className={`
            flex items-center justify-center h-10 w-10 rounded-full mx-1 transition-all duration-200
            ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-100 dark:hover:bg-gray-700"
            }
            text-gray-700 dark:text-gray-300
          `}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}

        <div className="flex items-center">{renderPagination()}</div>

        {totalPages > 1 && (
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
            className={`
            flex items-center justify-center h-10 w-10 rounded-full mx-1 transition-all duration-200
            ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-100 dark:hover:bg-gray-700"
            }
            text-gray-700 dark:text-gray-300
          `}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
      </div>
    </nav>
  );
};

export default Pagination;
