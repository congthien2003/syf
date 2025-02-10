import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
	model: "gemini-1.5-pro",
});

const generationConfig = {
	temperature: 0.7,
	topP: 0.95,
	topK: 40,
	maxOutputTokens: 400,
	responseMimeType: "text/plain",
};
// Thay bằng API key của bạn
import { promt as constPromt } from "../../const/promt";
export const generateText = async (
	lang: string,
	code: string,
	codeLanguage: string
): Promise<string | null> => {
	try {
		const langPromt = lang === "vie" ? constPromt.vie : constPromt.eng;
		const prompt = `This is ${codeLanguage} function: ${code} \n ${langPromt} `;
		console.log(apiKey);

		const chatSession = model.startChat({
			generationConfig,
			history: [],
		});

		const result = await chatSession.sendMessage(prompt);
		console.log(result.response.text());

		return result.response.text() || "No response from AI.";
	} catch (error) {
		console.error("Error generating text:", error);
		return null;
	}
};
