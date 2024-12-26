import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { jobTitle, description, yearsOfExperience } = body;

    if (!jobTitle || !description || !yearsOfExperience) {
      return NextResponse.json(
        { error: "Missing required fields: jobTitle, description, or yearsOfExperience" },
        { status: 400 }
      );
    }

    const prompt = `Generate 10 interview questions for a job titled "${jobTitle}" with the description "${description}" requiring ${yearsOfExperience} years of experience.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are an assistant that generates interview questions." },
        { role: "user", content: prompt },
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    const generatedText = response.choices[0]?.message?.content?.trim();
    const questions = generatedText
      ? generatedText.split("\n").map((q) => q.replace(/^\d+\.\s*/, ""))
      : [];

    return NextResponse.json({ questions });
  } catch (error) {
    console.error("Error generating questions:", error);
    return NextResponse.json({ error: "Failed to generate questions" }, { status: 500 });
  }
}