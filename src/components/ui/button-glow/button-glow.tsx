import styled from "styled-components";
type Props = {
	onClick: () => void;
};
const ButtonGlow = ({ onClick }: Props) => {
	return (
		<StyledWrapper>
			<button className="btn" onClick={onClick}>
				<svg
					height={20}
					width={20}
					fill="#FFFFFF"
					viewBox="0 0 24 24"
					data-name="Layer 1"
					id="Layer_1"
					className="sparkle ">
					<path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z" />
				</svg>
				<span className="text-sm text-white font-semibold">
					Format Code
				</span>
			</button>
		</StyledWrapper>
	);
};

const StyledWrapper = styled.div`
	.btn {
		border: none;
		width: 150px;
		height: 40px;
		border-radius: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 12px;
		background: #1c1a1c;
		cursor: pointer;
		transition: all 0.2s ease-in-out;
	}

	.sparkle {
		fill: #aaaaaa;
		transition: all 800ms ease;
	}

	.text {
		font-weight: 600;
		color: #aaaaaa;
		font-size: medium;
	}

	.btn:hover {
		background: linear-gradient(0deg, #a47cf3, #683fea);
		box-shadow: inset 0px 1px 0px 0px rgba(255, 255, 255, 0.4),
			inset 0px -4px 0px 0px rgba(0, 0, 0, 0.2),
			0px 0px 0px 4px rgba(255, 255, 255, 0.2), 0px 0px 180px 0px #9917ff;
		transform: translateY(-2px);
	}

	.btn:hover .text {
		color: white;
	}

	.btn:hover .sparkle {
		fill: white;
		transform: scale(1.2);
	}
`;

export default ButtonGlow;
