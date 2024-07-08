'use client'

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import { useActions, useUIState } from 'ai/rsc'

interface ListProps {
  list: {
    functionality: string[],
  }
}

export const ListTestFunctionalities = ({ list }: ListProps) => {
  const { submitUserMessage } = useActions()
  const [_, setMessages] = useUIState()

  return (
    <div className='flex flex-col space-y-6'>
      <p>
        Great! Here are the list of functionalities that you can test.
      </p>

      <ol>{list.functionality.map(fx => (
        <li key={fx} className='list-decimal ml-4' onClick={async () => {
          const response = await submitUserMessage(
            `Create detailed test cases for ${fx}`
          )
          setMessages((currentMessages: any[]) => [
            ...currentMessages,
            response
          ])
        }}>{fx}</li>
      ))}
      </ol>

      <p>Do you have any additional items in mind? If not, I can proceed to the creation of test cases.</p>

      <div
        className='cursor-pointer bg-zinc-50 text-zinc-950 rounded-2xl p-4 sm:p-6 hover:bg-zinc-100 transition-colors'
        onClick={async () => {
          const response = await submitUserMessage(
            `The user approved of this test methodology. Now proceeding to the test cases for each functionality. Please do not change the current list unless told otherwise and ask the user to select a functionality to create test cases for.`
          )
          setMessages((currentMessages: any[]) => [
            ...currentMessages,
            response
          ])
        }}>
        The list looks good to me!
      </div>
    </div>
  )
}
