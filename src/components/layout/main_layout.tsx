import {
	Link,
	Outlet,
	useLocation,
	useNavigate,
	useRoutes,
} from "react-router-dom";
import { Button } from "@chakra-ui/react";
import {
	FaHome,
	FaDatabase,
	FaShareAlt,
	FaSignInAlt,
	FaUserPlus,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../core/store/authSlice";
import { RootState } from "../../core/store/store";
import "../../utils/shared.css";
import { useEffect, useState } from "react";
export default function MainLayout() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const { user } = useSelector((state: RootState) => state.auth);

	const [url, setURL] = useState("/");

	useEffect(() => {
		setURL(location.pathname);
	}, [url]);

	const logOut = () => {
		dispatch(signOut());
		navigate("/auth/login");
	};

	return (
		<div className="flex h-screen w-screen">
			{/* Sidebar */}
			<div className="w-64 bg-gray-800 text-white flex flex-col p-4">
				{/* Logo */}
				<div className="text-xl font-bold text-center mb-6">🚀 SYC</div>

				{/* Navigation */}
				<nav className="flex-1">
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
						to="/dashboard"
						icon={<FaShareAlt />}
						label="Sharing"
						location={location.pathname}
					/>
				</nav>

				{/* Auth Section */}
				<div className="mt-auto">
					{!user ? (
						<>
							<NavItem
								to="/auth/login"
								icon={<FaSignInAlt />}
								label="Login"
							/>
							<NavItem
								to="/auth/register"
								icon={<FaUserPlus />}
								label="Register"
							/>
						</>
					) : (
						<div className="text-center">
							<p className="mb-2">{user.email}</p>
							<Button
								colorScheme="red"
								variant="solid"
								onClick={logOut}
								className="w-full">
								Logout
							</Button>
						</div>
					)}
				</div>
			</div>

			{/* Main Content */}
			<div className="flex-1 bg-gray-100 p-6 overflow-auto">
				<main>
					<Outlet></Outlet>
				</main>
			</div>
		</div>
	);
}
const NavItem = ({
	to,
	icon,
	label,
	location,
}: {
	to: string;
	icon: any;
	label: string;
	location?: string;
}) => {
	console.log(location);

	return (
		<Link
			to={to}
			className={`flex items-center gap-4 px-2 py-2 rounded-lg hover:bg-red-500 ${
				to === location ? "bg-red-500" : "hover:bg-red-500"
			}  transition duration-200 mb-2`}>
			{icon}
			<span className="text-white text-lg">{label}</span>
		</Link>
	);
};
