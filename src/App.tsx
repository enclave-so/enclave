import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Suspense, useEffect } from 'react'
import { WagmiProvider } from 'wagmi'
import { initTransport } from 'transport/init'
import RequestApp from 'components/RequestApp'
import RequestSign from 'components/RequestSign'
import Router from 'components/Router'
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
            <Router />
            {/* <Wallets /> */}
            <RequestApp />
            <RequestSign />
            {/* TODO: Combine Request cause they overlay now */}
          </Suspense>
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
