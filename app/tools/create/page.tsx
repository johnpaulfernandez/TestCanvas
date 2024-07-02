'use client'

import { PromptForm } from "@/components/prompt-form"
import { useState } from "react"

export default function CreatePage() {

  const [input, setInput] = useState('')

  return (

    <div className="mt-20">
      <PromptForm input={input} setInput={setInput} />
    </div>
  )
}
