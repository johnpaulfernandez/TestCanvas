import { Chat } from "@/components/chat"
import { PromptForm } from "@/components/prompt-form"
import { AI, getMissingKeys } from "@/lib/ai/actions"
import { nanoid } from "nanoid"
import { useState } from "react"

export default async function CreatePage() {
  const id = nanoid()
  const missingKeys = await getMissingKeys()

  return (

    <AI initialAIState={{ chatId: id, interactions: [], messages: [] }}>
      <div className="mt-20">
        <Chat id={id} missingKeys={missingKeys} />
      </div>
    </AI>

  )
}
