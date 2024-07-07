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
    <div>
      <div>
        {messages.length ? (<ChatList messages={messages}></ChatList>) : (<WelcomeScreen />)}
      </div>
      <ProductRequirementsForm
        id={id}
        input={input}
        setInput={setInput}
      />
    </div>

  )
}
