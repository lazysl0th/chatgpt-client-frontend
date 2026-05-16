import { Mic, AudioLines, ChevronRight } from 'lucide-react'
import { useState, type ChangeEvent, type SubmitEvent } from 'react'
import type { IMessageFormProps } from '../model/types'
import { useSpeechRecognition } from '@shared/lib/speechRecognition/useSpeechRecognition'

const MessageForm = ({ sendMessage, isLoading }: IMessageFormProps) => {
  const [message, setMessage] = useState<string>('')

  const { start, stop, isListening } = useSpeechRecognition({
    silenceTimeout: 2000,
    onResult: setMessage,
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const currentMessage = message.trim()
    if (!currentMessage || isLoading) return
    setMessage('')
    if (isListening) stop()
    sendMessage(currentMessage)
  }

  return (
    <form
      className="flex overflow-hidden rounded-xl border-2 border-[var(--border)]"
      onSubmit={handleSubmit}
    >
      <button
        type="button"
        disabled={isLoading}
        className="cursor-pointer rounded-lg p-3 transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
        onClick={isListening ? stop : start}
      >
        {isListening ? (
          <AudioLines
            size={20}
            className="animate-pulse text-[var(--border)] hover:text-blue-900"
          />
        ) : (
          <Mic
            size={20}
            className="text-[var(--border)] transition-colors hover:text-blue-900"
          />
        )}
      </button>

      <input
        type="text"
        name="question"
        placeholder={isLoading ? 'AIis thinking...' : 'Ask whatever you want'}
        className="flex-1 bg-transparent outline-none disabled:cursor-not-allowed disabled:text-zinc-500"
        value={message}
        disabled={isLoading}
        onChange={handleChange}
      />

      <button
        type="submit"
        disabled={isLoading || !message.trim()}
        className="cursor-pointer rounded-lg bg-[var(--button-bg)] p-3 transition-all hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronRight size={20} />
      </button>
    </form>
  )
}

export default MessageForm
