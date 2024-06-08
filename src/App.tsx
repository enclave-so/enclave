import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Suspense } from 'react'
import { WagmiProvider } from 'wagmi'
import Provider from 'components/Transport'
import RequestApp from 'components/RequestApp'
import RequestSign from 'components/RequestSign'
import Wallets from 'components/Wallets'
import config from 'config'
// import { testApp2 } from 'helpers/secret'

const queryClient = new QueryClient()

const isIFrame =
  window.location !== window.parent.location ||
  window.self !== window.top ||
  window.frameElement

// testApp2() //If used iframe doesnt connect
export default function () {
  if (isIFrame) return <Provider />

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <div className="container mx-auto max-w-sm p-10 prose">
          <Suspense fallback={<p>Loading...</p>}>
            <Wallets />
            <RequestApp />
            {/* TODO: Combine Request cause they overlay now */}
            <RequestSign />
          </Suspense>
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
