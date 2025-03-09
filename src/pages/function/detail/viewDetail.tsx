/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";
import {
	getSnippetById,
	updateSnippetView,
} from "../../../core/services/SnippetsService";
import { Snippet } from "../../../core/interface/Snippets";
import { toaster } from "../../../components/ui/toaster";
import "../../../utils/shared.css";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../core/store/loadingSlice";
import { Button } from "../../../components/ui/button";
import CodeEditor from "../../../components/ui/code-editor/code-editor";
const ViewPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const params = useParams();
	const id = params.id || "";

	const [snippet, setSnippet] = useState<Snippet>();

	// Giả sử dữ liệu được fetch từ Supabase hoặc API
	const [description, setDescription] = useState<string>(
		`## Loading description... \n`
	);
	const [code, setCode] = useState<string>(
		"# Hello World from ShareYourFunctions..."
	);

	const setAll = function (data: Snippet): void {
		setSnippet(data);
		setDescription(data.description || "");
		setCode(data.code);
	};

	const fetch = async () => {
		// Giả sử lấy dữ liệu từ API hoặc Supabase theo id
		dispatch(showLoading());
		const { data, error } = await getSnippetById(id);
		if (error) {
			setDescription(data.description);
			setCode(data.code);
		} else {
			setSnippet(data);
			setAll(data);
			setTimeout(async () => {
				await updateSnippetView(id, snippet!.views + 1);
			}, 3000);
		}
		dispatch(hideLoading());
	};
	// // eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		console.log("Effect");

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
		<div className="w-screen min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center p-6">
			<div className="container max-w-[1400px] flex flex-col items-center gap-6">
				{/* Header Card */}
				<div className="w-full bg-white border backdrop-blur-sm bg-opacity-90 rounded-xl shadow-lg p-6">
					<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
						<div className="space-y-2">
							<h1 className="lg:text-3xl md:text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-gray-800 ">
								{snippet?.name ?? "Function Name"}
							</h1>
							<div className="flex flex-wrap gap-4 items-center text-sm">
								<div className="flex items-center gap-2">
									<i className="fas fa-user text-blue-500"></i>
									<span className="text-gray-600 font-medium">
										{snippet?.author_name ?? "Name"}
									</span>
								</div>
								<div className="flex items-center gap-2">
									<i className="fas fa-calendar text-green-500"></i>
									<span className="text-gray-600 font-medium">
										{snippet?.created_at
											.toString()
											.substring(0, 10) ?? "None"}
									</span>
								</div>
								<div className="flex items-center gap-2">
									<i className="fas fa-eye text-purple-500"></i>
									<span className="text-gray-600 font-medium">
										{snippet?.views ?? 0} views
									</span>
								</div>
							</div>
						</div>
						<Button
							onClick={() => navigate("/")}
							className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
							Join now !
						</Button>
					</div>
				</div>

				{/* Content Section */}
				<div className="flex flex-col lg:flex-row w-full gap-6">
					{/* Description Card */}
					<div className="flex-[40%] bg-white rounded-xl shadow-lg overflow-hidden">
						<div className="border-b bg-gradient-to-r from-gray-50 to-white p-4">
							<h2 className="lg:text-xl md:text-sm font-semibold flex items-center gap-2 lg:h-[50px] md:h-[35[px]">
								<span className="text-2xl">📜</span>
								Description
							</h2>
						</div>
						<div className="p-6">
							<div className="prose prose-sm md:prose-base max-w-none rounded-lg bg-gray-50 p-6">
								<ReactMarkdown>{description}</ReactMarkdown>
							</div>
						</div>
					</div>

					{/* Code Card */}
					<div className="flex-[60%] bg-white rounded-xl shadow-lg overflow-hidden">
						<div className="border-b bg-gradient-to-r from-gray-50 to-white p-4">
							<div className="flex justify-between items-center h-[50px]">
								<h2 className="lg:text-xl md:text-sm font-semibold flex items-center gap-2">
									<span className="text-2xl">💻</span>
									Code
								</h2>
								<div className="flex items-center gap-4">
									<div className="flex items-center gap-2 text-sm text-gray-600 ">
										<i className="fas fa-code"></i>
										<span>
											{snippet?.language ?? "None"}
										</span>
									</div>
									<div className="items-center gap-2 text-sm text-gray-600 hidden lg:flex">
										<i className="fas fa-align-left"></i>
										<span>
											{code.split("\n").length} lines
										</span>
									</div>
									<Button
										onClick={copyCode}
										className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
										<i className="fas fa-copy"></i>
										Copy
									</Button>
								</div>
							</div>
						</div>
						<div className="p-6">
							<CodeEditor
								code={code}
								language={
									snippet?.language.toLowerCase() ||
									"javascript"
								}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ViewPage;
