import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
	FaHome,
	FaDatabase,
	FaShareAlt,
	FaSignInAlt,
	FaUserPlus,
	FaCode,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../core/store/authSlice";
import { AppDispatch } from "../../core/store/store";
import { Avatar } from "../ui/avatar";
import { Button } from "../ui/button";
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

	return (
		<div className="flex h-screen w-screen bg-gray-100">
			{/* Sidebar */}
			<div className="w-64 bg-white border-r border-gray-200 shadow-lg flex flex-col">
				{/* Logo */}
				<div className="h-16 flex items-center px-6 border-b border-gray-200">
					<span className="text-xl font-semibold text-gray-900">
						SYC
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
				<div className="border-t border-gray-200 p-4">
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
							<div className="flex align-center items-center gap-2 text-sm text-gray-600">
								<Avatar name={user.email} size="xs" />
								{user.email}
							</div>
							<Button
								onClick={logOut}
								className="w-full rounded-lg transition-colors duration-200">
								Logout
							</Button>
						</div>
					)}
				</div>
			</div>

			{/* Main Content */}
			<div className="flex-1 overflow-auto">
				<main className="max-w-7xl mx-auto px-6 py-8">
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
        flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200
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
			<span className="font-medium">{label}</span>
		</Link>
	);
};

export default MainLayout;
