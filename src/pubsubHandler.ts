import { analyzeWithGemini } from "./gemini";

interface Result {
  score: number;
  reason: string;
}

export async function handlePubSubMessage(body: any) {

  if (!body.text) {
    throw new Error("Invalid Pub/Sub message: no message or data");
  }

  const result: Result = await analyzeWithGemini(body.text);

  return result;
}
