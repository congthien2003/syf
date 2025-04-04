import { useState, useEffect } from "react";
import { Button, Input, Portal } from "@chakra-ui/react";
import { Snippet } from "../../../core/interface/Snippets";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../core/store/loadingSlice";
import { useNavigate } from "react-router-dom";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
	getListByIdUser,
	updateSnippetStatus,
} from "../../../core/services/SnippetsService";
import Pagination from "../../../components/ui/pagination/Pagination";
import { toaster } from "../../../components/ui/toaster";
import { Dialog } from "@chakra-ui/react";
import { CloseButton } from "../../../components/ui/close-button";
import { DialogCloseTrigger } from "../../../components/ui/dialog";
import { useAuth } from "../../../hooks/useAuth";
const YourFunctions = () => {
	const [functions, setFunctions] = useState<Snippet[]>([]);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useAuth();

	useEffect(() => {
		if (!user) {
			navigate("/auth/login");
		}

		// set after fetch
		setFunctions(data?.data ?? []);
	}, [user, navigate]);

	const [page, setPage] = useState(1);
	const [pageSize] = useState(5);
	const [search, setSearch] = useState("");
	const [filter] = useState([]);

	const { data } = useQuery({
		queryKey: ["snippets", page, pageSize, search, filter],
		queryFn: () =>
			getListByIdUser({
				userId: user?.id ?? "",
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

	const [isOpenModal, setIsOpenModal] = useState(false);

	const [selectedSnippet, setSelectedSnippet] = useState<Snippet | null>(
		null
	);
	const handleStatusUpdate = async () => {
		if (!selectedSnippet) return;

		try {
			dispatch(showLoading());
			const newStatus = !selectedSnippet.public;
			await updateSnippetStatus(selectedSnippet.id, newStatus);
			// Update local state
			setFunctions(
				data?.data?.map((fn) =>
					fn.id === selectedSnippet.id
						? { ...fn, public: newStatus }
						: fn
				) ?? []
			);

			toaster.success({
				title: `Function is now ${newStatus ? "public" : "private"}`,
				duration: 3000,
			});
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			console.log(error);
			toaster.error({
				title: "Failed to update status",
				duration: 3000,
			});
		} finally {
			dispatch(hideLoading());
			setIsOpenModal(false);
		}
	};

	return (
		<div className="min-h-screen text-black p-6">
			<h1 className="text-3xl font-bold mb-6">Your Functions</h1>

			<div className="mb-4">
				<Input
					placeholder="Search function..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					bg="white"
					color="black"
				/>
			</div>

			<div className="">
				{data?.data.length === 0 ? (
					<p className="text-gray-400">No functions found.</p>
				) : (
					<ul className="space-y-4">
						{functions
							?.filter((fn) =>
								fn.name
									.toLowerCase()
									.includes(search.toLowerCase())
							)
							.map((fn) => (
								<li
									key={fn.id}
									className="flex items-center justify-between p-4 bg-gray-100 rounded-md shadow-lg hover:shadow-xl transition-all">
									<div>
										<p className="font-semibold">
											{fn.name}
										</p>
										<div className="flex gap-2 p-2">
											<div className="metadata-item">
												<i className="fas fa-calendar text-blue-500"></i>
												<span>
													{new Date(
														fn.created_at
													).toLocaleDateString()}
												</span>
											</div>
											<div className="metadata-item">
												<i className="fas fa-code text-green-500"></i>
												<span>{fn.language}</span>
											</div>
											<div className="metadata-item">
												<i className="fas fa-eye text-purple-500"></i>
												<span>{fn.views} views</span>
											</div>
											<div className="metadata-item">
												<i className="fas fa-heart text-red-500"></i>
												<span>{fn.likes} likes</span>
											</div>
										</div>
									</div>
									<div className="flex items-center gap-3">
										<Button
											colorScheme="whiteAlpha"
											variant="outline"
											onClick={() =>
												navigate(`/view/${fn.id}`)
											}>
											View
										</Button>
										<Button
											colorScheme="whiteAlpha"
											variant="solid"
											onClick={() =>
												navigate(`/edit/${fn.id}`)
											}>
											Edit
										</Button>
										<Dialog.Root open={isOpenModal}>
											<Dialog.Trigger asChild>
												<Button
													onClick={() => {
														setSelectedSnippet(fn);
														setIsOpenModal(true);
													}}
													variant={
														fn.public
															? "outline"
															: "subtle"
													}
													size="sm">
													{fn.public ? (
														<i
															className="fa fa-eye"
															aria-hidden="true"></i>
													) : (
														<i
															className="fa fa-eye-slash"
															aria-hidden="true"></i>
													)}
												</Button>
											</Dialog.Trigger>
											<Portal>
												<Dialog.Backdrop />
												<Dialog.Positioner>
													<Dialog.Content>
														<Dialog.Header>
															<Dialog.Title>
																{fn.public ==
																true ? (
																	<span>
																		Change
																		to
																		private
																		?
																	</span>
																) : (
																	<span>
																		{" "}
																		Change
																		to
																		public ?
																	</span>
																)}
															</Dialog.Title>
															<DialogCloseTrigger>
																<CloseButton
																	onClick={() =>
																		setIsOpenModal(
																			false
																		)
																	}
																	size="sm"
																/>
															</DialogCloseTrigger>
														</Dialog.Header>
														<Dialog.Footer>
															<Dialog.ActionTrigger
																asChild>
																<Button
																	variant="outline"
																	onClick={() =>
																		setIsOpenModal(
																			false
																		)
																	}>
																	Cancel
																</Button>
															</Dialog.ActionTrigger>
															<Button
																onClick={
																	handleStatusUpdate
																}>
																Save
															</Button>
														</Dialog.Footer>
													</Dialog.Content>
												</Dialog.Positioner>
											</Portal>
										</Dialog.Root>
									</div>
								</li>
							))}
					</ul>
				)}
			</div>

			{functions.length > 0 && (
				<Pagination
					page={page}
					total={data?.total ?? 0}
					pageSize={pageSize}
					onPageChange={handleChangePage}></Pagination>
			)}
		</div>
	);
};

export default YourFunctions;
