/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import Editor from "@monaco-editor/react";
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
const ViewPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const params = useParams();
	const id = params.id || "";

	const [snippet, setSnippet] = useState<Snippet>();

	// Giả sử dữ liệu được fetch từ Supabase hoặc API
	const [description, setDescription] = useState<string>(
		`## Loading description... \n Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam fugit, aspernatur corporis, soluta eligendi odit quidem velit unde pariatur numquam ipsum saepe quia iusto repellat officia eaque labore at dolores? Mức 2: Mô tả nâng cao \n - Điểm nổi bật
Xóa bỏ các ký tự đặc biệt.
Chuyển đổi chữ hoa thành chữ thường.
Thay thế khoảng trắng bằng ký tự phân tách (- hoặc _).
Hỗ trợ đa ngôn ngữ bằng cách loại bỏ dấu tiếng Việt hoặc ký tự Unicode đặc biệt.
- 📌 Trường hợp sử dụng
SEO Optimization: Tạo đường dẫn thân thiện với SEO khi xây dựng blog hoặc hệ thống CMS.
Quản lý URL: Biến tiêu đề bài viết thành đường dẫn dễ nhớ.
Xử lý dữ liệu: Chuẩn hóa tên tệp hoặc danh mục sản phẩm trong hệ thống quản lý nội dung.
- 📌 Trường hợp sử dụng
SEO Optimization: Tạo đường dẫn thân thiện với SEO khi xây dựng blog hoặc hệ thống CMS.
Quản lý URL: Biến tiêu đề bài viết thành đường dẫn dễ nhớ.
Xử lý dữ liệu: Chuẩn hóa tên tệp hoặc danh mục sản phẩm trong hệ thống quản lý nội dung.
- 📌 Trường hợp sử dụng
SEO Optimization: Tạo đường dẫn thân thiện với SEO khi xây dựng blog hoặc hệ thống CMS.
Quản lý URL: Biến tiêu đề bài viết thành đường dẫn dễ nhớ.
Xử lý dữ liệu: Chuẩn hóa tên tệp hoặc danh mục sản phẩm trong hệ thống quản lý nội dung.`
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
		// dispatch(showLoading());
		// const { data, error } = await getSnippetById(id);
		// if (error) {
		// 	setDescription(data.description);
		// 	setCode(data.code);
		// } else {
		// 	setSnippet(data);
		// 	setDescription(data.description);
		// 	setCode(data.code);
		// 	setTimeout(async () => {
		// 		await updateSnippetView(id, snippet!.views + 1);
		// 	}, 3000);
		// }
		// dispatch(hideLoading());
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
		<>
			<div className="w-screen min-h-screen overflow-hidden bg-gray-100 flex justify-center items-center">
				<div className="container flex flex-col items-center py-4">
					{/* Function Name */}
					<div className="flex items-center border-2 rounded-lg justify-between w-full mb-3 px-4 py-2">
						<div className="">
							<h1 className="text-2xl font-bold text-gray-800">
								{snippet?.name ?? "Function Name"}
							</h1>
							<div className="flex gap-4 items-center">
								<span className="text-md font-medium text-gray-500">
									Author: {snippet?.author_name ?? "Name"}
								</span>
								<span className="text-md font-medium text-gray-500">
									Date:{" "}
									{snippet?.created_at
										.toString()
										.substring(0, 10) ?? "None"}
								</span>
								<span
									className="
							text-md
							font-medium
							text-gray-500">
									View: 100
								</span>
							</div>
						</div>
						<div>
							<Button
								onClick={() => {
									navigate("/");
								}}
								className="px-6 py-2 text-white font-medium rounded-lg bg-gradient-to-r  transition-all duration-200 shadow-lg shadow-gray-500/30 hover:shadow-gray-500/50">
								Join now !
							</Button>
						</div>
					</div>

					<div className="flex flex-col md:flex-row w-full gap-6">
						{/* Markdown Viewer */}
						<div className="flex-[40%] p-6 border border-gray-300 bg-white shadow-md rounded-lg">
							<h2 className="text-xl font-semibold text-gray-700 mb-6">
								📜 Description
							</h2>
							<div className="p-3 border rounded-lg bg-gray-50 min-h-[80%] text-gray-800 fade-in">
								<ReactMarkdown className="prose">
									{description}
								</ReactMarkdown>
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
									<Button
										onClick={copyCode}
										className="px-4 py-2 text-white font-medium rounded-lg bg-gradient-to-r  transition-all duration-200 shadow-lg shadow-gray-500/30 hover:shadow-gray-500/50">
										<i className="fa fa-clipboard mr-2"></i>
										Copy
									</Button>
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
			</div>
		</>
	);
};

export default ViewPage;
