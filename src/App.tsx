import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Suspense, useEffect } from 'react'
import { WagmiProvider } from 'wagmi'
import { initTransport } from 'transport/init'
import RequestApp from 'components/RequestApp'
import RequestSign from 'components/RequestSign'
import Wallets from 'components/Wallets'
import config from 'config'

const queryClient = new QueryClient()

export default function () {
  useEffect(() => {
    initTransport()
  }, [])

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
