/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactMarkdown from "react-markdown";
import Editor from "@monaco-editor/react";
import { useRef, useState } from "react";
import { addSnippet } from "../../../core/services/SnippetsService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../core/store/store";
import { hideLoading, showLoading } from "../../../core/store/loadingSlice";
import { toaster } from "../../../components/ui/toaster";
import { Button } from "../../../components/ui/button";
import { Input } from "@chakra-ui/react/input";
import { Textarea } from "@chakra-ui/react";
import { Field } from "../../../components/ui/field";
export default function StorePage() {
	const dispatch = useDispatch();

	const user = useSelector((state: RootState) => state.auth.user);
	console.log(user);

	const [markdown, setMarkdown] = useState<string>(
		"## Mô tả\nNhập mô tả ở đây..."
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

	const [functionName, setFunctionName] = useState("");

	const save = async () => {
		dispatch(showLoading());
		// TODO: Save markdown and code to database
		setisEditDescription(false);
		formatCode();
		const { data, error } = await addSnippet(markdown, code, user.id);
		console.log(data);
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

	// TODO: Add Genarate description for function

	return (
		<>
			<div className="flex gap-2 flex-col px-4 md:px-0 md:flex-row">
				{/* Markdown Editor */}
				<div className="w-full md:w-1/2 p-6 border-r border-gray-300 bg-white shadow-lg rounded-lg">
					<h2 className="text-lg font-semibold mb-2">
						📜 Markdown Description
					</h2>
					<div className="mb-4 flex">
						<Field label="Function Name" required>
							<Input
								placeholder="Input function name..."
								value={functionName}
								onChange={(e) =>
									setFunctionName(e.target.value)
								}
								className="border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
							/>
						</Field>
					</div>
					{isEditDescription ? (
						<textarea
							onBlur={() => setisEditDescription(false)}
							className="w-full h-1/2 p-2 border rounded resize-none transition-all min-h-[400px]"
							value={markdown}
							onChange={(e) => setMarkdown(e.target.value)}
						/>
					) : (
						<div
							className="p-2 border rounded bg-gray-50 min-h-[400px] transition-all"
							onClick={() => setisEditDescription(true)}>
							<ReactMarkdown>{markdown}</ReactMarkdown>
						</div>
					)}
					<div>
						<button
							className="px-4 py-1 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all cursor-pointer"
							onClick={save}>
							Save
						</button>
					</div>
				</div>

				{/* Code Editor */}
				<div className="w-full md:w-1/2 p-6 border-r border-gray-300 bg-white shadow-lg rounded-lg">
					<div
						className="flex items-center justify-between mb-2
					">
						<h2 className="text-lg font-semibold mb-2">
							💻 Code Editor
						</h2>
						<div className="info">
							<div>
								<span className="text-gray-500">
									{editorRef.current
										?.getModel()
										?.getValueLength()}{" "}
									characters
								</span>
							</div>
							<button
								onClick={formatCode}
								className="px-3 py-1 bg-blue-500
						 text-white rounded hover:bg-blue-600 transition-all cursor-pointer">
								<i className="fa-solid fa-wand-magic-sparkles mr-2"></i>
								Format Code
							</button>
						</div>
					</div>

					<Editor
						height="80vh"
						defaultLanguage="javascript"
						value={code}
						onMount={handleEditorDidMount}
						onChange={(value) => setCode(value || "")}
						theme="vs-dark"
						options={{
							automaticLayout: true,
							formatOnType: true,
							formatOnPaste: true,
						}}
					/>
				</div>
			</div>
		</>
	);
}
