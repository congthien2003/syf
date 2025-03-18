/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactMarkdown from "react-markdown";
import Editor from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import { addSnippet } from "../../../core/services/SnippetsService";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../core/store/loadingSlice";
import { toaster } from "../../../components/ui/toaster";
import { Button } from "../../../components/ui/button";
import { Input } from "@chakra-ui/react/input";
import {
	SelectContent,
	SelectItem,
	SelectRoot,
	SelectTrigger,
	SelectValueText,
} from "../../../components/ui/select";
import { ListLanguages } from "../../../const/listLanguage";
import { createListCollection } from "@chakra-ui/react/collection";
import { useNavigate } from "react-router-dom";
import "./style.css";
import Modal from "../../../components/ui/gemini-modal/GeminiModal";
import { useAuth } from "../../../hooks/useAuth";

export default function StorePage() {
	const dispatch = useDispatch();

	const navigate = useNavigate();
	const user = useAuth();

	useEffect(() => {
		if (!user) {
			navigate("/auth/login");
		}
	}, [user, navigate]);

	const [markdown, setMarkdown] = useState<string>(
		"## Description \nInput description here..."
	);
	const [code, setCode] = useState<string>("console.log('Hello, world!');");

	const editorRef = useRef<any>(null);

	const handleEditorDidMount = (editor: any) => {
		editorRef.current = editor;
	};

	const formatCode = function () {
		if (editorRef.current) {
			editorRef.current.getAction("editor.action.formatDocument").run();
		}
	};

	const [isEditDescription, setisEditDescription] = useState<boolean>(true);

	const [functionName, setFunctionName] = useState("Test Function");

	const [isOpen, setisOpen] = useState(false);

	const save = async () => {
		dispatch(showLoading());
		// TODO: Save markdown and code to database
		setisEditDescription(false);
		formatCode();
		const { error } = await addSnippet(
			functionName,
			markdown,
			code,
			user.id,
			selectedLanguage.toLowerCase(),
			user.email
		);
		if (error) {
			dispatch(hideLoading());
			toaster.error({
				title: "Error saving function",
				description: error.message,
				duration: 2500,
			});
		} else {
			dispatch(hideLoading());
			toaster.success({
				title: "Function saved successfully",
				duration: 2500,
			});
		}
	};

	// Select Language
	const listLanguage = createListCollection({
		items: [...ListLanguages],
	});

	const [selectedLanguage, setSelectedLanguage] = useState("Javascript");

	return (
		<>
			<div className="flex flex-col justify-between w-full gap-6 md:px-0 md:flex-row">
				{/* Markdown Editor */}
				<div className="w-full md:w-1/2 p-6 border-r border-gray-300 bg-white shadow-lg rounded-lg">
					<div className="flex items-center justify-between">
						<h2 className="text-lg font-semibold mb-2">
							📜 Markdown Description
						</h2>

						<div className="flex gap-2">
							<Button
								className="rounded-lg active:bg-gray-300"
								variant={"outline"}
								onClick={() => setisOpen(true)}>
								<svg
									height={20}
									width={20}
									fill="#000"
									viewBox="0 0 24 24"
									data-name="Layer 1"
									id="Layer_1"
									className="sparkle">
									<path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z" />
								</svg>
								Generate
							</Button>
							<Button
								className="px-4 py-1 rounded-lg transition-all cursor-pointer"
								onClick={save}>
								Save
							</Button>
						</div>
					</div>
					<div className="mb-4 flex flex-col">
						<h4 className="mb-2">Function Name</h4>
						<Input
							placeholder="Input function name..."
							value={functionName}
							onChange={(e) => setFunctionName(e.target.value)}
							className="border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
						/>
					</div>
					<div className="">
						{isEditDescription ? (
							<textarea
								onBlur={() => setisEditDescription(false)}
								className="w-full h-1/2 p-2 border rounded  transition-all min-h-[400px] min-w-[570px] box-border"
								value={markdown}
								onChange={(e) => setMarkdown(e.target.value)}
							/>
						) : (
							<div
								className="w-full p-2 border rounded bg-gray-50 min-h-[400px] min-w-[570px] transition-all box-border"
								onClick={() => setisEditDescription(true)}>
								<ReactMarkdown className="w-full max-w-full rounded  transition-all min-h-[400px] prose">
									{markdown}
								</ReactMarkdown>
							</div>
						)}
					</div>
				</div>

				{/* Code Editor */}
				<div className="w-1/2 md:w-1/2 py-3 px-6 border-r border-gray-300 bg-white shadow-lg rounded-lg">
					<div
						className="flex items-center justify-between mb-2
					">
						<h2 className="text-lg font-semibold mb-2">
							💻 Code Editor
						</h2>
						<div className="flex items-center gap-4">
							<span className="text-gray-500">
								{editorRef.current
									?.getModel()
									?.getLineCount() ?? 1}{" "}
								lines
							</span>
							<div className="dropdown-language">
								<SelectRoot
									collection={listLanguage}
									size="sm"
									width="150px">
									<SelectTrigger>
										<SelectValueText
											placeholder={selectedLanguage}
										/>
									</SelectTrigger>
									<SelectContent>
										{listLanguage.items.map((item) => (
											<SelectItem
												item={item}
												key={item.value}
												onClick={() =>
													setSelectedLanguage(
														item.value
													)
												}>
												{item.label}
											</SelectItem>
										))}
									</SelectContent>
								</SelectRoot>
							</div>

							<Button
								onClick={formatCode}
								className="px-3 py-1 
						 text-white rounded-lg  transition-all cursor-pointer">
								<i className="fa-solid fa-wand-magic-sparkles mr-2"></i>
								Format Code
							</Button>
						</div>
					</div>
					<Editor
						className="editor"
						height="70vh"
						defaultLanguage={selectedLanguage.toLowerCase()}
						value={code}
						onMount={handleEditorDidMount}
						onChange={(value) => setCode(value || "")}
						theme="vs-dark"
						beforeMount={(monaco) => {
							monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions(
								{
									noSyntaxValidation: true, // 🚀 Disable syntax validation
								}
							);
						}}
						options={{
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
							fontSize: 16,
							fontWeight: "450",
							lineHeight: 1.5,
							tabSize: 4,
						}}
					/>
				</div>
			</div>

			<Modal
				codeValue={code}
				codeLanguage={selectedLanguage}
				isOpen={isOpen}
				onClose={() => setisOpen(false)}
				onConfirm={function (description: string) {
					setMarkdown(description);
					setisOpen(false);
					toaster.success({
						title: "Description saved successfully",
						duration: 2000,
					});
				}}></Modal>
		</>
	);
}
