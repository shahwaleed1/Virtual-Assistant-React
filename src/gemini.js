import{ GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import dotenv from 'dotenv'

dotenv.config

// let api_key =

const apiKey = import.meta.env.VITE_API_KEY ;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
})

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 50,
    responseMimeType: "text/plain",
}

async function run(prompt) {
    const chatSession = model.startChat({
        generationConfig,
        history: []
    })

    const result = await chatSession.sendMessage(prompt)
    return result.response.text()
}

export default run;
