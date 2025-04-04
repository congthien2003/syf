// import ButtonDonate from "../ui/button-donate/ButtonDonate";

import ButtonDonate from "../ui/button-donate/ButtonDonate";

export default function Footer() {
	return (
		<footer className="bg-gray-900 text-gray-300 py-8 px-6">
			<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
				{/* About Section */}
				<div>
					<h3 className="text-lg font-semibold text-white">
						About SYC
					</h3>
					<p className="mt-2 text-sm md:text-base text-gray-400">
						A platform to share and discover useful code snippets to
						boost productivity and learning.
					</p>
				</div>

				{/* Owner Info */}
				<div>
					<h3 className="text-lg font-semibold text-white">Owner</h3>
					<p className="mt-2 text-sm font-medium md:text-base text-gray-400">
						Developed by{" "}
						<span className="text-white font-semibold">Sabo</span>
					</p>
					<p className="text-sm font-medium md:text-base text-gray-400">
						Email: conggthien17@gmail.com
					</p>
					<p className="text-sm font-medium md:text-base text-gray-400">
						GitHub:{" "}
						<a
							href="https://github.com/congthien2003"
							className="hover:text-white transition">
							@congthien2003
						</a>
					</p>
				</div>
				<div>
					<ButtonDonate
						onclick={() =>
							window.open("https://syf.io.vn/qr-code.jpg")
						}></ButtonDonate>
					<p className="font-medium text-sm md:text-base mt-2 text-gray-400">
						Thanks you for your support <br /> Donate to help us
						keep the site running
					</p>
				</div>
			</div>

			{/* Bottom Section */}
			<div className="mt-6 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
				<p>
					&copy; {new Date().getFullYear()} SYC. All rights reserved.
				</p>
			</div>
		</footer>
	);
}
