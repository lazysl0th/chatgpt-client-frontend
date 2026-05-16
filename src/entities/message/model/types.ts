import type { TAuthor } from '@shared/api'

export interface IMessage {
  id: string
  role: TAuthor
  content: string
  isLoading?: boolean
  isError?: boolean
}

export type TMessageProps = Omit<IMessage, 'id'>

export interface IMessageListProps {
  messages: IMessage[]
}
