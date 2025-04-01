import { Link } from "react-router-dom";

export default function NotFoundPage() {
	return (
		<div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-100 text-center">
			<h1 className="text-6xl font-bold text-gradient-red-orange">404</h1>
			<p className="text-xl text-gray-600 mt-4">
				Oops! The page you are looking for does not exist.
			</p>
			<Link
				to="/"
				className="mt-6 px-6 py-3 text-white font-bold bg-gradient-red-orange rounded-lg  transition hover:scale-110">
				Go Home
			</Link>
		</div>
	);
}
