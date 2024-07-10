import { Chat } from "@/components/chat"
import { PromptForm } from "@/components/prompt-form"
import { AI, getMissingKeys } from "@/lib/ai/actions"
import { nanoid } from "nanoid"
import { useState } from "react"
import { TestListProvider } from "@/lib/hooks/use-test-list"

export default async function CreatePage() {
  const id = nanoid()
  const missingKeys = await getMissingKeys()

  return (

    <AI initialAIState={{ chatId: id, interactions: [], messages: [] }}>
      <TestListProvider>
        <Chat id={id} missingKeys={missingKeys} />
      </TestListProvider>
    </AI>

  )
}
