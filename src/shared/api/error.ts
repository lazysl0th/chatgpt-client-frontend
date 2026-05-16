import axios from 'axios'

export class ApiError extends Error {
  status?: number

  constructor(message: string, status?: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export function normalizeError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data
    const status = error.response?.status

    let message = error.message || 'API Error'

    if (
      data &&
      typeof data === 'object' &&
      'message' in data &&
      typeof data.message === 'string'
    ) {
      message = data.message
    } else if (typeof data === 'string' && data.trim().length > 0) {
      message = data
    }

    return new ApiError(message, status)
  }

  if (error instanceof Error) {
    return new ApiError(error.message)
  }

  return new ApiError('Unknown error occurred')
}
