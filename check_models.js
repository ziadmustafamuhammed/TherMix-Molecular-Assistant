import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error("Error: GEMINI_API_KEY not found in .env");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

const modelsToTest = [
    "gemini-1.5-flash",
    "gemini-1.5-flash-001",
    "gemini-1.5-flash-latest",
    "gemini-1.5-pro",
    "gemini-pro",
    "gemini-1.0-pro"
];

async function testModel(modelName) {
    try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Hello");
        const response = await result.response;
        console.log(`✅ ${modelName}: Success`);
        return true;
    } catch (error) {
        console.log(`❌ ${modelName}: Failed - ${error.message.split('\n')[0]}`);
        return false;
    }
}

async function runTests() {
    console.log("Testing Gemini models...");
    for (const model of modelsToTest) {
        await testModel(model);
    }
}

runTests();
