'use client'

import * as React from 'react'
import Textarea from 'react-textarea-autosize'
import { Button } from './ui/button'
import { AI } from '@/lib/ai/actions';
import { readStreamableValue, useAIState, useActions, useUIState } from 'ai/rsc';
import { useState } from 'react';
import { UserMessage } from './message';
import { nanoid } from 'nanoid';
import { ButtonX } from './ui/buttonx';
import { SendIcon } from './ui/icons';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;
export interface PromptFormProps extends React.ComponentProps<'div'> {
  id?: string
  input: string
  setInput: (value: string) => void
}

export function PromptForm({
  id,
  input,
  setInput,
}: PromptFormProps) {

  const [messages, setMessages] = useUIState<typeof AI>()
  const [aiState] = useAIState()
  const { submitUserMessage } = useActions()

  const handleSubmitPrompt = async (e: any) => {
    e.preventDefault()

    const value = input.trim()
    setInput('')
    if (!value) return

    const responseMessage = await submitUserMessage(value);

    setMessages((currentMessages: any) => [
      ...currentMessages,
      responseMessage
    ])
  }

  return (
    <form onSubmit={handleSubmitPrompt}>

      <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-zinc-100 px-3 sm:rounded-full sm:px-8">
        <Textarea
          tabIndex={0}
          placeholder="Message TestCanvas"
          className="h-[60px] resize-none bg-zinc-100 w-full bg-transparent placeholder:text-gray-600 py-[1.3rem] focus-within:outline-none sm:text-sm sm:rounded-md"
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          name="message"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <div className="absolute right-4 top-[13px] sm:right-4">
          <Button
            type="submit"
            disabled={input === ''}
            className="bg-transparent shadow-none text-zinc-950 rounded-full hover:bg-zinc-200"
          >
            <SendIcon />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </div>
    </form>
  )
}
