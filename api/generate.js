import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = req.body.prompt;
        const result = await model.generateContent(prompt);

        res.status(200).json({ text: result.response.text() });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.toString() });
    }
}
