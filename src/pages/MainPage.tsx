import { ErrorFallback } from '@shared/ui'
import { Chat } from '@widgets/chat'
import { ErrorBoundary } from 'react-error-boundary'

const MainPage = () => {
  return (
    <main className="mx-auto flex h-svh w-full flex-col px-8 py-4 md:px-16 md:py-8">
      <section className="flex min-h-0 flex-1">
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => {
            window.location.reload()
          }}
        >
          <Chat />
        </ErrorBoundary>
      </section>
    </main>
  )
}

export default MainPage
