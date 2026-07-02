import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

export const Pagination = ({
  currentPage,
  lastPage,
  onPageChange = () => {},
  from,
  to,
  total,
}) => {
  if (!lastPage || lastPage <= 1) return null;

  const pages = [];

  const start = Math.max(1, currentPage - 2);
  const end = Math.min(lastPage, currentPage + 2);

  if (start > 1) {
    pages.push(1);

    if (pages > 2) pages.push("...");
  }

  //   Output : 1 ... 5 6 7 8 9 ... 20

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < lastPage) {
    if (end < lastPage - 1) pages.push("...");
    pages.push(lastPage);
  }

  // console.log("pages", pages);

  return (
    <div className="flex items-center justify-between">
      <span>
        Showing {from} to {to} from {total} results
      </span>

      <div className="flex items-center justify-center gap-1 mt-4">
        {/* Left Arrow Button */}
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="w-8 h-8 mr-3 flex-items-center justify-center text-gray-500 rounded-full cursor-pointer hover:border hover:border-gray-200 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:border-transparent"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>

        {pages.map((page, index) =>
          page === "..." ? (
            <span key={index} className="text-gray-500 px-2">
              ...
            </span>
          ) : (
            <button
              onClick={() => onPageChange(page)}
              className={`w-8 h-8 flex items-center justify-center rounded-full border cursor-pointer ${currentPage === page ? "bg-indigo-600 text-white border-indigo-600" : "text-gray-600 hover:bg-gray-100 border-gray-300"}`}
            >
              {page}
            </button>
          ),
        )}

        {/* Right Arrow Click */}
        <button
          disabled={currentPage === lastPage}
          onClick={() => onPageChange(currentPage + 1)}
          className="w-8 h-8 ml-3 flex-items-center justify-center text-gray-500 rounded-full cursor-pointer hover:border hover:border-gray-200 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:border-transparent"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
