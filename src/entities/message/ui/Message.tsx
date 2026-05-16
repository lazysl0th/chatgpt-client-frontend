import type { TMessageProps } from '../model/types'
import { CircleAlert, Ellipsis } from 'lucide-react'

const Message = ({ role, content, isLoading, isError }: TMessageProps) => {
  const isUser = role === 'user'

  const messageStyle = isUser
    ? 'self-end bg-blue-900 p-2 rounded-xl'
    : isError
      ? 'self-start text-red-400/90 italic flex items-center gap-1.5'
      : 'self-start'

  return (
    <li
      className={`${messageStyle} ${isLoading ? 'animate-pulse opacity-70' : ''} leading-normal transition-all`}
    >
      {isError && <CircleAlert />}
      {isLoading ? (
        <Ellipsis className="animate-pulse text-zinc-400" size={24} />
      ) : (
        <span>{content}</span>
      )}
    </li>
  )
}

export default Message
