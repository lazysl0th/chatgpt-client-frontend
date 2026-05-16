import Message from './Message'
import type { IMessageListProps } from '../model/types'
import { useEffect, useRef } from 'react'

const MessageList = ({ messages }: IMessageListProps) => {
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages])

  return (
    <ul
      ref={listRef}
      className="flex min-h-0 w-full flex-1 flex-col gap-2 overflow-y-auto p-2"
    >
      {messages.length > 0 &&
        messages.map((message) => <Message key={message.id} {...message} />)}
    </ul>
  )
}

export default MessageList
