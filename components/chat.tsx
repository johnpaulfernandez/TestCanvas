'use client'

import { Message } from "@/lib/ai/actions"
import { useAIState, useUIState } from "ai/rsc"
import { useState, useEffect } from "react"
import { PromptForm } from "./prompt-form"
import { ChatList } from "./chat-list"
import { WelcomeScreen } from "./welcome-screen"
import { useRouter } from 'next/navigation'
import { ProductRequirementsForm } from "./product-requirements-form"

export interface ChatProps extends React.ComponentProps<'div'> {
  id?: string
  missingKeys: string[]
}

export function Chat({ id, missingKeys }: ChatProps) {
  const router = useRouter()
  const [input, setInput] = useState('')
  const [messages] = useUIState()
  const [aiState] = useAIState()

  return (
    <div className="relative flex h-full max-w-full flex-1 flex-col overflow-hidden">
      <main className='relative h-full w-full flex-1 overflow-auto transition-width'>
        <div className='flex h-full flex-col focus-visible:outline-0justify-center'>
          <div className='flex-1 overflow-hidden'>
            <div className='h-full'>
              <div className='flex h-full flex-col justify-center text-token-text-primary'>
                <div>
                  {messages.length ? (<ChatList messages={messages}></ChatList>) : (<WelcomeScreen />)}
                </div>
                <ProductRequirementsForm
                  id={id}
                  input={input}
                  setInput={setInput}
                />
              </div>

            </div>

          </div>
        </div>
      </main>
      <div className="my-16">
        <PromptForm
          id={id}
          input={input}
          setInput={setInput}
        />
      </div>
    </div>
  )
}
