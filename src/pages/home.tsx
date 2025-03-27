import { Button } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import "../utils/shared.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../core/store/store";
import { logoutUser } from "../core/store/authSlice";
import { useAuth } from "../hooks/useAuth";
import Footer from "../components/layout/footer";
export default function Home() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const dispatch = useDispatch<AppDispatch>();

	const navigate = useNavigate();
	const user = useAuth();
	const [isLogin, setIsLogin] = useState(false);

	useEffect(() => {
		if (user) {
			setIsLogin(true);
		}
	}, [user, navigate]);

	const logOut = () => {
		dispatch(logoutUser());
		navigate("/auth/login");
	};

	const handleGetStarted = () => {
		if (user) {
			navigate("/storing");
		} else {
			navigate("/auth/login");
		}
	};

	return (
		<div className="min-h-screen w-full bg-white">
			<header className="w-full py-3 md:py-4 bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
				<div className="container mx-auto flex justify-between items-center px-4">
					{/* Logo */}
					<div className="flex items-center gap-2">
						<h1 className="text-sm md:text-base text-black font-bold px-2 py-2 rounded-lg transition-all duration-300">
							<i
								className="fa fa-code mr-1 "
								aria-hidden="true"></i>
							<span className="hidden lg:inline bg-clip-text text-gray-800">
								Sharing Your Function
							</span>
							<span className="inline sm:hidden">SYF</span>
						</h1>
					</div>

					{/* Mobile Menu Button */}
					<button
						className="lg:hidden text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition-colors"
						onClick={() => setIsMenuOpen(!isMenuOpen)}>
						{!isMenuOpen && (
							<i className="fa fa-bars" aria-hidden="true"></i>
						)}
					</button>

					{/* Desktop Navigation */}
					<nav className="hidden lg:flex items-center">
						<div className="flex space-x-4">
							<Link
								to="/"
								className="px-4 py-2 text-gray-700  hover:text-gray-600 rounded-lg transition-all duration-200 font-medium relative group">
								Home
								<span className="absolute inset-x-0 bottom-0 h-0.5 bg-gray-600 transform w-full transition-transform duration-200"></span>
							</Link>
							<Link
								to="/storing"
								className="px-4 py-2 text-gray-700 hover:text-gray-600  rounded-lg transition-all duration-200 font-medium relative group">
								Storing
								<span className="absolute inset-x-0 bottom-0 h-0.5 bg-gray-600 transform w-0 group-hover:w-full transition-transform duration-200"></span>
							</Link>
							<Link
								to="/sharing"
								className="px-4 py-2 text-gray-700 hover:text-gray-600 rounded-lg transition-all duration-200 font-medium relative group">
								Sharing
								<span className="absolute inset-x-0 bottom-0 h-0.5 bg-gray-600 transform w-0 group-hover:w-full transition-transform duration-200"></span>
							</Link>
						</div>
					</nav>

					{/* Desktop Auth Buttons */}
					{isLogin ? (
						<div className="hidden lg:flex items-center gap-3">
							<Button className="px-6 py-2 text-gray-700 bg-white rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium">
								{user.email}
							</Button>
							<Button
								onClick={logOut}
								className="transition-all duration-200 shadow-lg shadow-gray-500/30 hover:shadow-gray-500/50  hover:text-white">
								Log Out{" "}
							</Button>
						</div>
					) : (
						<div className="hidden lg:flex items-center gap-3">
							<Button
								variant={"ghost"}
								onClick={() => {
									navigate("/auth/login");
								}}
								className="px-6 py-2 rounded-lg transition-all duration-200 font-medium">
								Login
							</Button>
							<Button
								variant={"solid"}
								onClick={() => {
									navigate("/auth/register");
								}}
								className="px-6 py-2 text-white  font-medium rounded-lg transition-all duration-200 shadow-lg shadow-gray-500/30 hover:shadow-gray-500/50">
								Register
							</Button>
						</div>
					)}

					{/* Mobile Menu */}
					{isMenuOpen && (
						<div
							className={`
          fixed inset-0 bg-white lg:hidden transition-transform duration-300 ease-in-out
           "translate-x-full"
        `}>
							<div className="flex flex-col h-full">
								<div className="flex justify-end p-4">
									<button
										className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
										onClick={() => setIsMenuOpen(false)}>
										<i
											className="fa fa-close"
											aria-hidden="true"></i>
									</button>
								</div>
								<nav className="flex flex-col p-4 space-y-4">
									<Link
										to="/"
										className="px-4 py-3 text-gray-700 hover:text-gray-600 rounded-lg hover:bg-gray-400 transition-all duration-200 font-medium text-lg">
										Home
									</Link>
									<Link
										to="/storing"
										className="px-4 py-3 text-gray-700 hover:text-gray-600 rounded-lg hover:bg-gray-400 transition-all duration-200 font-medium text-lg">
										Storing
									</Link>
									<Link
										to="/sharing"
										className="px-4 py-3 text-gray-700 hover:text-gray-600 rounded-lg hover:bg-gray-400 transition-all duration-200 font-medium text-lg">
										Sharing
									</Link>
									<div className="flex flex-col gap-3 mt-4">
										<button
											className="px-6 py-3 text-gray-700 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium"
											onClick={() =>
												navigate("/auth/login")
											}>
											Login
										</button>
										<button
											className="px-6 py-3 text-black bg-gray-400 font-medium rounded-lg transition-all duration-200 shadow-lg shadow-gray-500/30"
											onClick={() =>
												navigate("/auth/register")
											}>
											Register
										</button>
									</div>
								</nav>
							</div>
						</div>
					)}
				</div>
			</header>

			{/* Hero Section */}
			<section className="w-full min-h-[60vh] md:min-h-[80vh] flex flex-col items-center justify-center text-center relative overflow-hidden px-4 py-8 md:py-20 background-white ">
				<div className="absolute inset-0 background-gradient-blue opacity-10 " />
				<div className="z-10 max-w-4xl mx-auto">
					<h1 className="text-2xl md:text-3xl lg:text-5xl text-gray-700  font-bold mb-4 leading-tight  text-center transition-all duration-300">
						Share & Discover
						<div className="text-blue-500 text-center mt-1">
							Useful Code Snippets
						</div>
					</h1>
					<p className="text-lg md:text-xl text-gray-500  mb-8 max-w-2xl mx-auto leading-relaxed">
						Collaborate with developers worldwide and find the code
						you need
					</p>
					<Button
						onClick={() => {
							handleGetStarted();
						}}
						className="transform hover:scale-105 text-white bg-gray-900 hover:bg-gray-800 px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
						<i
							className="fa fa-archive mr-2"
							aria-hidden="true"></i>
						Get Started
					</Button>
				</div>
			</section>

			{/* Services Section */}
			<section className="max-w-6xl mx-auto py-12 md:py-20 px-4 bg-white">
				<h2 className="text-2xl md:text-3xl md:mb-12 text-gray-500 font-bold text-center mb-12">
					Our Services
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					<div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
						<i
							className="fa fa-share text-4xl w-12 h-12 text-gray-600 mb-4"
							aria-hidden="true"></i>
						<h3 className="text-xl text-black font-semibold mb-2">
							Share Your Functions
						</h3>
						<p className="text-gray-600">
							Upload and share your code snippets with proper
							documentation and examples
						</p>
					</div>

					<div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
						<i
							className="fa fa-code text-4xl w-12 h-12 text-gray-600 mb-4"
							aria-hidden="true"></i>
						<h3 className="text-xl text-black font-semibold mb-2">
							Discover Code
						</h3>
						<p className="text-gray-600">
							Find high-quality code snippets from our curated
							collection
						</p>
					</div>

					<div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
						<i
							className="fa fa-user text-4xl w-12 h-12 text-gray-600 mb-4"
							aria-hidden="true"></i>
						<h3 className="text-xl text-black font-semibold mb-2">
							Community
						</h3>
						<p className="text-gray-600">
							Connect with developers and get help with your
							coding challenges
						</p>
					</div>
				</div>
			</section>
			<section className="bg-gray-50 py-20">
				<div className="max-w-4xl mx-auto px-4">
					<h2 className=" text-xl md:text-3xl font-bold text-center mb-12 text-gray-800">
						How to Share Your Function
					</h2>
					<div className="space-y-8">
						{[
							{
								title: "Create Your Snippet",
								description:
									"Write your code and add comprehensive documentation explaining its usage",
							},
							{
								title: "Add Examples",
								description:
									"Include practical examples showing how to use your code in real scenarios",
							},
							{
								title: "Share & Collaborate",
								description:
									"Publish your snippet and engage with the community feedback",
							},
						].map((step, index) => (
							<div key={index} className="flex items-start gap-4">
								<div className="bg-gray-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
									{index + 1}
								</div>
								<div>
									<h3 className="text-md md:text-xl text-gray-700 font-semibold mb-2">
										{step.title}
									</h3>
									<p className="text-gray-600">
										{step.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
			<Footer></Footer>
			{/* Join Section */}
			{/* <section className="flex flex-col items-center justify-center mt-10">
				<h2 className="text-3xl font-bold text-gray-800">
					Join Now & Start Sharing
				</h2>
				<Button
					colorScheme="blackAlpha"
					size="lg"
					className="mt-6 bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 bounce"
					onClick={() => navigate("/auth/login")}>
					<svg
						className="icon "
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2.5">
						<polyline points="13.18 1.37 13.18 9.64 21.45 9.64 10.82 22.63 10.82 14.36 2.55 14.36 13.18 1.37"></polyline>
					</svg>
					Join
				</Button>

				<div className="my-2">
					<ButtonIlkh
						label="Join now"
						onClick={() => navigate("/auth/login")}></ButtonIlkh>
				</div>
			</section> */}
		</div>
	);
}
