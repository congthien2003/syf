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
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../core/store/authSlice";
import { AppDispatch } from "../../core/store/store";
import { useAuth } from "../../hooks/useAuth";

const MainLayout = () => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const location = useLocation();
	const user = useAuth();
	const [, setURL] = useState("/");

	useEffect(() => {
		setURL(location.pathname);
	}, [location.pathname]);

	const logOut = () => {
		dispatch(logoutUser());
		navigate("/auth/login");
	};

	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<div className="flex h-screen w-screen bg-gray-100">
			{/* Sidebar (Desktop & Mobile) */}
			<div
				className={`fixed md:flex flex-col inset-y-0 left-0 w-64 bg-white border-r border-gray-200 shadow-lg transform ${
					sidebarOpen ? "flex" : "hidden"
				} transition-transform translate-x-full duration-300 ease-in-out md:relative md:translate-x-0 z-50 relative`}>
				{/* Logo */}
				<div className="h-16 flex items-center px-6 border-b border-gray-200">
					<span className="text-sm font-bold text-gray-900 flex items-center gap-2">
						<img
							src="src/assets/logo.png"
							alt="logo"
							className="w-[50px]"
						/>
						Sharing Your Function
					</span>
				</div>

				{/* Navigation */}
				<nav className="flex-1 px-3 py-4 space-y-1">
					<NavItem
						to="/"
						icon={<FaHome />}
						label="Home"
						location={location.pathname}
					/>
					<NavItem
						to="/storing"
						icon={<FaDatabase />}
						label="Storing"
						location={location.pathname}
					/>
					<NavItem
						to="/yourfunctions"
						icon={<FaCode />}
						label="Your functions"
						location={location.pathname}
					/>
					<NavItem
						to="/sharing"
						icon={<FaShareAlt />}
						label="Sharing"
						location={location.pathname}
					/>
				</nav>

				{/* Auth Section */}
				<div className="mt-auto border-t border-gray-200 p-4">
					{!user ? (
						<div className="space-y-1">
							<NavItem
								to="/auth/login"
								icon={<FaSignInAlt />}
								label="Login"
								location={location.pathname}
							/>
							<NavItem
								to="/auth/register"
								icon={<FaUserPlus />}
								label="Register"
								location={location.pathname}
							/>
						</div>
					) : (
						<div className="space-y-3">
							<div className="text-sm text-gray-600 text-wrap">
								{/* <Avatar name={user.email} size="xs" /> */}
								<span className="text-wrap">{user.email}</span>
							</div>
							<button
								onClick={logOut}
								className="w-full bg-blue-500 text-white px-1 py-1 lg:px-2 lg:py-1 rounded-lg transition-colors duration-200 hover:bg-blue-600">
								Logout
							</button>
						</div>
					)}
				</div>
			</div>

			{/* Main Content */}
			<div className="flex-1 flex flex-col">
				{/* Mobile Navbar */}
				<div className="md:hidden p-2 opacity-80 bg-white border-b border-gray-200 shadow-md flex items-center justify-between">
					<button
						onClick={() => setSidebarOpen(!sidebarOpen)}
						className="text-gray-600">
						<FaBars size={24} />
					</button>
					<span className="text-lg font-semibold text-gray-900">
						<img
							src="src/assets/logo.png"
							alt="logo"
							className="w-[35px]"
						/>
					</span>
				</div>

				<main className="lg:flex-1 overflow-auto md:p-8">
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
        flex items-center lg:gap-3 lg:px-3 lg:py-2 gap-2 px-2 py-2 rounded-lg transition-colors duration-200
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
