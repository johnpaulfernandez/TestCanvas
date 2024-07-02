'use server'

import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { GoogleGenerativeAI } from '@google/generative-ai'
import { get } from 'http';


const genAI = new GoogleGenerativeAI(
    process.env.GOOGLE_GENERATIVE_AI_API_KEY || ''
)

export async function submitUserMessage(formData: FormData) {
    const { text } = await generateText({
        model: google("models/gemini-1.5-pro-latest"),
        prompt: `You are an expert QA Engineer. Given the following product requirements and user stories, create a detailed test plan for each user scenario, including edge cases.
                ${formData.get("message")}`,
    });
    console.log(text);
    return {
        message: 'Database Error: Failed to Create Invoice.',
    };
}