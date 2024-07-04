'use server'

import { google } from '@ai-sdk/google';
import { streamObject } from 'ai';
import { GoogleGenerativeAI } from '@google/generative-ai'
import { createStreamableValue } from 'ai/rsc';
import z from 'zod'

const genAI = new GoogleGenerativeAI(
    process.env.GOOGLE_GENERATIVE_AI_API_KEY || ''
)

export async function submitUserMessage(input: string): Promise<TestCases> {
    'use server';

    const stream = createStreamableValue();

    (async () => {
        const { partialObjectStream } = await streamObject({
            model: google('models/gemini-1.5-flash'),
            prompt: `You are an expert QA Engineer. Given the following product requirements and user stories, create a list of test cases for each user scenario.
            ${input}`,
            schema: z.object({
                testCases: z.array(z.object({
                    id: z.number(),
                    title: z.string().describe('Test case title'),
                    steps: z.array(z.object({
                        stepNumber: z.number(),
                        description: z.string().describe('Test step'),
                    })),
                })),
            }),
        });

        for await (const partialObject of partialObjectStream) {
            stream.update(partialObject);
        }

        stream.done();
    })();

    return { output: stream.value };
}