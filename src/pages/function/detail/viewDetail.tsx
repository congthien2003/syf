/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";
import {
	getSnippetById,
	updateSnippetView,
	updateSnippetLikes,
} from "../../../core/services/SnippetsService";
import { Snippet } from "../../../core/interface/Snippets";
import { toaster } from "../../../components/ui/toaster";
import "../../../utils/shared.css";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../../core/store/loadingSlice";
import { Button } from "../../../components/ui/button";
import CodeEditor from "../../../components/ui/code-editor/code-editor";
import { RootState } from "../../../core/store/store";
import { Tabs } from "@chakra-ui/react";
import { FaCode, FaFile, FaHashtag } from "react-icons/fa";

const style = {
	background: "rgb(40, 40, 48)",
	padding: "8px 0px",
};

const ViewPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const params = useParams();
	const isLogin = useSelector((state: RootState) => state.auth.user);
	const id = params.id || "";

	const [snippet, setSnippet] = useState<Snippet | null>(null);
	const [isLiked, setIsLiked] = useState(false);
	const [likeCount, setLikeCount] = useState(0);

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
		setLikeCount(data.likes || 0);
	};

	const fetch = async () => {
		// Giả sử lấy dữ liệu từ API hoặc Supabase theo id
		dispatch(showLoading());
		const { data, error } = await getSnippetById(id);
		if (error) {
			toaster.error({
				title: "Failed to fetch data",
				duration: 3000,
			});
		} else {
			setSnippet(data);
			setAll(data);
			setTimeout(async () => {
				console.log("update view");

				await updateSnippetView(id, (data?.views || 0) + 1);
			}, 1000);
		}
		dispatch(hideLoading());
	};

	useEffect(() => {
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

	// Fucntion Redirect Join Now
	const joinNow = function () {
		if (isLogin) {
			navigate("/storing");
		} else {
			navigate("/auth/login");
		}
	};

	const handleLike = async () => {
		if (!isLogin) {
			toaster.error({
				title: "Please login to like this function",
				duration: 2500,
			});
			return;
		}

		try {
			dispatch(showLoading());
			const newLikeCount = isLiked ? likeCount - 1 : likeCount + 1;
			await updateSnippetLikes(id, newLikeCount);
			setLikeCount(newLikeCount);
			setIsLiked(!isLiked);

			toaster.success({
				title: isLiked ? "Removed like" : "Added like",
				duration: 2000,
			});
		} catch (error) {
			console.log(error);
			toaster.error({
				title: "Failed to update like",
				duration: 2500,
			});
		} finally {
			dispatch(hideLoading());
		}
	};

	return (
		<>
			<div className="hidden md:flex w-screen min-h-screen bg-white justify-center p-6">
				<div className="container max-w-[1400px] flex flex-col items-center gap-6">
					{/* Header Card */}
					<div className="w-full bg-white  backdrop-blur-sm bg-opacity-90 rounded-xl shadow-lg lg:p-6 p-4">
						<h1 className="lg:text-3xl md:text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-gray-800 ">
							{snippet?.name ?? "Function Name"}
						</h1>
						<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
							<div className="mt-2">
								<div className="flex flex-wrap gap-2 lg:gap-4 items-center text-sm">
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
									<div className="flex items-center gap-2">
										<Button
											onClick={handleLike}
											className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
												isLiked
													? "bg-red-500 text-white hover:bg-red-600"
													: "bg-gray-100 text-gray-600 hover:bg-gray-200"
											}`}>
											<i
												className={`fas fa-heart ${
													isLiked
														? "text-white"
														: "text-red-500"
												}`}></i>
											<span>{likeCount}</span>
										</Button>
									</div>
								</div>
							</div>
							<div className="flex lg:flex-row-reverse items-end gap-4">
								<Button
									onClick={joinNow}
									className="  text-white  lg:px-6 lg:py-3 px-3 py-1 rounded-lg  font-medium transition-all duration-300 transform hover:scale-105">
									{isLogin ? "Create Function" : "Join now !"}
								</Button>
								{isLogin && (
									<Button
										onClick={() => navigate("/sharing")}
										className="  text-white lg:px-6 lg:py-3 px-3 py-1 rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
										Back to dashboard
									</Button>
								)}
							</div>
						</div>
					</div>

					<div className="flex flex-col lg:flex-row w-full gap-6">
						{/* Description Card */}
						<div className="lg:flex-[40%] bg-white rounded-xl shadow-lg overflow-hidden">
							<div className="border-b bg-gradient-to-r from-gray-50 to-white p-2">
								<h2 className="lg:text-xl md:text-sm  font-semibold flex items-center gap-2 ">
									<span className="text-2xl">📜</span>
									Description
								</h2>
							</div>
							<div className="lg:p-6 p-3">
								<div className="prose prose-sm md:prose-base max-w-none max-h-full rounded-lg bg-gray-50 p-3">
									<ReactMarkdown>{description}</ReactMarkdown>
								</div>
							</div>
						</div>

						{/* Code Card */}
						<div className="lg:flex-[60%] bg-white rounded-xl shadow-lg overflow-hidden">
							<div className="shadow-lg from-gray-50 to-white md:p-4">
								<div
									style={style}
									className="flex justify-between items-center">
									{/* Header */}
									<div className="flex pl-3.5 items-center">
										<svg
											viewBox="0 0 24 24"
											fill="currentColor"
											className="-ml-0.5 mr-1.5 h-3 w-3 text-red-500">
											<circle r={12} cy={12} cx={12} />
										</svg>
										<svg
											viewBox="0 0 24 24"
											fill="currentColor"
											className="-ml-0.75 mr-1.5 h-3 w-3 text-yellow-500">
											<circle r={12} cy={12} cx={12} />
										</svg>
										<svg
											viewBox="0 0 24 24"
											fill="currentColor"
											className="-ml-0.75 mr-1.5 h-3 w-3 text-green-500">
											<circle r={12} cy={12} cx={12} />
										</svg>
									</div>
									<span className="text-md text-gray-400 font-medium hidden lg:inline">
										Code
									</span>
									<div className="flex items-center gap-3 px-2">
										<span className="text-gray-400 font-medium text-xs lg:text-base">
											{code.split("\n").length ?? 0} lines
										</span>
										<span className="text-gray-400 font-medium text-xs lg:text-base">
											{snippet?.language.toLowerCase() ??
												"none"}
										</span>
										<Button
											onClick={copyCode}
											variant="subtle"
											color="gray"
											className=" hover:opacity-85 px-2 py-1 lg:px-4 lg:py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
											<i className="fas fa-copy"></i>
											Copy
										</Button>
									</div>
								</div>
								<CodeEditor
									code={code}
									language={
										snippet?.language.toLowerCase() ??
										"javascript"
									}></CodeEditor>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="flex md:hidden max-w-screen-sm w-full items-center justify-center">
				<div className="w-full ">
					<Tabs.Root defaultValue="overview" variant={"enclosed"}>
						<Tabs.List>
							<Tabs.Trigger value="overview">
								<FaHashtag></FaHashtag>
								Overview
							</Tabs.Trigger>
							<Tabs.Trigger value="description">
								<FaFile></FaFile> Description
							</Tabs.Trigger>
							<Tabs.Trigger value="code">
								<FaCode />
								Code
							</Tabs.Trigger>
							<Tabs.Trigger value="back">
								<Button
									size={"sm"}
									variant={"solid"}
									onClick={() => navigate("/sharing")}>
									Back
								</Button>
							</Tabs.Trigger>
						</Tabs.List>
						<Tabs.Content value="overview">
							<div className="flex items-center justify-center flex-col fade-in p-2">
								<div className=" bg-slate-300 p-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 mt-20">
									<h1 className="lg:text-3xl md:text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-gray-800 ">
										{snippet?.name ?? "Function Name"}
									</h1>
									<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
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
										<Button
											onClick={handleLike}
											className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
												isLiked
													? "bg-red-500 text-white hover:bg-red-600"
													: "bg-gray-100 text-gray-600 hover:bg-gray-200"
											}`}>
											<i
												className={`fas fa-heart ${
													isLiked
														? "text-white"
														: "text-red-500"
												}`}></i>
											<span>{likeCount}</span>
										</Button>
									</div>
								</div>
							</div>
						</Tabs.Content>
						<Tabs.Content value="description" className="pt-0">
							<div className="flex items-center justify-center flex-col fade-in p-2">
								<div className="prose prose-sm md:prose-base max-w-none max-h-full rounded-lg bg-gray-100 p-3">
									<ReactMarkdown>{description}</ReactMarkdown>
								</div>
							</div>
						</Tabs.Content>
						<Tabs.Content value="code">
							<div className="flex items-center justify-center flex-col slide-in-left p-2">
								<div
									style={style}
									className="flex justify-between items-center w-full">
									{/* Header */}
									<div className="flex pl-3.5 items-center">
										<svg
											viewBox="0 0 24 24"
											fill="currentColor"
											className="-ml-0.5 mr-1.5 h-3 w-3 text-red-500">
											<circle r={12} cy={12} cx={12} />
										</svg>
										<svg
											viewBox="0 0 24 24"
											fill="currentColor"
											className="-ml-0.75 mr-1.5 h-3 w-3 text-yellow-500">
											<circle r={12} cy={12} cx={12} />
										</svg>
										<svg
											viewBox="0 0 24 24"
											fill="currentColor"
											className="-ml-0.75 mr-1.5 h-3 w-3 text-green-500">
											<circle r={12} cy={12} cx={12} />
										</svg>
									</div>
									<span className="text-md text-gray-400 font-medium hidden lg:inline">
										Code
									</span>
									<div className="flex items-center gap-3 px-2">
										<span className="text-gray-400 font-medium text-xs lg:text-base">
											{code.split("\n").length ?? 0} lines
										</span>
										<span className="text-gray-400 font-medium text-xs lg:text-base">
											{snippet?.language.toLowerCase() ??
												"none"}
										</span>
										<Button
											onClick={copyCode}
											variant="subtle"
											color="gray"
											className=" hover:opacity-85 px-2 py-1 lg:px-4 lg:py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
											<i className="fas fa-copy"></i>
											Copy
										</Button>
									</div>
								</div>
								<div className="w-full">
									<CodeEditor
										code={code}
										language={
											snippet?.language.toLowerCase() ??
											"javascript"
										}></CodeEditor>
								</div>
							</div>
						</Tabs.Content>
					</Tabs.Root>
				</div>
			</div>
		</>
	);
};

export default ViewPage;
