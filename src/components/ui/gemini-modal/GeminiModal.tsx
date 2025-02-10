import { useState } from "react";
import {
	Button,
	createListCollection,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValueText,
} from "@chakra-ui/react";
import { SelectRoot } from "../select";
import { generateText } from "../../../core/services/geminiService";

interface ModalProps {
	codeValue: string;
	codeLanguage: string;
	isOpen: boolean;
	onClose: () => void;
	onConfirm: (description: string) => void;
	onRetry: () => void;
}

const Modal = ({
	codeValue,
	codeLanguage,
	isOpen,
	onClose,
	onConfirm,
	onRetry,
}: ModalProps) => {
	const [language, setLanguage] = useState("eng");
	const listLanguage = createListCollection({
		items: [
			{ label: "Vietnamese", value: "vie" },
			{ label: "English", value: "eng" },
		],
	});
	const [description, setDescription] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleGenerate = async function () {
		setIsLoading(true);
		setDescription("Generating...");
		const repsonse = await generateText(language, codeValue, codeLanguage);
		console.log(repsonse);
		setDescription(repsonse ?? "Error");
		setIsLoading(false);
	};

	console.log(codeValue);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-white w-[600px] dark:bg-gray-800 rounded-lg shadow-xl max-w-md p-6">
				{/* Modal Header */}
				<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
					Generate description with Gemini
				</h2>
				<div className="relative w-[200px] h-[40px] rounded-md">
					<SelectRoot
						className="absolute left-0 top-[0px]"
						collection={listLanguage}
						onValueChange={(e) => setLanguage(e.value.toString())}
						size="sm"
						width="200px">
						<SelectTrigger>
							<SelectValueText placeholder="Language" />
						</SelectTrigger>
						<SelectContent>
							{listLanguage.items.map((item) => (
								<SelectItem item={item} key={item.value}>
									{item.label}
								</SelectItem>
							))}
						</SelectContent>
					</SelectRoot>
				</div>
				{/* Language Selection */}

				{/* Description Result */}
				<textarea
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					placeholder="Generated description will appear here..."
					className="w-full h-[400px] p-3 mt-4 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
					rows={4}></textarea>

				{/* Modal Footer */}
				<div className="flex justify-end space-x-2 mt-4">
					<Button
						colorScheme="gray"
						variant="outline"
						onClick={onClose}>
						Cancel
					</Button>
					<Button colorPalette="blue" onClick={handleGenerate}>
						Generate
					</Button>
					<Button
						colorPalette="blue"
						onClick={() => onConfirm(description)}>
						Confirm
					</Button>
					<Button colorPalette="green" onClick={onRetry}>
						Retry
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
