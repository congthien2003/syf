import React, { useState, useEffect } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";

const Editor = ({ initialValue, mode, theme, onChange }) => {
	const [editorValue, setEditorValue] = useState(initialValue);

	useEffect(() => {
		setEditorValue(initialValue);
	}, [initialValue]);

	const handleEditorChange = (value) => {
		setEditorValue(value);
		onChange(value);
	};

	return (
		<AceEditor
			value={editorValue}
			mode={mode}
			theme={theme}
			onChange={handleEditorChange}
			name="editor"
			editorProps={{ $blockScrolling: true }}
			setOptions={{
				enableBasicAutocompletion: true,
				enableLiveAutocompletion: true,
				enableSnippets: true,
				showLineNumbers: true,
				tabSize: 2,
			}}
		/>
	);
};

Editor.defaultProps = {
	initialValue: "",
	mode: "javascript",
	theme: "monokai",
	onChange: () => {},
};

export default Editor;
