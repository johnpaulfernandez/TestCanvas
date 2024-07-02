'use client'

import { PromptForm } from "@/components/prompt-form"
import { useState } from "react"

export default function CreatePage() {

  const [input, setInput] = useState('')

  return (

    <div>
      <PromptForm input={input} setInput={setInput} />
    </div>
  )
}
