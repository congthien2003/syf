import { Outlet } from "react-router-dom";
import Header from "./header";

export default function MainLayout() {
	return (
		<div className="flex flex-col h-screen">
			<Header />

			{/* Main Content Area */}
			<div className="flex flex-1 overflow-hidden">
				{/* Main Content */}
				<main className="w-screen flex-1 overflow-y-auto bg-gray-50">
					<Outlet />
				</main>
			</div>
		</div>
	);
}
