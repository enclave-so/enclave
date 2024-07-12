import { useEffect } from 'react'
import './Popup.css'

export default function () {
  useEffect(() => {
    console.log('Hello from the popup!')
  }, [])

  const openWallet = () => {
    window.open('https://wallet.enclave.so', '_blank')
  }

  return (
    <div>
      <button onClick={openWallet}>Open Wallet</button>
    </div>
  )
}
