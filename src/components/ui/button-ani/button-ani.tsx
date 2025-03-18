type Props = {
	label: string;
	onClick: (event: MouseEvent) => void;
};

import "./style.css";

export default function ButtonIlkh({ label }: Props) {
	return (
		<>
			<button type="button" className="button">
				<span className="fold"></span>

				<div className="points_wrapper">
					<i className="point"></i>
					<i className="point"></i>
					<i className="point"></i>
					<i className="point"></i>
					<i className="point"></i>
					<i className="point"></i>
					<i className="point"></i>
					<i className="point"></i>
					<i className="point"></i>
					<i className="point"></i>
				</div>

				<span className="inner">
					<svg
						className="icon"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2.5">
						<polyline points="13.18 1.37 13.18 9.64 21.45 9.64 10.82 22.63 10.82 14.36 2.55 14.36 13.18 1.37"></polyline>
					</svg>
					{label}
				</span>
			</button>
		</>
	);
}
