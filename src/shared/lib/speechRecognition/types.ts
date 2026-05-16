export type UseSpeechRecognitionProps = {
  silenceTimeout?: number
  onResult: (text: string) => void
  onError?: (error: unknown) => void
}
