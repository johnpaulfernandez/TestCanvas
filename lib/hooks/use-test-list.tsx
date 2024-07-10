'use client'

import { ListProps } from '@/components/test-functionalities'
import * as React from 'react'

const LOCAL_STORAGE_KEY = 'testList'

interface TestListContext {
  testList: ListProps
  setTestListValue: (obj: ListProps) => void
}

const TestListContext = React.createContext<TestListContext | undefined>(
  undefined
)

export function useTestList() {
  const context = React.useContext(TestListContext)
  if (!context) {
    throw new Error('useTestListContext must be used within a TestListProvider')
  }
  return context
}

interface TestListProviderProps {
  children: React.ReactNode
}

export function TestListProvider({ children }: TestListProviderProps) {
  const [testList, setTestList] = React.useState({ list: { functionality: [""] } })

  React.useEffect(() => {
    const value = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (value) {
      setTestList(JSON.parse(value))
    }
  }, [])

  const setTestListValue = (newValue: ListProps) => {
    setTestList(() => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newValue))
      return newValue
    })
  }

  return (
    <TestListContext.Provider
      value={{ testList, setTestListValue }}
    >
      {children}
    </TestListContext.Provider>
  )
}
