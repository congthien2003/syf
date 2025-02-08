import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import StorePage from "./pages/function/storing/store";
import Dashboard from "./pages/function/dashboard/dashboard";
import MainLayout from "./components/layout/main_layout";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import { useSelector } from "react-redux";
import { RootState } from "./core/store/store";
import ViewPage from "./pages/function/detail/viewDetail";
import Loading from "./components/ui/loading/loading";
import { Toaster } from "./components/ui/toaster";
function App() {
	const user = useSelector((state: RootState) => state.auth.user);
	console.log(user);
	return (
		<>
			<Loading />
			<Toaster />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<MainLayout />}>
						<Route index element={<Home />} /> {/* Trang Home */}
						<Route path="storing" element={<StorePage />} />{" "}
						<Route path="dashboard" element={<Dashboard />} />{" "}
					</Route>
					<Route path="view/:id" element={<ViewPage />} />{" "}
					<Route path="auth/login" element={<LoginPage />} />{" "}
					<Route path="auth/register" element={<RegisterPage />} />{" "}
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
