import { initTransport } from 'transport/init'
import { useEffect } from 'react'

export default function () {
  useEffect(() => {
    initTransport()
  }, [])
  return <p>It's a iframe</p>
}
