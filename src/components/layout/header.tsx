import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../core/store/store";
import { signOut } from "../../core/store/authSlice";
export default function Header() {
	const dispath = useDispatch();
	const navigate = useNavigate();

	const { user } = useSelector((state: RootState) => state.auth);
	console.log(user);
	const [selectedNav, setSelectedNav] = useState(1);

	function handleSelectedNav(selectedNav: number): void {
		setSelectedNav(selectedNav);
	}

	const logOut = function () {
		dispath(signOut());
		navigate("/auth/login");
	};
	return (
		<>
			<div className="header">
				<div className="container mx-auto flex algin-middle justify-between px-4 py-2">
					<div className="logo">My Logo</div>
					<nav className="nav flex gap-4 ">
						<Link
							to="/"
							className={`${
								selectedNav === 1
									? "header__navbar-item navbar-item-active"
									: "header__navbar-item"
							}`}
							onClick={() => handleSelectedNav(1)}>
							Home
						</Link>
						<Link
							to="/storing"
							className={`${
								selectedNav === 2
									? "header__navbar-item navbar-item-active"
									: "header__navbar-item"
							}`}
							onClick={() => handleSelectedNav(2)}>
							Storing
						</Link>
						<Link
							to="/dashboard"
							className={`${
								selectedNav === 3
									? "header__navbar-item navbar-item-active"
									: "header__navbar-item"
							}`}
							onClick={() => handleSelectedNav(3)}>
							Sharing
						</Link>
					</nav>

					<div className="auth">
						{!user ? (
							<>
								<Link
									to="/auth/login"
									className={`${
										selectedNav === 4
											? "header__navbar-item navbar-item-active"
											: "header__navbar-item"
									}`}>
									Login
								</Link>
								<Link
									to="/auth/register"
									className={`${
										selectedNav === 5
											? "header__navbar-item navbar-item-active"
											: "header__navbar-item"
									}`}>
									Register
								</Link>
							</>
						) : (
							<div className="user-info">
								<span className="mr-4">{user.email}</span>
								<button onClick={logOut}>Logout</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
