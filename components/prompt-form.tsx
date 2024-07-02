'use client'

import * as React from 'react'
import Textarea from 'react-textarea-autosize'
import { Button } from './ui/button'
import { submitUserMessage } from '@/lib/ai/actions';
import { readStreamableValue } from 'ai/rsc';
import { useState } from 'react';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;


export function PromptForm({
  input,
  setInput
}: {
  input: string
  setInput: (value: string) => void
}) {

  const [generation, setGeneration] = useState<string>('');

  return (
    <form onSubmit={async (e: any) => {
      e.preventDefault()

      const value = input.trim()
      if (!value) return

      const { output } = await submitUserMessage(value);

      for await (const delta of readStreamableValue(output)) {
        setGeneration(currentGeneration => `${currentGeneration}${delta}`);
      }
    }}
    >

      <div className="flex flex-col items-end w-full">
        <Textarea
          tabIndex={0}
          placeholder="Write down the product requirements or user stories."
          className="min-h-[300px] bg-zinc-100 w-full bg-transparent placeholder:text-gray-600 resize-none px-4 py-[1.3rem] focus-within:outline-none sm:text-sm sm:rounded-md mb-4"
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          name="message"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <div>
          <Button type="submit">Generate</Button>
        </div>

        <div>{generation}</div>
      </div>
    </form>
  )
}
