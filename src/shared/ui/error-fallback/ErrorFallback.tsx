import { RotateCcw, TriangleAlert } from 'lucide-react'
import type { FallbackProps } from 'react-error-boundary'

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const errorMessage =
    error instanceof Error
      ? error.message
      : typeof error === 'object' && error !== null && 'message' in error
        ? String(error.message)
        : 'Unknown error'
  return (
    <div className="flex h-full min-h-[300px] w-full flex-col items-center justify-center gap-4 p-6 text-center">
      <div className="animate-bounce rounded-full border border-red-900/30 bg-red-950/20 p-4 text-3xl text-red-400 select-none">
        <TriangleAlert size={100} />
      </div>

      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-zinc-100">
          {'Something wrong'}
        </h3>
        <p className="max-w-xs rounded border border-zinc-800 bg-zinc-900/50 p-2 font-mono text-xs break-words text-zinc-400">
          {errorMessage}
        </p>
      </div>

      <button
        onClick={resetErrorBoundary}
        className="flex cursor-pointer items-center gap-2 rounded-lg bg-blue-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-800"
      >
        <RotateCcw size={16} />
        Try again
      </button>
    </div>
  )
}

export default ErrorFallback
