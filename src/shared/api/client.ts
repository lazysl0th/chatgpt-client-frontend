import type { SendMessageResponse } from './contracts/chat'
import { axiosInstance } from './instance'

interface RequestConfig {
  signal?: AbortSignal
}

export const api = {
  chat: {
    async sendMessage(text: string, config?: RequestConfig) {
      const res = await axiosInstance.post<SendMessageResponse>(
        '/chat',
        { text },
        { signal: config?.signal },
      )
      console.log(res)
      return res.data
    },
  },
}
