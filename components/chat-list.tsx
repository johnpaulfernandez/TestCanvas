import { Message, UIState } from '@/lib/ai/actions'
import Link from 'next/link'

export interface ChatList {
  messages: UIState
}

export function ChatList({ messages }: ChatList) {
  return messages.length ? (
    <div className="relative mx-auto max-w-2xl grid auto-rows-max gap-8 px-4 mt-10">
      {messages.map(message => (
        <div key={message.id}>
          {message.display}
          {message.attachments}
        </div>
      ))}

      <div className="my-10 group relative flex items-start md:-ml-12">
        <div className="ml-5 flex-1 space-y-2 overflow-hidden px-1">
          <p className="text-muted-foreground leading-normal">
            Please{' '}
            <Link href="/login" className="underline underline-offset-4">
              log in
            </Link>{' '}
            to save your test plan.
          </p>
        </div>
      </div>
    </div>
  ) : null
}
