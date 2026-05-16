import { MessageForm } from '@features/send-message'
import { Greeting } from './Greeting'
import { MessageList } from '@entities/message'
import { useChat } from '@features/chat'

const Chat = () => {
  const { messages, sendMessage, isLoading } = useChat()

  return (
    <div
      className={`flex flex-col items-stretch ${!messages.length ? 'justify-around' : 'min-h-0 flex-1 gap-2'}`}
    >
      {!messages.length ? <Greeting /> : <MessageList messages={messages} />}
      <MessageForm sendMessage={sendMessage} isLoading={isLoading} />
    </div>
  )
}

export default Chat
