import { useState } from "react";
import "./style.css";
import ButtonView from "../../../components/ui/button-view/button-view";
import { Avatar } from "../../../components/ui/avatar";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getList } from "../../../core/services/SnippetsService";
import { Snippet } from "../../../core/interface/Snippets";
import Pagination from "../../../components/ui/pagination/Pagination";

export default function Dashboard() {
	const [page, setPage] = useState(1);
	const [pageSize] = useState(10);
	const [search, setSearch] = useState("");
	const [filter] = useState([]);

	const { data } = useQuery({
		queryKey: ["snippets", page, pageSize, search, filter],
		queryFn: () =>
			getList({
				page,
				pageSize,
				search,
				filter, // Lọc theo ngôn ngữ
			}),
		placeholderData: keepPreviousData,
	});

	const handleChangePage = (newPage: number) => {
		setPage(newPage);
	};

	// const handleFilter = (newValue: string) => {
	// 	const array: string[] = [];
	// 	const index = array.indexOf(newValue);
	// 	if (index === -1) {
	// 		console.log(array);

	// 		// Nếu chưa có, thêm vào
	// 		return [...array, newValue];
	// 	} else {
	// 		return array.filter((_, i) => i !== index);
	// 	}
	// };

	return (
		<div className="dashboard">
			<div className="container">
				{/* Header Section */}
				<div className="header">
					<h1>Discover Functions</h1>
					<p>
						Explore and find the perfect function for your project
					</p>
					{/* Search and Filter Bar */}
					<div className="search-filter-container">
						<div className="search-input-wrapper">
							<input
								type="text"
								placeholder="Search functions..."
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								className="search-input"
							/>
						</div>
						{/* <div className="filter-tags">
						{ListLanguages.map((lang) => (
							<button
								onClick={() => handleFilter(lang.value)}
								className={`filter-tag ${
									filter.includes(lang.value) ? "active" : ""
								}`}>
								{lang.label}
							</button>
						))}
					</div> */}
					</div>
				</div>

				{/* Function List */}
				<div className="function-list">
					{data?.data?.map((snippet: Snippet) => (
						<div key={snippet.id} className="function-card">
							<div className="card-content">
								<div className="card-info">
									<h2 className="function-title">
										{snippet.name}
									</h2>
									<div className="metadata">
										<div className="metadata-item">
											<Avatar
												name={snippet.author_name}
												size="sm"
											/>
											<span>{snippet.author_name}</span>
										</div>
										<div className="metadata-item">
											<i className="fas fa-calendar text-blue-500"></i>
											<span>
												{new Date(
													snippet.created_at
												).toLocaleDateString()}
											</span>
										</div>
										<div className="metadata-item">
											<i className="fas fa-code text-green-500"></i>
											<span>{snippet.language}</span>
										</div>
										<div className="metadata-item">
											<i className="fas fa-eye text-purple-500"></i>
											<span>{snippet.views} views</span>
										</div>
										<div className="metadata-item">
											<i className="fas fa-heart text-red-500"></i>
											<span>{snippet.likes} likes</span>
										</div>
									</div>
								</div>
								<div className="card-actions">
									<ButtonView
										name="View Details"
										to={`/view/${snippet.id}`}></ButtonView>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Pagination */}
				<div className="pagination-container">
					<Pagination
						page={page}
						total={data?.total ?? 0}
						pageSize={pageSize}
						onPageChange={handleChangePage}
					/>
				</div>
			</div>
		</div>
	);
}
