import { Link, Outlet, useNavigate } from "react-router-dom";
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

export default function MainLayout() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user } = useSelector((state: RootState) => state.auth);

	const logOut = () => {
		dispatch(signOut());
		navigate("/auth/login");
	};

	return (
		<div className="flex h-screen w-screen">
			{/* Sidebar */}
			<div className="w-64 bg-gray-900 text-white flex flex-col p-4">
				{/* Logo */}
				<div className="text-xl font-bold text-center mb-6">🚀 SYC</div>

				{/* Navigation */}
				<nav className="flex-1">
					<NavItem to="/" icon={<FaHome />} label="Home" />
					<NavItem
						to="/storing"
						icon={<FaDatabase />}
						label="Storing"
					/>
					<NavItem
						to="/sharing"
						icon={<FaShareAlt />}
						label="Sharing"
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
const NavItem = ({ to, icon, label }) => {
	return (
		<Link
			to={to}
			className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition duration-200">
			{icon}
			<span className="text-white text-lg">{label}</span>
		</Link>
	);
};
