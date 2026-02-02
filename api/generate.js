import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST method required" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Missing API Key" });
  }

  try {
    const { prompt } = req.body;

    const genAI = new GoogleGenerativeAI(apiKey);

    // 🔥 الموديل الصحيح 100%
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest",
      apiVersion: "v1"
    });

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return res.status(200).json({ text });
  } catch (error) {
    console.error("API ERROR:", error);
    return res.status(500).json({ error: error.message });
  }
}
