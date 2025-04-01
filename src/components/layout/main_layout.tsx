import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
	FaHome,
	FaDatabase,
	FaShareAlt,
	FaSignInAlt,
	FaUserPlus,
	FaCode,
	FaBars,
	FaArrowAltCircleRight,
	FaUser,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../core/store/authSlice";
import { AppDispatch } from "../../core/store/store";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "@chakra-ui/react/button";

// Define navigation items interface
interface NavItemProps {
	to: string;
	icon: React.ReactNode;
	label: string;
	requireAuth?: boolean;
}

// Define navigation items
const navigationItems: NavItemProps[] = [
	{
		to: "/",
		icon: <FaHome />,
		label: "Home",
		requireAuth: false,
	},
	{
		to: "/storing",
		icon: <FaDatabase />,
		label: "Storing",
		requireAuth: true,
	},
	{
		to: "/yourfunctions",
		icon: <FaCode />,
		label: "Your functions",
		requireAuth: true,
	},
	{
		to: "/sharing",
		icon: <FaShareAlt />,
		label: "Sharing",
		requireAuth: true,
	},
];

const authItems: NavItemProps[] = [
	{
		to: "/auth/login",
		icon: <FaSignInAlt />,
		label: "Login",
	},
	{
		to: "/auth/register",
		icon: <FaUserPlus />,
		label: "Register",
	},
];

const MainLayout = () => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const location = useLocation();
	const user = useAuth();
	const [, setURL] = useState("/");
	const [sidebarOpen, setSidebarOpen] = useState(false);

	useEffect(() => {
		setURL(location.pathname);
	}, [location.pathname]);

	const logOut = () => {
		dispatch(logoutUser());
		navigate("/auth/login");
	};

	return (
		<div className="flex h-screen w-screen bg-gray-100">
			{/* Sidebar (Desktop & Mobile) */}
			<div
				className={`fixed md:flex flex-col inset-y-0 left-0 w-64 bg-white border-r border-gray-200 shadow-lg transform ${
					sidebarOpen ? "flex" : "hidden"
				} transition-transform translate-x-full duration-300 ease-in-out md:relative md:translate-x-0 z-50 relative`}>
				{/* Logo */}
				<div className="h-16 flex items-center px-6 border-b border-gray-200">
					<span className="text-sm font-bold flex items-center gap-2">
						<img src="./logo.png" alt="logo" className="w-[50px]" />
						Sharing Your Function
					</span>
				</div>

				{/* Navigation */}
				<nav className="flex-1 px-3 py-4">
					{navigationItems.map(
						(item) =>
							// Only show items that don't require auth, or if user is authenticated
							(!item.requireAuth || user) && (
								<NavItem
									key={item.to}
									to={item.to}
									icon={item.icon}
									label={item.label}
									location={location.pathname}
								/>
							)
					)}
				</nav>

				{/* Auth Section */}
				<div className="mt-auto border-t border-gray-200 p-4">
					{!user ? (
						<div className="space-y-1">
							{authItems.map((item) => (
								<NavItem
									key={item.to}
									to={item.to}
									icon={item.icon}
									label={item.label}
									location={location.pathname}
								/>
							))}
						</div>
					) : (
						<div className="space-y-3">
							<Button
								onClick={() => navigate("/profile")}
								variant={"outline"}
								className="w-full text-wrap">
								<FaUser className="text-sm" />{" "}
								{user.user_metadata.full_name ?? user.email}
							</Button>
							<Button
								onClick={logOut}
								className="w-full transition-all duration-200 shadow-lg shadow-gray-500/30 hover:shadow-gray-500/50">
								<FaArrowAltCircleRight /> Log Out
							</Button>
						</div>
					)}
				</div>
			</div>

			{/* Main Content */}
			<div className="flex-1 flex flex-col bg-white">
				{/* Mobile Navbar */}
				<div className="md:hidden p-2 opacity-80 bg-white border-b border-gray-200 shadow-md flex items-center justify-between">
					<button
						onClick={() => setSidebarOpen(!sidebarOpen)}
						className="text-gray-600">
						<FaBars size={24} />
					</button>
					<span className="text-lg font-semibold text-gray-900">
						<img src="/logo.png" alt="logo" className="w-[35px]" />
					</span>
				</div>

				<main className="lg:flex-1 overflow-auto md:p-4 md:py-8 bg-white">
					<Outlet />
				</main>
			</div>
		</div>
	);
};

const NavItem = ({
	to,
	icon,
	label,
	location,
}: {
	to: string;
	icon: React.ReactNode;
	label: string;
	location?: string;
}) => {
	const isActive = to === location;

	return (
		<Link
			to={to}
			className={`
        flex items-center lg:gap-3 lg:px-3 lg:py-2 gap-2 px-2 py-2 rounded-lg transition-colors duration-200 mb-2 min-w-[200px]
        ${
			isActive
				? "bg-gray-300 text-gray-900"
				: "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
		}
      `}>
			<span
				className={`w-5 h-5 ${
					isActive ? "text-gray-900" : "text-gray-500"
				}`}>
				{icon}
			</span>
			<span className="font-medium lg:text-base text-sm">{label}</span>
		</Link>
	);
};

export default MainLayout;
