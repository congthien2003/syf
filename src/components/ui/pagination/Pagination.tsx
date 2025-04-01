import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface PaginationProps {
	page: number;
	total: number;
	pageSize: number;
	onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
	page,
	total,
	pageSize,
	onPageChange,
}) => {
	const totalPages = Math.ceil(total / pageSize);
	const maxVisiblePages = 5;

	const getPages = () => {
		let start = Math.max(1, page - Math.floor(maxVisiblePages / 2));
		const end = Math.min(totalPages, start + maxVisiblePages - 1);

		if (end - start < maxVisiblePages - 1) {
			start = Math.max(1, end - maxVisiblePages + 1);
		}

		const pages = Array.from(
			{ length: end - start + 1 },
			(_, i) => start + i
		);

		// Add ellipsis if needed
		if (start > 1) {
			pages.unshift(-1); // -1 represents ellipsis
			pages.unshift(1); // Always show first page
		}
		if (end < totalPages) {
			pages.push(-2); // -2 represents ellipsis
			pages.push(totalPages); // Always show last page
		}

		return pages;
	};

	return (
		<div className="flex flex-col items-center space-y-4 mt-8">
			<div className="flex items-center space-x-1">
				{/* Previous Button */}
				<button
					className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ${
						page === 1
							? "text-gray-300 cursor-not-allowed"
							: "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
					}`}
					onClick={() => page > 1 && onPageChange(page - 1)}
					disabled={page === 1}
					aria-label="Previous page">
					<FiChevronLeft className="w-5 h-5" />
				</button>

				{/* Page Numbers */}
				<div className="flex items-center space-x-1">
					{getPages().map((p, idx) => {
						if (p < 0) {
							// Render ellipsis
							return (
								<span
									key={`ellipsis-${idx}`}
									className="w-10 h-10 flex items-center justify-center text-gray-400">
									•••
								</span>
							);
						}

						return (
							<button
								key={p}
								onClick={() => onPageChange(p)}
								className={`relative w-10 h-10 rounded-full transition-all duration-200 
									${
										p === page
											? "bg-blue-500 text-white shadow-md hover:bg-blue-600"
											: "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
									}
									${
										p === page
											? "before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-blue-500 before:opacity-20 before:transform before:scale-150 before:animate-pulse"
											: ""
									}
								`}
								aria-label={`Page ${p}`}
								aria-current={p === page ? "page" : undefined}>
								<span className="relative z-10">{p}</span>
							</button>
						);
					})}
				</div>

				{/* Next Button */}
				<button
					className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ${
						page === totalPages
							? "text-gray-300 cursor-not-allowed"
							: "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
					}`}
					onClick={() => page < totalPages && onPageChange(page + 1)}
					disabled={page === totalPages}
					aria-label="Next page">
					<FiChevronRight className="w-5 h-5" />
				</button>
			</div>

			{/* Page Info */}
			<div className="text-sm text-gray-500">
				Page {page} of {totalPages}
				<span className="mx-2">•</span>
				{total} items
			</div>
		</div>
	);
};

export default Pagination;
