import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../core/store/store";
import { logoutUser } from "../../core/store/authSlice";

export default function Header() {
	const dispath = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const { user } = useSelector((state: RootState) => state.auth);
	console.log(user);
	const [selectedNav, setSelectedNav] = useState(1);

	function handleSelectedNav(selectedNav: number): void {
		setSelectedNav(selectedNav);
	}

	const logOut = function () {
		dispath(logoutUser());
		navigate("/auth/login");
	};
	return (
		<div className="flex items-center justify-center w-full bg-green-500 text-gray-50">
			<div className="container mx-auto flex items-center justify-between px-4 py-2">
				<div className="logo">My Logo</div>
				<nav className="flex gap-4">
					<Link
						to="/"
						className={`text-lg px-2 h-[30px] transition-all duration-100 ease-in hover:border-b hover:border-white
							${selectedNav === 1 ? "border-b border-white" : ""}`}
						onClick={() => handleSelectedNav(1)}>
						Home
					</Link>
					<Link
						to="/storing"
						className={`text-lg px-2 h-[30px] transition-all duration-100 ease-in hover:border-b hover:border-white
							${selectedNav === 2 ? "border-b border-white" : ""}`}
						onClick={() => handleSelectedNav(2)}>
						Storing
					</Link>
					<Link
						to="/dashboard"
						className={`text-lg px-2 h-[30px] transition-all duration-100 ease-in hover:border-b hover:border-white
							${selectedNav === 3 ? "border-b border-white" : ""}`}
						onClick={() => handleSelectedNav(3)}>
						Sharing
					</Link>
				</nav>

				<div className="flex items-center justify-center gap-4">
					{!user ? (
						<>
							<Link
								to="/auth/login"
								className={`text-lg px-2 h-[30px] transition-all duration-100 ease-in hover:border-b hover:border-white
									${selectedNav === 4 ? "border-b border-white" : ""}`}>
								Login
							</Link>
							<Link
								to="/auth/register"
								className={`text-lg px-2 h-[30px] transition-all duration-100 ease-in hover:border-b hover:border-white
									${selectedNav === 5 ? "border-b border-white" : ""}`}>
								Register
							</Link>
						</>
					) : (
						<div className="user-info flex items-center">
							<span className="mr-4">{user.email}</span>
							<button
								onClick={logOut}
								className="text-lg px-2 h-[30px] transition-all duration-100 ease-in hover:border-b hover:border-white">
								Logout
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
