import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
type Props = {
	code: string;
	language: string;
};

export default function CodeEditor(props: Props) {
	return (
		<>
			<SyntaxHighlighter language={props.language} style={atomOneDark}>
				{props.code}
			</SyntaxHighlighter>
		</>
	);
}
