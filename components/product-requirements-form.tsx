'use client'

import * as React from 'react'
import { AI } from '@/lib/ai/actions';
import { useUIState } from 'ai/rsc';
import { useState } from 'react';
import { UserMessage } from './message';
import { nanoid } from 'nanoid';
import Modal from './modal';
import { cn } from '@/lib/utils';

const userOptions = [
  {
    heading: 'Create a new test plan',
    subheading: 'from product requirements',
    message: ``
  },
  {
    heading: 'Convert test cases to Cucumber',
    subheading: 'scenario outlines',
    message: ''
  }
]

export const dynamic = 'force-dynamic';
export const maxDuration = 30;
export interface PromptFormProps extends React.ComponentProps<'div'> {
  id?: string
  input: string
  setInput: (value: string) => void
}

export function ProductRequirementsForm({
  input,
  setInput,
}: PromptFormProps) {

  const [showModal, setShowModal] = useState(false);
  const [messages, setMessages] = useUIState<typeof AI>()

  const handleOpenModal = (e: any) => {
    e.preventDefault()

    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className='flex h-full flex-row items-center justify-center'>
      <div className="mx-3 mt-12 flex max-w-3xl flex-wrap items-stretch justify-center gap-4">
        {messages.length === 0 &&
          userOptions.map((option, index) => (
            <div
              key={option.heading}
              className={cn(
                'cursor-pointer hover:bg-zinc-100 text-gray-600 dark:text-gray-500 relative flex w-72 flex-col gap-2 rounded-2xl border border-token-border-light px-3 pb-4 pt-3 text-start align-top text-[15px] shadow-xxs transition enabled:hover:bg-token-main-surface-secondary disabled:cursor-not-allowed',
                index > 1 && 'hidden md:block'
              )}
              onClick={async (e) => {
                handleOpenModal(e)
              }}
            >
              <div className="font-medium">{option.heading}</div>
              <div className="text-sm text-zinc-800">
                {option.subheading}
              </div>
            </div>
          ))}
      </div>
      {showModal && <Modal input={input} setInput={setInput} onClose={handleCloseModal} />}
    </div>
  )
}
