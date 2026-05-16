import { useRef, useState, useCallback, useEffect } from 'react'
import type { UseSpeechRecognitionProps } from './types'

export const useSpeechRecognition = ({
  silenceTimeout = 1500,
  onResult,
  onError,
}: UseSpeechRecognitionProps) => {
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const accumulatedTextRef = useRef('')
  const [isListening, setIsListening] = useState(false)

  const clearSilenceTimer = () => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current)
      silenceTimerRef.current = null
    }
  }

  const stop = useCallback(() => {
    clearSilenceTimer()
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
    setIsListening(false)
  }, [])

  const startSilenceTimer = useCallback(() => {
    clearSilenceTimer()
    silenceTimerRef.current = setTimeout(() => {
      stop()
    }, silenceTimeout)
  }, [silenceTimeout, stop])

  const start = useCallback(() => {
    if (isListening) return

    const SpeechRecognitionClass =
      window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognitionClass) return

    const recognition = new SpeechRecognitionClass()
    recognition.lang = navigator.language || 'ru-RU'
    recognition.continuous = true

    recognition.interimResults = true

    accumulatedTextRef.current = ''

    recognition.onstart = () => {
      setIsListening(true)
      startSilenceTimer()
    }

    recognition.onresult = (event) => {
      let currentPhrase = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i]
        if (result.isFinal) {
          accumulatedTextRef.current += result[0].transcript + ' '
        } else {
          currentPhrase += result[0].transcript
        }
      }

      const fullText = (accumulatedTextRef.current + currentPhrase).trim()

      if (fullText) {
        onResult(fullText)
      }

      startSilenceTimer()
    }

    recognition.onerror = (event) => {
      if (event.error === 'no-speech') return
      clearSilenceTimer()
      setIsListening(false)
      onError?.(event)
    }

    recognition.onend = () => {
      clearSilenceTimer()
      setIsListening(false)
    }

    recognitionRef.current = recognition
    recognition.start()
  }, [onResult, onError, startSilenceTimer, isListening])

  useEffect(() => {
    return () => clearSilenceTimer()
  }, [])

  return {
    start,
    stop,
    isListening,
  }
}
