import React from "react";

type Props = {
	children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
	return (
		<div className="flex flex-col h-screen">
			{/* Header */}
			<header className="bg-teal-600 text-white p-4 shadow-md">
				<h1 className="m-0 text-lg">My Website</h1>
			</header>

			{/* Main Content Area */}
			<div className="flex flex-1 overflow-hidden">
				{/* Sidebar Navigation */}
				<nav className="bg-gray-100 w-64 p-6 shadow-md flex flex-col gap-4">
					<a
						href="/"
						className="font-bold text-teal-600 hover:underline">
						Dashboard
					</a>
					<a
						href="/about"
						className="font-bold text-teal-600 hover:underline">
						About
					</a>
					<a
						href="/services"
						className="font-bold text-teal-600 hover:underline">
						Services
					</a>
					<a
						href="/contact"
						className="font-bold text-teal-600 hover:underline">
						Contact
					</a>
				</nav>

				{/* Main Content */}
				<main className="flex-1 p-6 overflow-y-auto bg-gray-50">
					{children}
				</main>
			</div>
		</div>
	);
}
