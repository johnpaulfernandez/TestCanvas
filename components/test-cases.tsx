'use client'

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import { useActions, useUIState } from 'ai/rsc'
import { ListProps } from './test-functionalities';

interface TestCase {
  id: number,
  title: string,
  testScenario: {
    steps: string[],
    expectedResult: string,
    notes: string
  }
}

export interface TestCaseProps {
  tests: {
    testCases: TestCase[]
  },
  list: ListProps;
}

export const ListTestCases = ({ tests, list }: TestCaseProps) => {
  const { testCases } = tests
  const { submitUserMessage } = useActions()
  const [_, setMessages] = useUIState()

  return (
    <div className='flex flex-col space-y-6'>
      <p>
        Great! Here are the list of test cases. Please select the next functionality to test.
      </p>

      <ul>
        {testCases.map((test: any) => (
          <div className='list-disc ml-4'><b className='text-lg'>{test.title}</b>
            <ol>
              {test.testScenario.steps.map((step: any) => (
                <div key={step} className='list-decimal ml-4'>{step}</div>
              ))}
            </ol>
            <div><b>Expected result: </b>{test.testScenario.expectedResult}</div>
            {/* <div><b>Notes:</b>{test.testScenario.notes}</div> */}
            <br />
          </div>
        ))}
      </ul>

      <ol>{list.list.functionality.map(fx => (
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

      {/* <p>Do you have any additional test cases in mind? If not, I can proceed to the next functionality.</p> */}

      {/* <div
        className='cursor-pointer bg-zinc-50 text-zinc-950 rounded-2xl p-4 sm:p-6 hover:bg-zinc-100 transition-colors'
        onClick={async () => {
          const response = await submitUserMessage(
            `The user approved of these test cases. List the functionalities to test again.`
          )
          setMessages((currentMessages: any[]) => [
            ...currentMessages,
            response
          ])
        }}>
        OK!
      </div> */}
    </div>
  )
}
