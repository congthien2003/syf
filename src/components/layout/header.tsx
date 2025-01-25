import { Button } from "@chakra-ui/react";
import { useColorMode } from "../ui/color-mode";
import "./index.css";
import { BrowserRouter, Link } from "react-router-dom";
export default function Header() {
	const { colorMode, toggleColorMode } = useColorMode();
	return (
		<>
			<div className="header">
				<div className="container mx-auto flex algin-middle justify-between px-4 py-2">
					<div className="logo">My Logo</div>
					<nav className="nav flex gap-4 ">
						<BrowserRouter>
							<Link to="/Home" className="header__navbar-item">
								Home
							</Link>
							<Link to="/about" className="header__navbar-item">
								About
							</Link>
						</BrowserRouter>
					</nav>
					<div className="auth">
						<BrowserRouter>
							<Link
								className="header__navbar-item"
								to="/auth/login">
								Login
							</Link>
							<Link
								to="/auth/register"
								className="header__navbar-item">
								Register
							</Link>
						</BrowserRouter>
						<Button onClick={toggleColorMode} size="sm">
							{colorMode === "light" ? "Dark Mode" : "Light Mode"}
						</Button>
					</div>
				</div>
			</div>
		</>
	);
}
