'use server'

import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { GoogleGenerativeAI } from '@google/generative-ai'
import { createStreamableValue } from 'ai/rsc';


const genAI = new GoogleGenerativeAI(
    process.env.GOOGLE_GENERATIVE_AI_API_KEY || ''
)

export async function submitUserMessage(input: string) {
    const stream = createStreamableValue('');

    (async () => {
        const { textStream } = await streamText({
            model: google('models/gemini-1.5-flash'),
            prompt: `You are an expert QA Engineer. Given the following product requirements and user stories, create a list of test cases for each user scenario.
            ${input}`,
        });

        for await (const delta of textStream) {
            stream.update(delta);
        }

        stream.done();
    })();

    return { output: stream.value };
}