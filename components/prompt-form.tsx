'use client'

import * as React from 'react'
import Textarea from 'react-textarea-autosize'
import { Button } from './ui/button'
import { AI } from '@/lib/ai/actions';
import { readStreamableValue, useAIState, useActions, useUIState } from 'ai/rsc';
import { useState } from 'react';
import { UserMessage } from './message';
import { nanoid } from 'nanoid';

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

  const handleSubmitProductRequirements = async (e: any) => {
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
    <form onSubmit={handleSubmitProductRequirements}>
      <div className="flex flex-col items-end w-full">
        <Textarea
          tabIndex={0}
          placeholder="Write down the product requirements or user stories."
          className="h-[300px] resize-none bg-zinc-100 w-full bg-transparent placeholder:text-gray-600 px-4 py-[1.3rem] focus-within:outline-none sm:text-sm sm:rounded-md mb-4"
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          name="message"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <div>
          <Button type="submit">Send</Button>
        </div>

      </div>
    </form>
  )
}
