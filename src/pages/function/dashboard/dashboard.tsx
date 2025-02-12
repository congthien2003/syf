import React, { useState } from "react";
import "./style.css";
import ButtonView from "../../../components/ui/button-view/button-view";
import { Avatar } from "../../../components/ui/avatar";
import { Checkbox } from "../../../components/ui/checkbox";
import { ListLanguages } from "../../../const/listLanguage";
import { useQuery } from "@tanstack/react-query";
import { getList } from "../../../core/services/SnippetsService";
import { Snippet } from "../../../core/interface/Snippets";
export default function Dashboard() {
	const [filterLang, setFilterLang] = useState("");

	const listLanguage = ListLanguages.map((item) => (
		<Checkbox
			size="sm"
			key={item.value}
			variant={"subtle"}
			checked={filterLang == item.value}
			onClick={() => setFilterLang(item.value)}>
			{item.label}
		</Checkbox>
	));
	const [page] = useState(1);
	const { data } = useQuery({
		queryKey: ["snippets", page],
		queryFn: () => getList(page),
	});

	return (
		<>
			<div className="dashboard">
				<div className="container flex justify-center">
					<div className="content">
						<div className="list">
							<div className="list__header flex items-center justify-between">
								<h4>List Function</h4>
							</div>
							{data?.data?.map((snippet: Snippet) => {
								return (
									<li
										className="info-container"
										key={snippet.id}>
										<div className="info">
											<h5 className="name">
												{snippet.name}
											</h5>
											<p className="description">
												{snippet.descripion}
											</p>
											<div className="author flex align-center items-center">
												<p className="flex align-center items-center gap-2">
													<Avatar
														name={
															snippet.author_name
														}
														size="xs"
													/>
													{snippet.author_name}
												</p>
												<p>
													Date:{" "}
													{snippet.created_at.toLocaleString(
														"vi-VN",
														{
															day: "numeric",
															month: "long",
															year: "numeric",
														}
													)}
												</p>
											</div>
										</div>
										<div className="action">
											<ButtonView
												name="View Code"
												to={`/view/${snippet.id}`}></ButtonView>
										</div>
									</li>
								);
							})}
							<div className="pagination">
								{/* <button
									onClick={() => setPage((p) => p - 1)}
									disabled={page === 1}>
									Trang trước
								</button>
								<span>Page {page}</span> of {data?.totalPages}{" "}
								pages
								<span>Total: {data?.totalItems} snippets</span>
								<button onClick={() => setPage((p) => p + 1)}>
									Trang sau
								</button> */}
							</div>
						</div>
						<div className="list-filter">
							<h3>Filter</h3>
							<div className="filter">
								<h4 className="px-1 mb-2 text-sm text-gray-dark">
									Languages
								</h4>
								<div className="filter-item flex flex-col pl-4">
									{listLanguage}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
