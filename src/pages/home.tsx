import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ButtonIlkh from "../components/ui/button-ani/button-ani";
export default function Home() {
	const navigate = useNavigate();

	return (
		<div className="min-h-screen w-full bg-gradient-to-b from-white to-gray-200">
			{/* Header */}
			<header className="w-full py-4 shadow-md">
				<div className="container mx-auto flex justify-between items-center px-6">
					<h1 className="text-2xl font-bold">Code Sharing</h1>
					<nav>
						<a
							href="/"
							className="text-gray-600 hover:text-black mx-4">
							Home
						</a>
						<a
							href="/storing"
							className="text-gray-600 hover:text-black mx-4">
							Storing
						</a>
						<a
							href="/sharing"
							className="text-gray-600 hover:text-black mx-4">
							Sharing
						</a>
					</nav>
				</div>
			</header>

			{/* Slider Section */}
			<section className="w-full h-60 bg-gray-200 flex items-center justify-center text-2xl font-semibold text-gray-600">
				<p>🚀 Share & Discover Useful Code Snippets</p>
			</section>

			{/* Join Section */}
			<section className="flex flex-col items-center justify-center mt-10">
				<h2 className="text-3xl font-bold text-gray-800">
					Join Now & Start Sharing
				</h2>
				{/* <Button
					colorScheme="blackAlpha"
					size="lg"
					className="mt-6 bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800"
					onClick={() => navigate("/auth/login")}>
					Join
				</Button> */}

				<div className="my-2">
					<ButtonIlkh
						label="Join now..."
						onClick={() => navigate("/auth/login")}></ButtonIlkh>
				</div>
			</section>
		</div>
	);
}
