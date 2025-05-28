import axios from "axios";

const MODEL_NAME = "gemini-1.5-flash";
const API_KEY = "AIzaSyDPoSQDcchtOaPnZzqPvydEgCZId4AR-zo";

const language = 'es'

export async function analyzeWithGemini(inputText: string) {

    const body = {
        contents: [{
            role: "user",
            parts: [{
                text: `
            You are a helpful assistant that analyzes text for phishing/social engineering threats.
            The text is: ${inputText}
            Return a score between 0 and 100 for the text. The score is based on the text being a phishing/social engineering threat.
            0 represents a very low probability of being a phishing/social engineering threat.
            100 represents a very high probability of being a phishing/social engineering threat.
            The score is a number between 0 and 100.
            You should argument the reason for the score.
            You should return the score and the reason for the score in a mere text format.
            The text should be in the following format:
            "score: 0-100, reason: reason for the score"
            "Remember, you should be very realistic: take into account the domain, typography, grammar, etc.
            "You are giving some false positives just because it's  money/bank related. Verify domain, phone-numbers, real bank names, etc.
            Answer in ${language}.
            Respond in this format:
             {
                "score": 0-100,
                "reason": "reason for the score"
             }
        ` }],
        }],
        generationConfig: { temperature: 0.2 },
    };

    const res = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`, body, {
        headers: {
            "Content-Type": "application/json"
        },
    })
    const output = JSON.parse(res.data.candidates[0]?.content?.parts[0].text.replace('```json', '').replace('```', '').trim());

    return output;
}
