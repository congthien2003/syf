import { useState, useEffect } from "react";
import { Button, Input } from "@chakra-ui/react";
import supabase from "../../../utils/supabase";
import { Snippet } from "../../../core/interface/Snippets";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../../core/store/loadingSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../core/store/store";

const YourFunctions = () => {
	const [functions, setFunctions] = useState<Snippet[]>([]);
	const [search, setSearch] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user } = useSelector((state: RootState) => state.auth);
	// Fetch user's shared functions
	const fetchFunctions = async () => {
		dispatch(showLoading());
		const { data, error } = await supabase
			.from("snippets")
			.select("*")
			.order("created_at", { ascending: false });

		if (error) {
			console.error("Error fetching functions:", error);
		} else {
			setFunctions(data || []);
			dispatch(hideLoading());
		}
	};

	useEffect(() => {
		if (!user) {
			navigate("/auth/login");
		}
		fetchFunctions();
	}, []);

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
				{functions.length === 0 ? (
					<p className="text-gray-400">No functions found.</p>
				) : (
					<ul className="space-y-4">
						{functions
							.filter((fn) =>
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
										<p className="text-gray-400 text-sm">
											{fn.language.toUpperCase()}
										</p>
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
									</div>
								</li>
							))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default YourFunctions;
