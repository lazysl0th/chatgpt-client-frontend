import { MessageCircle } from 'lucide-react'

export const Greeting = () => {
  return (
    <div className="flex flex-col items-start gap-5">
      <div className="rounded-lg bg-[var(--button-bg)] p-3">
        <MessageCircle size={20} className="fill-[var(--text)]" />
      </div>

      <h1 className="mb-0 text-3xl font-medium">Hi there!</h1>

      <h2 className="text-4xl font-medium">What would you like to know?</h2>

      <p className="text-sm leading-normal text-slate-300">
        Use one of the most common prompts below
        <br />
        or ask your own question
      </p>
    </div>
  )
}
