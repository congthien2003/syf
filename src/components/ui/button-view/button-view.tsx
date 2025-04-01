type Props = {
	name: string;
	to?: string;
};
import { useNavigate } from "react-router";

export default function ButtonView({ name, to }: Props) {
	const navigate = useNavigate();
	return (
		<button
			className="relative font-inherit font-medium text-[15px] tracking-[0.05em] rounded-[0.8em] cursor-pointer border-none bg-gradient-to-r from-[#8e2de2] to-[#4a00e0] text-ghostwhite overflow-hidden hover:before:translate-x-full active:scale-95 group"
			onClick={() => {
				navigate(to ?? "/");
			}}>
			<span className="relative z-10 transition-colors text-gradient duration-400 inline-flex items-center p-[0.4em_0.6em_0.4em_0.6em]">
				<svg
					className="w-[1.2em] h-[1.2em] mr-2"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg">
					<path d="M0 0h24v24H0z" fill="none"></path>
					<path
						d="M24 12l-5.657 5.657-1.414-1.414L21.172 12l-4.243-4.243 1.414-1.414L24 12zM2.828 12l4.243 4.243-1.414 1.414L0 12l5.657-5.657L7.07 7.757 2.828 12zm6.96 9H7.66l6.552-18h2.128L9.788 21z"
						fill="currentColor"></path>
				</svg>
				{name}
			</span>
			<div className="absolute top-0 left-[-10%] w-[120%] h-full z-0 bg-black skew-x-[30deg] transition-transform duration-400 ease-[cubic-bezier(0.3,1,0.8,1)] group-hover:translate-x-full" />
		</button>
	);
}
