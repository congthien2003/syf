import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Editor from "@monaco-editor/react";
import { useSearchParams } from "react-router-dom";
import { getSnippetById } from "../../../core/services/SnippetsService";

const ViewPage = () => {
	const [searchParams] = useSearchParams();
	const id = searchParams.get("id");
	console.log(id);

	// Giả sử dữ liệu được fetch từ Supabase hoặc API
	const [description, setDescription] = useState<string>(
		"## Loading description...     Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam fugit, aspernatur corporis, soluta eligendi odit quidem velit unde pariatur numquam ipsum saepe quia iusto repellat officia eaque labore at dolores?"
	);
	const [code, setCode] = useState<string>(
		"# Hello World from ShareYourFunctions..."
	);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		if (id) {
			const fetch = async () => {
				// Giả sử lấy dữ liệu từ API hoặc Supabase theo id
				const { data, error } = await getSnippetById(id);
				console.log(data);
				if (error) {
					setDescription(data.description);
					setCode(data.code);
				} else {
					setDescription(data.description);
					setCode(data.code);
				}
			};
			fetch();
		}
	}, [id]);

	// Hàm copy code
	const copyCode = async () => {
		try {
			await navigator.clipboard.writeText(code);
			alert("Code copied to clipboard!");
		} catch (error) {
			console.error("Failed to copy code:", error);
			alert("Failed to copy code!");
		}
	};

	return (
		<div className="flex">
			{/* Markdown Viewer */}
			<div className="w-1/2 p-4 border-r border-gray-300">
				<h2 className="text-lg font-semibold mb-2">📜 Description</h2>
				<div className="p-2 border rounded bg-gray-50 min-h-[200px] ">
					<ReactMarkdown>{description}</ReactMarkdown>
				</div>
			</div>

			{/* Code Viewer */}
			<div className="w-1/2 p-4">
				<div className="flex justify-between items-center mb-2">
					<h2 className="text-lg font-semibold">💻 Code</h2>
					<button
						onClick={copyCode}
						className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
						<i
							className="fa fa-clipboard mr-2"
							aria-hidden="true"></i>{" "}
						Copy Code
					</button>
				</div>

				<Editor
					height="80vh"
					defaultLanguage="javascript"
					value={code}
					theme="vs-dark"
					options={{
						readOnly: true, // Không cho chỉnh sửa
						automaticLayout: true,
					}}
				/>
			</div>
		</div>
	);
};

export default ViewPage;
