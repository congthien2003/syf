import React from "react";

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
	const maxVisiblePages = 6;

	// Tạo mảng số trang hiển thị
	const getPages = () => {
		let start = Math.max(1, page - Math.floor(maxVisiblePages / 2));
		const end = Math.min(totalPages, start + maxVisiblePages - 1);

		if (end - start < maxVisiblePages - 1) {
			start = Math.max(1, end - maxVisiblePages + 1);
		}

		return Array.from({ length: end - start + 1 }, (_, i) => start + i);
	};

	return (
		<div className="flex justify-center items-center space-x-2 mt-4">
			<button
				className={`px-3 py-1 border rounde cursor-pointerd ${
					page === 1
						? "opacity-50 cursor-not-allowed"
						: "hover:bg-gray-200"
				}`}
				onClick={() => onPageChange(page - 1)}
				disabled={page === 1}>
				Prev
			</button>

			{getPages().map((p) => (
				<button
					key={p}
					className={`px-3 py-1 border rounded cursor-pointer ${
						p === page
							? "bg-blue-500 text-white"
							: "hover:bg-gray-200"
					}`}
					onClick={() => onPageChange(p)}>
					{p}
				</button>
			))}

			<button
				className={`px-3 py-1 border rounded cursor-pointer ${
					page === totalPages
						? "opacity-50 cursor-not-allowed"
						: "hover:bg-gray-200"
				}`}
				onClick={() => onPageChange(page + 1)}
				disabled={page === totalPages}>
				Next
			</button>
		</div>
	);
};

export default Pagination;
