import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
	model: "gemini-1.5-flash",
});

const generationConfig = {
	temperature: 0.7,
	topP: 0.95,
	topK: 40,
	maxOutputTokens: 400,
	responseMimeType: "text/plain",
};

export const genPrompt = ({
	code,
	codeLanguage, // Mặc định là JavaScript, có thể đổi thành Python, Go,...
	outputLanguage, // Mặc định trả về tiếng Việt, có thể đổi thành English
}: {
	code: string;
	codeLanguage: string;
	outputLanguage: string;
}): string => {
	return `
Bạn là một chuyên gia lập trình. Hãy giúp tôi **mô tả chi tiết** đoạn mã sau theo **định dạng Markdown**, bao gồm các phần sau:

## Mô tả chung
- Mô tả ngắn gọn chức năng và mục đích của đoạn mã.

## Tham số (Input)
- Liệt kê các tham số đầu vào (nếu có), giải thích ý nghĩa từng tham số.

## Kết quả trả về (Output)
- Giải thích giá trị mà đoạn mã trả về (nếu có).

## Điểm nổi bật
- Nếu có, nêu các điểm nổi bật như cách tối ưu, xử lý đặc biệt, hoặc kỹ thuật được sử dụng.

## Trường hợp sử dụng (Use Cases)
- Nêu các trường hợp sử dụng thực tế, giúp người đọc hiểu đoạn mã dùng làm gì.

## Giải thích từng bước (Step-by-step)
- Giải thích chi tiết cách đoạn mã hoạt động theo từng bước, giúp dễ hiểu.

**Yêu cầu:**
- Viết ngắn gọn, dễ hiểu, phù hợp với người mới học lập trình.
- Trả lời bằng ${outputLanguage}.
- Giới hạn trong 150-200 từ.
- Không thêm bất kỳ nội dung ngoài lề hoặc code mẫu.

### Đoạn mã nguồn (${codeLanguage}):
\`\`\`${codeLanguage}
${code}
\`\`\`
  `.trim();
};

export const generateText = async (
	outputLanguage: string,
	code: string,
	codeLanguage: string
): Promise<string | null> => {
	try {
		const prompt = genPrompt({ code, codeLanguage, outputLanguage });

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
