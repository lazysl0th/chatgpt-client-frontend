export interface ErrorFallbackProps {
  error: Error
  resetErrorBoundary: () => void
  title?: string
}
