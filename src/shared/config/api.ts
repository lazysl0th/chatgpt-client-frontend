const isProd = import.meta.env.MODE === 'production'

export const API_URL =
  isProd && import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL
    : 'http://localhost:3001'
export const API_TIMEOUT =
  isProd && import.meta.env.VITE_API_TIMEOUT
    ? import.meta.env.VITE_API_TIMEOUT
    : 15000
