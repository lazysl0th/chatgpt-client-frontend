import { normalizeError } from './error'
import { API_TIMEOUT, API_URL } from '@shared/config/api'
import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(normalizeError(error))
  },
)
