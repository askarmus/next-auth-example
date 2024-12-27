import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: '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',
})

export async function POST(request: Request) {
    try {
        const body = await request.json()
        console.log(body)
        const { jobTitle, description, selectedExperience } = body

        if (!jobTitle || !description || !selectedExperience) {
            return NextResponse.json(
                {
                    error: 'Missing required fields: jobTitle, description, or yearsOfExperience',
                },
                { status: 400 }
            )
        }

        const prompt = `Generate 10 interview questions for a job titled "${jobTitle}" with the description "${description}" requiring ${selectedExperience} level of experience.`

        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content:
                        'You are an assistant that generates interview questions.',
                },
                { role: 'user', content: prompt },
            ],
            max_tokens: 300,
            temperature: 0.7,
        })

        const generatedText = response.choices[0]?.message?.content?.trim()
        const questions = generatedText
            ? generatedText.split('\n').map((q) => q.replace(/^\d+\.\s*/, ''))
            : []

        return NextResponse.json({ questions })
    } catch (error) {
        console.error('Error generating questions:', error)
        return NextResponse.json(
            { error: 'Failed to generate questions' },
            { status: 500 }
        )
    }
}
