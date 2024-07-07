'use client'

import { Button } from './ui/button';
import { ButtonX } from './ui/buttonx';
import { AI } from '@/lib/ai/actions';
import { } from '@/lib/ai/actions';
import { useActions, useUIState } from 'ai/rsc';
import { nanoid } from 'nanoid';
import { UserMessage } from './message';

interface ModalProps {
    input: string
    setInput: (value: string) => void
    onClose: () => void
}

export default function Modal({ input, setInput, onClose }: ModalProps) {
    const [messages, setMessages] = useUIState<typeof AI>()
    const { submitUserMessage } = useActions()

    const handleSubmitProductRequirements = async (e: any) => {
        e.preventDefault()

        const value = input.trim()
        setInput('')
        if (!value) return

        onClose()

        try {

            const responseMessage = await submitUserMessage(value);

            setMessages(currentMessages => [
                ...currentMessages,
                {
                    id: nanoid(),
                    display: <UserMessage>{'Create a new test plan from product requirements'}</UserMessage>
                }
            ])

            setMessages((currentMessages: any) => [
                ...currentMessages,
                responseMessage
            ])
        } catch (e) {

        }
    }

    return (
        <div className="modal fixed inset-0 z-50 w-screen">
            <div className='flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0'>
                <div className='fixed inset-0 transition-opacity bg-zinc-50 bg-opacity-95'>
                    <div className='hidden sm:inline-block sm:align-middle sm:h-screen mt-20 mx-20 w-8/12'>
                        <div className='inline-block align-bottom bg-white rounded-lg shadow-xl sm:w-full sm:p-6'>
                            <textarea
                                tabIndex={0}
                                placeholder="Write down the product requirements or user stories."
                                className="flex min-h-[600px] w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-within:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                autoFocus
                                spellCheck={false}
                                autoComplete="off"
                                autoCorrect="off"
                                name="message"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                            />
                            <div className='flex flex-row justify-end mt-16 '>
                                <ButtonX onClick={onClose} variant="outline">Cancel</ButtonX>
                                <ButtonX onClick={(e) => handleSubmitProductRequirements(e)} className='ml-4'>Continue</ButtonX>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}