'use client'

import * as React from 'react'
import Textarea from 'react-textarea-autosize'
import { Button } from './ui/button'

export function PromptForm({
  input,
  setInput
}: {
  input: string
  setInput: (value: string) => void
}) {

  return (
    <form
      onSubmit={async (e: any) => {
        e.preventDefault()

        const value = input.trim()
        setInput('')
        if (!value) return


        try {
        } catch {

        }
      }}
    >
      <div className="w-full">
        <Textarea
          tabIndex={0}
          placeholder="Write down the product requirements or user stories."
          className="min-h-[300px] bg-zinc-100 w-full bg-transparent placeholder:text-gray-600 resize-none px-4 py-[1.3rem] focus-within:outline-none sm:text-sm sm:rounded-md"
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          name="message"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <div>
          <Button asChild size="sm" className="rounded-lg gap-2"
            type="submit"
            disabled={input === ''}
          >
            <span>Generate</span>
          </Button>
        </div>
      </div>
    </form>
  )
}
