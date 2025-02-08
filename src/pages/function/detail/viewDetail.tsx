/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import Editor from "@monaco-editor/react";
import { useParams } from "react-router-dom";
import { getSnippetById } from "../../../core/services/SnippetsService";
import { Snippet } from "../../../core/interface/Snippets";
import { toaster } from "../../../components/ui/toaster";
import "../../../utils/shared.css";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../core/store/loadingSlice";
const ViewPage = () => {
	const dispatch = useDispatch();
	const params = useParams();
	const id = params.id || "";

	const [snippet, setSnippet] = useState<Snippet>();
	// Giả sử dữ liệu được fetch từ Supabase hoặc API
	const [description, setDescription] = useState<string>(
		"## Loading description... \n Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam fugit, aspernatur corporis, soluta eligendi odit quidem velit unde pariatur numquam ipsum saepe quia iusto repellat officia eaque labore at dolores?"
	);
	const [code, setCode] = useState<string>(
		"# Hello World from ShareYourFunctions..."
	);
	const [language] = useState<string>("Javascript");

	const editorRef = useRef<any>(null);

	const handleEditorDidMount = (editor: any) => {
		editorRef.current = editor;
	};

	const fetch = async () => {
		// Giả sử lấy dữ liệu từ API hoặc Supabase theo id
		const { data, error } = await getSnippetById(id);

		if (error) {
			setDescription(data.description);
			setCode(data.code);
		} else {
			setSnippet(data);
			setDescription(data.description);
			setCode(data.code);
		}
		dispatch(hideLoading());
	};
	// // eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		dispatch(showLoading());

		if (id) {
			fetch();
		}
	}, []);

	// Hàm copy code
	const copyCode = async () => {
		try {
			await navigator.clipboard.writeText(code);
			toaster.create({
				title: "Code copied to clipboard!",
				duration: 3000,
			});
		} catch (error) {
			console.error("Failed to copy code:", error);
			toaster.error({
				title: "Failed to copy code",
				duration: 3000,
			});
		}
	};

	return (
		<>
			<div className="w-screen min-h-screen overflow-hidden bg-gray-100 p-4 flex flex-col items-center">
				{/* Function Name */}
				<h1 className="text-2xl font-bold text-gray-800">
					{snippet?.name ?? "Function Name"}
				</h1>
				<h4 className="text-md font-medium text-gray-500 mb-4">
					Author: {snippet?.author_name ?? ""}
				</h4>

				<div className="flex flex-col md:flex-row w-full gap-6">
					{/* Markdown Viewer */}
					<div className="flex-[40%] p-6 border border-gray-300 bg-white shadow-md rounded-lg">
						<h2 className="text-xl font-semibold text-gray-700 mb-6">
							📜 Description
						</h2>
						<div className="p-3 border rounded-lg bg-gray-50 min-h-[80%] text-gray-800 fade-in">
							<ReactMarkdown>{description}</ReactMarkdown>
						</div>
					</div>

					{/* Code Viewer */}
					<div className="w-full flex-[60%] h-full md:w-1/2 p-6 border border-gray-300 bg-white shadow-md rounded-lg fade-in">
						<div className="flex justify-between items-center mb-3">
							<h2 className="text-xl font-semibold text-gray-700">
								💻 Code
							</h2>
							<div className="flex items-center gap-3">
								<span className="text-gray-500">
									{editorRef.current
										?.getModel()
										?.getLineCount() ?? 0}{" "}
									lines
								</span>
								<span className="text-gray-700 font-medium">
									{language}
								</span>
								<button
									onClick={copyCode}
									className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200">
									<i className="fa fa-clipboard mr-2"></i>{" "}
									Copy
								</button>
							</div>
						</div>

						<Editor
							height="70vh"
							defaultLanguage="javascript"
							value={code}
							onMount={handleEditorDidMount}
							onChange={(value) => setCode(value || "")}
							theme="vs-dark"
							options={{
								readOnly: true,
								automaticLayout: true,
								formatOnType: true,
								formatOnPaste: true,
								smoothScrolling: true,
								scrollbar: {
									vertical: "visible",
									horizontal: "hidden",
								},
								minimap: {
									enabled: false,
								},
								padding: {
									top: 4,
									bottom: 4,
								},
							}}
							className="rounded-lg border border-gray-300"
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default ViewPage;
