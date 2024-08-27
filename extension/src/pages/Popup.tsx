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
    <div className="container">
      <div className="guide">
        <h2>How to use Enclave</h2>
        <ol>
          <li>
            Open any dApp, like{' '}
            <a
              href="https://app.uniswap.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Uniswap
            </a>
          </li>
          <li>
            Click <strong>Connect Wallet</strong> button
          </li>
          <li>
            Choose <strong>Enclave</strong>
          </li>
        </ol>
      </div>
      <button onClick={openWallet}>Open Wallet</button>
    </div>
  )
}
