export default async function handler(req, res) {
    // 1. التأكد من أن الطلب POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // 2. التأكد من وجود المفتاح السري
    if (!apiKey) {
        return res.status(500).json({ error: "API Key is missing in Vercel Environment Variables" });
    }

    try {
const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        ...req.body,
        safetySettings: [
            { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
        ]
    })
});

        const data = await response.json();

        // 3. إرسال النتيجة للمتصفح
        return res.status(200).json(data);

    } catch (error) {
        console.error("Vercel Edge Error:", error);
        return res.status(500).json({ error: "Failed to connect to Google AI", details: error.message });
    }
}
