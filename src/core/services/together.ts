import axios from "axios";
const apiKey = import.meta.env.VITE_TOGETHER_API_KEY;

export const generateText = async function () {
	console.log(apiKey);

	const response = await axios.post(
		"https://api.together.xyz/v1/chat/completions",
		{
			model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
			messages: [
				{
					role: "user",
					content: "What are some fun things to do in New York?",
				},
			],
		},
		{
			headers: {
				Authorization: `Bearer ${apiKey}`,
				"Content-Type": "application/json",
			},
		}
	);
	console.log(response.data.choices[0].message.content);

	return response.data.choices[0].message.content;
};
