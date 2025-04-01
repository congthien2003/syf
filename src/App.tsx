import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import StorePage from "./pages/function/storing/store";
import Dashboard from "./pages/function/dashboard/dashboard";
import MainLayout from "./components/layout/main_layout";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import ViewPage from "./pages/function/detail/viewDetail";
import Loading from "./components/ui/loading/loading";
import { Toaster } from "./components/ui/toaster";
import YourFunctions from "./pages/function/yourfunction/yourFunction";
import EditPage from "./pages/function/detail/edit";
import { Analytics } from "@vercel/analytics/react";
import ForgotPassword from "./pages/forgot-password";
function App() {
	return (
		<>
			<Analytics />
			<Loading />
			<Toaster />
			<BrowserRouter>
				<Routes>
					<Route index element={<Home />} />
					<Route path="/" element={<MainLayout />}>
						{/* Trang Home */}
						<Route path="storing" element={<StorePage />} />{" "}
						<Route path="edit/:id" element={<EditPage />} />{" "}
						<Route path="sharing" element={<Dashboard />} />{" "}
						<Route
							path="yourfunctions"
							element={<YourFunctions />}
						/>{" "}
					</Route>
					<Route path="view/:id" element={<ViewPage />} />{" "}
					<Route path="auth/login" element={<LoginPage />} />{" "}
					<Route path="auth/register" element={<RegisterPage />} />{" "}
					<Route
						path="auth/forgot-password"
						element={<ForgotPassword />}
					/>{" "}
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
