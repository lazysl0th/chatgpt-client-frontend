import { useState, useCallback, useRef, useEffect } from 'react'
import { api } from '@shared/api'
import { normalizeError } from '@shared/api/error'
import type { IMessage } from '@entities/message'

export const useChat = () => {
  const [messages, setMessages] = useState<IMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const isSendingRef = useRef(false)
  const abortControllerRef = useRef<AbortController | null>(null)

  const sendMessage = useCallback(async (text: string) => {
    if (isSendingRef.current) return

    isSendingRef.current = true
    setIsLoading(true)

    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    abortControllerRef.current = new AbortController()

    const userMessage: IMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text,
    }

    const pendingId = crypto.randomUUID()
    const pendingMessage: IMessage = {
      id: pendingId,
      role: 'assistant',
      content: '',
      isLoading: true,
    }

    setMessages((prev) => [...prev, userMessage, pendingMessage])

    try {
      const data = await api.chat.sendMessage(text, {
        signal: abortControllerRef.current.signal,
      })

      const contentText = data.response.content?.[0]?.text || ''

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === pendingId
            ? {
                id: data.response.id,
                role: data.response.role,
                content: contentText,
              }
            : msg,
        ),
      )
    } catch (e) {
      const apiError = normalizeError(e)

      if (
        apiError.name === 'CanceledError' ||
        apiError.message.includes('canceled')
      ) {
        return
      }

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === pendingId
            ? {
                ...msg,
                isLoading: false,
                isError: true,
                content: apiError.message,
              }
            : msg,
        ),
      )
    } finally {
      isSendingRef.current = false
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  return {
    messages,
    sendMessage,
    isLoading,
  }
}

export default useChat
