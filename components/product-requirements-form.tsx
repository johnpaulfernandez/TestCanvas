'use client'

import * as React from 'react'
import Textarea from 'react-textarea-autosize'
import { Button } from './ui/button'
import { AI } from '@/lib/ai/actions';
import { readStreamableValue, useAIState, useActions, useUIState } from 'ai/rsc';
import { useState } from 'react';
import { UserMessage } from './message';
import { nanoid } from 'nanoid';
import Modal from './modal';

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

  const handleOpenModal = (e: any) => {
    e.preventDefault()

    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className='flex flex-col'>
      <form onSubmit={handleOpenModal}>
        {showModal && <Modal input={input} setInput={setInput} onClose={handleCloseModal} />}

        <div>
          <Button type="submit">Create a test plan</Button>
        </div>
      </form>
    </div>
  )
}
