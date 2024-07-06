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
    <>
      <div><b>Feature: </b>{feature}</div>
      <div><b>User Story: </b>{userStory}</div>
      <ul><b>Assumptions:</b>
        {assumptions.map(item => (
          <li className='list-disc ml-4'>{item}</li>
        ))}
      </ul >
      <ul><b>Test Scope:</b>
        {outOfScope.map(item => (
          <li className='list-disc ml-4'>{item}</li>
        ))}
      </ul>
      <div><b>Test Approach: </b>{testApproach}</div>
      <ul><b>Test Environment: </b>
        {testEnvironment.map(item => (
          <li className='list-disc ml-4'>{item}</li>
        ))}
      </ul>
      <ul><b>Test Data:</b>
        {testData.map(item => (
          <li className='list-disc ml-4'>{item}</li>
        ))}
      </ul>
    </>
  )
}
