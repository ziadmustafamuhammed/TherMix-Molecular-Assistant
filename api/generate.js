import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    try {
        const result = await model.generateContent(req.body.contents[0].parts[0].text);
        const response = await result.response;
        res.status(200).json({ candidates: [{ content: { parts: [{ text: response.text() }] } }] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
