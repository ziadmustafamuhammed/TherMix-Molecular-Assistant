import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: "Method not allowed" });

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "API Key Missing" });

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        
        const model = genAI.getGenerativeModel(
            { model: "gemini-1.5-flash" },
            { apiVersion: 'v1' } 
        );

        const prompt = req.body.contents[0].parts[0].text;
        
        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            safetySettings: [
                { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
            ],
        });

        const response = await result.response;
        const text = response.text();

        res.status(200).json({
            candidates: [{ content: { parts: [{ text: text }] } }]
        });

    } catch (error) {
        console.error("DETAILED AI ERROR:", error);
        res.status(500).json({ error: "AI Processing Failed", details: error.message });
    }
}
