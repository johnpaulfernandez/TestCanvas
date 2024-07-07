'use client'

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import { useActions, useUIState } from 'ai/rsc'

interface ListTestMethodologyProps {
  summary: {
    feature: string
    userStory: string
    assumptions: string[]
    outOfScope: string[]
    testApproach: string
    testEnvironment: string[]
    testData: string[]
  }
}

export const ListTestMethodology = ({ summary }: ListTestMethodologyProps) => {
  const { feature, userStory, assumptions, outOfScope, testApproach, testEnvironment, testData } = summary
  const { submitUserMessage } = useActions()
  const [_, setMessages] = useUIState()

  return (
    <div className='flex flex-col space-y-6'>
      <div><b>Feature: </b>{feature}</div>
      <div><b>User Story: </b>{userStory}</div>
      <ul><b>Assumptions:</b>
        {assumptions.map(item => (
          <li key={item} className='list-disc ml-4'>{item}</li>
        ))}
      </ul >
      <div><b>Test Approach: </b>{testApproach}</div>
      <ul><b>Test Environment: </b>
        {testEnvironment.map(item => (
          <li key={item} className='list-disc ml-4'>{item}</li>
        ))}
      </ul>
      <ul><b>Test Data:</b>
        {testData.map(item => (
          <li key={item} className='list-disc ml-4'>{item}</li>
        ))}
      </ul>
      <ul><b>Out of scope:</b>
        {outOfScope.map(item => (
          <li key={item} className='list-disc ml-4'>{item}</li>
        ))}
      </ul>
      <div
        className='cursor-pointer bg-zinc-50 text-zinc-950 rounded-2xl p-4 sm:p-6 hover:bg-zinc-100 transition-colors'
        onClick={async () => {
          const response = await submitUserMessage(
            `The user approved of this test methodology. Now proceeding to the list of functionalities to be tested.`
          )
          setMessages((currentMessages: any[]) => [
            ...currentMessages,
            response
          ])
        }}>
        Looks good!
      </div>
    </div>
  )
}
