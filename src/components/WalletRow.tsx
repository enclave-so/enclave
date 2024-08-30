import { Hex } from 'viem'
import { removeWallet } from 'atoms/walletsActions'
import { unmarshal } from 'helpers/secret'
import { useAtom } from 'jotai'
import { useEffect, useId, useState } from 'react'
import Wallet from 'models/Wallet'
import getEmoji from 'helpers/getEmoji'
import getPK from 'helpers/getPK'
import isPrivateKey from 'helpers/isPrivateKey'
import modal from 'helpers/modal'
import router from 'atoms/router'
import selectedAddressAtom from 'atoms/selectedAddress'

export default function ({ wallet }: { wallet: Wallet }) {
  const [, setSelectedAddress] = useAtom(selectedAddressAtom)
  const [, deleteWallet] = useAtom(removeWallet)
  // const [, switchTo] = useAtom(switchWallet)
  const [, setRoute] = useAtom(router)
  const [consent, setConsent] = useState(true)
  const [key, setKey] = useState('')

  useEffect(() => {
    const fetchKey = async () => {
      setKey(await unmarshal(wallet.key))
    }
    fetchKey()
  }, [wallet.key])

  const modalId = useId()

  const close = () => {
    modal(modalId, false)
    setConsent(true)
  }

  const selectWallet = (address: Hex) => {
    modal(modalId, false)
    setSelectedAddress(address)
    setRoute({ path: 'default' })
  }

  const isPK = isPrivateKey(key)

  return (
    <>
      <div className="dropdown">
        <div tabIndex={0} role="button" className="mb-3 text-lg">
          <span className="mr-2 py-1 px-2 bg-amber-100 rounded-md">
            {getEmoji(wallet.address)}
          </span>
          <span className="font-bold">
            {wallet.address.slice(0, 6) + '•••' + wallet.address.slice(-4)}
          </span>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <a
              onClick={() => selectWallet(wallet.address)}
              className="no-underline"
            >
              Switch to
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                navigator.clipboard.writeText(wallet.address)
              }}
              className="no-underline"
            >
              Copy address
            </a>
          </li>
          <li>
            <a onClick={() => modal(modalId, true)} className="no-underline">
              Reveal
            </a>
          </li>
          <li>
            <a
              onClick={() => deleteWallet(wallet.address)}
              className="no-underline"
            >
              Delete
            </a>
          </li>
        </ul>
      </div>

      <br />
      {/* TODO: change cause add additional padding */}

      {/* Reveal modal */}
      <dialog id={modalId} className="modal">
        <div className="modal-box">
          {consent ? (
            <>
              <h3 className="font-bold text-lg mt-0">Before you processed</h3>

              <p class="text-lg leading-relaxed mb-4">
                Never share your Private Key or enter it into any apps.
              </p>
              <p class="text-lg leading-relaxed mb-4">
                Make sure nobody can view your screen when viewing your Private
                Key.
              </p>
              <p class="text-lg leading-relaxed mb-4">
                Anyone with your Private Key can access your entire wallet.
              </p>
              <p class="text-lg leading-relaxed mb-4">
                Enclave team will never ask you for your Private Key.
              </p>
              <button
                class="btn btn-block mt-2"
                onClick={() => setConsent(false)}
              >
                Show Private Key
              </button>
            </>
          ) : (
            <>
              {/* TODO: change text */}
              <h3 className="font-bold text-lg mt-0">Reveal Private Key</h3>

              {isPK ? (
                <>
                  <p class="text-lg leading-relaxed mb-4">Private Key:</p>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    placeholder=""
                  >
                    {key}
                  </textarea>
                </>
              ) : (
                <>
                  <p class="text-lg leading-relaxed mb-4">Recovery phrase:</p>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    placeholder=""
                  >
                    {key}
                  </textarea>
                  <p class="text-lg leading-relaxed mb-4">Private Key:</p>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    placeholder=""
                  >
                    {getPK(key)}
                  </textarea>
                </>
              )}
            </>
          )}
          <button class="btn btn-block mt-2" onClick={close}>
            Close
          </button>
        </div>
      </dialog>
    </>
  )
}
