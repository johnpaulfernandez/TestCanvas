'use client'

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import { useActions, useUIState } from 'ai/rsc'
import { ListTestCases } from './test-cases'

export interface ListProps {
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
        Great! Here are the list of functionalities that you can test. Please select one functionality to create tests for.
      </p>

      <ol>{list.functionality.map(fx => (
        <button key={fx} className='flex items-center gap-2 px-3 py-2 text-sm transition-colors bg-zinc-50 hover:bg-zinc-100 rounded-xl cursor-pointer w-full mb-2' onClick={async () => {
          const response = await submitUserMessage(
            `Proceed to create multiple test cases for the chosen functionality, ${fx}.\
            Each test case should include a test description, detailed test steps, expected results and any other notes related to the test.`)

          setMessages((currentMessages: any[]) => [
            ...currentMessages,
            response
          ])
        }}>{fx}</button>
      ))}
      </ol>

      {/* <p>Do you have any additional items in mind? If not, I can proceed to the creation of test cases.</p> */}

      {/* <div
        className='cursor-pointer bg-zinc-50 text-zinc-950 rounded-2xl p-4 sm:p-6 hover:bg-zinc-100 transition-colors'
        onClick={async () => {
          const response = await submitUserMessage(
            `The user approved of this test list. Now proceeding to the test cases for each functionality.
            Ask the user to select a functionality to create test cases for.
            Each test case will include a test description, detailed test steps, expected results and any other notes related to the test.`
          )
          setMessages((currentMessages: any[]) => [
            ...currentMessages,
            response
          ])
        }}>
        The list looks good to me!
      </div> */}
    </div>
  )
}
