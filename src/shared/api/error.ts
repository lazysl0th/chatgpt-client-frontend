import axios from 'axios'

export class ApiError extends Error {
  status?: number

  static readonly MESSAGES = {
    TIMEOUT: 'The server is taking too long to respond. Please try again.',
    NETWORK:
      'Failed to connect to the server. Please check your internet connection.',
    BAD_REQUEST: 'Invalid data transmitted.',
    NOT_FOUND: 'The requested resource was not found.',
    TOO_MANY_REQUESTS:
      'Too many requests. Please wait a moment before trying again.',
    SERVER_ERROR:
      'An internal server error occurred. We are working to fix it!',
    DEFAULT_SERVER:
      'Failed to get a response from the server. Please try again later.',
    UNKNOWN: 'An unexpected error occurred. Please try again later.',
  } as const

  static readonly STATUS_MAP: Record<number, string> = {
    400: ApiError.MESSAGES.BAD_REQUEST,
    404: ApiError.MESSAGES.NOT_FOUND,
    429: ApiError.MESSAGES.TOO_MANY_REQUESTS,
  }

  constructor(message: string, status?: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export function normalizeError(error: unknown): ApiError {
  if (!axios.isAxiosError(error)) {
    if (error instanceof Error) return new ApiError(error.message)
    return new ApiError(ApiError.MESSAGES.UNKNOWN)
  }

  const data = error.response?.data
  const status = error.response?.status

  if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
    return new ApiError(ApiError.MESSAGES.TIMEOUT, status)
  }
  if (error.message === 'Network Error') {
    return new ApiError(ApiError.MESSAGES.NETWORK, status)
  }

  if (
    data &&
    typeof data === 'object' &&
    'message' in data &&
    typeof data.message === 'string' &&
    data.message.trim()
  ) {
    return new ApiError(data.message, status)
  }
  if (typeof data === 'string' && data.trim().length > 0) {
    return new ApiError(data, status)
  }

  if (status) {
    if (ApiError.STATUS_MAP[status]) {
      return new ApiError(ApiError.STATUS_MAP[status], status)
    }
    if (status >= 500) {
      return new ApiError(ApiError.MESSAGES.SERVER_ERROR, status)
    }
  }

  return new ApiError(ApiError.MESSAGES.DEFAULT_SERVER, status)
}
