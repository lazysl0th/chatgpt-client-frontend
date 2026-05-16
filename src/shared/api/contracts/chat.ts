export interface SendMessageResponse {
  response: IResponce
}

export type TAuthor = 'assistant' | 'user'

interface IResponce {
  id: string
  content: IResponceContent[]
  role: TAuthor
}

interface IResponceContent {
  text: 'string'
}
