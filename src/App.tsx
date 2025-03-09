import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
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
import AuthProvider from "./hooks/authProvider";
function App() {
	return (
		<>
			<AuthProvider />
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
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
