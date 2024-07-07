'use server'

import { google } from '@ai-sdk/google';
import { streamText, tool } from 'ai';
import { GoogleGenerativeAI } from '@google/generative-ai'
import { createAI, createStreamableUI, createStreamableValue, getAIState, getMutableAIState } from 'ai/rsc';
import z from 'zod'
import { nanoid } from 'nanoid';
import { BotCard, BotMessage, UserMessage } from '@/components/message';
import { ListTestMethodology } from '@/components/test-methodology';
import { Chat } from '../types';
import { ListTestFunctionalities } from '@/components/test-functionalities';
import { ListTestCases } from '@/components/test-cases';

const genAI = new GoogleGenerativeAI(
    process.env.GOOGLE_GENERATIVE_AI_API_KEY || ''
)

const testCasesSchema = z.object({
    id: z.number(),
    title: z.string().describe('Test case title'),
    steps: z.object({
        stepNumber: z.number(),
        description: z.string().describe('Test step'),
    }),
})

export async function submitUserMessage(input: string) {
    'use server';

    const aiState = getMutableAIState()

    aiState.update({
        ...aiState.get(),
        messages: [
            ...aiState.get().messages,
            {
                id: nanoid(),
                role: 'user',
                content: `${aiState.get().interactions.join('\n\n')}\n\n${input}`
            }
        ]
    })

    const history = aiState.get().messages.map((message: Message) => ({
        role: message.role,
        content: message.content
    }))

    const textStream = createStreamableValue('');
    const messageStream = createStreamableUI(null);
    const uiStream = createStreamableUI();

    (async () => {

        try {
            const result = await streamText({
                model: google('models/gemini-1.5-flash'),
                temperature: 1.0,
                system: `\
                You are a friendly assistant that helps a QA Engineer create a comprehensive test plan.
                You can recommend detailed test cases for each feature in the product requirements/user stories provided by the user, and will continue to help the user complete the test plan.
      
                Here's the flow: 
                  1. List the detailed test methodolody which includes the name of the feature, user story, assumptions, out of scope tests, test approach, test environment and test data.
                  2. List the functionalities that will be tested.
                  3. One by one, let the user choose a functionality to create test cases for.
                  4. Provide an option to generate tests for edge cases.
                  5. Show the completed test plan.

                ${input}`,
                messages: [...history],
                tools: {
                    testMethodology: {
                        description:
                            "Show the detailed test plan methodology (test approach, scope of testing, etc).",
                        parameters: z.object({
                            feature: z.string(),
                            userStory: z.string(),
                            assumptions: z.array(z.string()),
                            outOfScope: z.array(z.string()),
                            testApproach: z.string(),
                            testEnvironment: z.array(z.string()),
                            testData: z.array(z.string()),
                        })
                    },
                    testFunctionalities: {
                        description:
                            "List the test functionalities to be tested.",
                        parameters: z.object({
                            functionality: z.array(z.string()),
                        })
                    },
                    testCases: {
                        description:
                            "List the test cases for each functionality.",
                        parameters: testCasesSchema
                    },
                },
            });

            let textContent = ''

            for await (const delta of result.fullStream) {
                const { type } = delta

                console.log(type)

                if (type === 'text-delta') {
                    const { textDelta } = delta

                    textContent += textDelta
                    messageStream.update(<BotMessage content={textContent} />)

                    console.log(textContent)

                    aiState.update({
                        ...aiState.get(),
                        messages: [
                            ...aiState.get().messages,
                            {
                                id: nanoid(),
                                role: 'assistant',
                                content: textContent
                            }
                        ]
                    })

                } else if (type === 'tool-call') {
                    const { toolName, args } = delta

                    if (toolName === 'testMethodology') {

                        aiState.done({
                            ...aiState.get(),
                            interactions: [],
                            messages: [
                                ...aiState.get().messages,
                                {
                                    id: nanoid(),
                                    role: 'assistant',
                                    content: `Here's the test methodology`,
                                    display: {
                                        name: 'testMethodology',
                                        props: {
                                            summary: args
                                        }
                                    },
                                }
                            ],
                        })

                        uiStream.update(
                            <BotCard>
                                <ListTestMethodology summary={args} />
                            </BotCard>
                        )
                    } else if (toolName === 'testFunctionalities') {

                        aiState.done({
                            ...aiState.get(),
                            interactions: [],
                            messages: [
                                ...aiState.get().messages,
                                {
                                    id: nanoid(),
                                    role: 'assistant',
                                    content: `Here's the test list of functionalities to be tested.`,
                                    display: {
                                        name: 'testFunctionalities',
                                        props: {
                                            summary: args
                                        }
                                    },
                                }
                            ],
                        })

                        uiStream.update(
                            <BotCard>
                                <ListTestFunctionalities list={args} />
                            </BotCard>
                        )
                    } else if (toolName === 'testCases') {

                        aiState.done({
                            ...aiState.get(),
                            interactions: [],
                            messages: [
                                ...aiState.get().messages,
                                {
                                    id: nanoid(),
                                    role: 'assistant',
                                    content: `Here's the test list of test cases.`,
                                    display: {
                                        name: 'testCases',
                                        props: {
                                            summary: args
                                        }
                                    },
                                }
                            ],
                        })

                        uiStream.update(
                            <BotCard>
                                <ListTestCases tests={args} />
                            </BotCard>
                        )
                    }
                }
            }
            uiStream.done()
            textStream.done()
            messageStream.done()
        } catch (error) {
            console.error(error)

            const errorMessage = new Error(
                'The AI got rate limited, please try again later.'
            )

            uiStream.error(errorMessage)
            messageStream.error(errorMessage)
            aiState.done(errorMessage)
        }


    })();

    return {
        id: nanoid(),
        attachments: uiStream.value,
        display: messageStream.value
    };
}

export type Message = {
    role: 'user' | 'assistant' | 'system' | 'function' | 'data' | 'tool'
    content: string
    id?: string
    name?: string
    display?: {
        name: string
        props: Record<string, any>
    }
}

export type AIState = {
    chatId: string
    interactions?: string[]
    messages: Message[]
}

export type UIState = {
    id: string
    display: React.ReactNode
    attachments?: React.ReactNode
}[]

export const AI = createAI<AIState, UIState>({
    actions: {
        submitUserMessage,
    },
    initialUIState: [],
    initialAIState: { chatId: nanoid(), interactions: [], messages: [] },
    onGetUIState: async () => {
        'use server'

        const aiState = getAIState()
        if (aiState) {
            const uiState = getUIStateFromAIState(aiState)
            return uiState
        }
    },
})

export async function getMissingKeys() {
    const keysRequired = ['GOOGLE_GENERATIVE_AI_API_KEY']
    return keysRequired
        .map(key => (process.env[key] ? '' : key))
        .filter(key => key !== '')
}

export const getUIStateFromAIState = (aiState: Readonly<Chat>) => {
    return aiState.messages
        .filter(message => message.role !== 'system')
        .map((message: Message, index) => ({
            id: `${aiState.chatId}-${index}`,
            display:
                message.role === 'assistant' ? (
                    message.display?.name === 'testMethodology' ? (
                        <BotCard>
                            <ListTestMethodology summary={message.display?.props.summary} />
                        </BotCard>
                    ) : message.display?.name === 'testFunctionalities' ? (
                        <BotCard>
                            <ListTestFunctionalities list={message.display?.props.summary} />
                        </BotCard>
                    ) : (
                        <BotMessage content={message.content} />
                    )
                ) : message.role === 'user' ? (
                    <UserMessage>{message.content}</UserMessage>
                ) : (
                    <BotMessage content={message.content} />
                )
        }))
}