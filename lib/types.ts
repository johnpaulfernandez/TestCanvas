import { Message } from 'ai'

export interface Chat extends Readonly<any> {
  id: string
  title: string
  createdAt: Date
  path: string
  messages: Message[]
}