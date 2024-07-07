'use client'

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import { useActions, useUIState } from 'ai/rsc'

interface TestProps {
  tests: {
    id: number,
    title: string,
    steps: {
      stepNumber: number,
      description: string
    },
  }
}

export const ListTestCases = ({ tests }: TestProps) => {
  const { submitUserMessage } = useActions()
  const [_, setMessages] = useUIState()

  return (
    <div className='flex flex-col space-y-6'>
      <p>
        Great! Here are the list of test cases. Please select the next functionality to test.
      </p>

      <ol>{Object.keys(tests).map((id, title, steps) => (
        <div key={id} className='list-decimal ml-4'>{title}
          <ul>
            {steps.map((id, desc) => (
              <li key={id} className='list-disc ml-4'>{desc}</li>
            ))}
          </ul>
        </div>
      ))}
      </ol>


      <p>Do you have any additional test cases in mind? If not, I can proceed to the next functionality.</p>

      <div
        className='cursor-pointer bg-zinc-50 text-zinc-950 rounded-2xl p-4 sm:p-6 hover:bg-zinc-100 transition-colors'
        onClick={async () => {
          const response = await submitUserMessage(
            `The user approved of these test cases. Now proceeding to the test cases for the next functionality.`
          )
          setMessages((currentMessages: any[]) => [
            ...currentMessages,
            response
          ])
        }}>
        OK!
      </div>
    </div>
  )
}
