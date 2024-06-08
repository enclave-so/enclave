import { addWallet } from 'atoms/walletsActions'
import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect, useState } from 'react'
import Wallet from 'components/Wallet'
import createKey from 'helpers/createKey'
import modal from 'helpers/modal'
import persist from 'helpers/persist'
import walletsAtom from 'atoms/wallets'

const modalId = 'addWalletModal'
const importModalId = 'importWalletModal'

export default function () {
  const wallets = useAtomValue(walletsAtom)
  const add = useSetAtom(addWallet)

  const [importedKey, setImportedKey] = useState('')
  const [showInvalidKey, setShowInvalidKey] = useState(false)

  useEffect(() => {
    setShowInvalidKey(false)
  }, [importedKey])

  useEffect(() => {
    if (wallets.length === 0) {
      add(createKey())
    }
  }, [wallets, add])

  const openModal = () => {
    modal(modalId, true)
    persist()
  }
  const createNewWallet = () => {
    add(createKey())
    modal(modalId, false)
  }
  const openImportModal = () => {
    modal(modalId, false)
    modal(importModalId, true)
  }

  const handleImportChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!e.target) return
    const target = e.target as HTMLInputElement
    setImportedKey(target.value)
  }

  const importWallet = () => {
    let success = true
    //TODO: refactor this
    try {
      add(importedKey)
    } catch {
      success = false
    }

    if (success) {
      modal(importModalId, false)
      setImportedKey('')
      setShowInvalidKey(false)
    } else {
      setShowInvalidKey(true)
    }
  }
  return (
    <>
      <h1 className="my-4">Wallets</h1>
      {wallets.map((wallet) => (
        <Wallet key={wallet.address} wallet={wallet} />
      ))}
      <button className="btn mt-4 w-full" onClick={openModal}>
        Add another wallet
      </button>
      {/* <br />
      <a
        href="https://demo.enclave.so"
        target="_blank"
        className="font-bold no-underline text-white bg-gray-900 p-3 mt-4 rounded-xl w-full flex items-center justify-center"
      >
        <img
          src="/favicon.ico"
          alt="Boosted by"
          className="inline h-4 mr-2 my-0"
        />
        Boosted by demo.enclave.so
      </a> */}
      {/* Modal */}
      <dialog id={modalId} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mt-0">Add another wallet</h3>
          <button class="btn btn-block mt-2" onClick={createNewWallet}>
            Create a new wallet
          </button>
          <button class="btn btn-block mt-2" onClick={openImportModal}>
            Import Your Wallet
          </button>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      {/* Import wallet */}
      <dialog id={importModalId} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg mt-0">Import wallet</h3>
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Secret recovery (seed) phrase or private key"
            value={importedKey}
            onChange={handleImportChange}
          ></textarea>
          {showInvalidKey && <p className="text-error mt-2">Invalid key</p>}
          <div className="modal-action">
            <button className="btn" onClick={() => modal(importModalId, false)}>
              Close
            </button>
            <button className="btn btn-primary ml-2" onClick={importWallet}>
              Import
            </button>
          </div>
        </div>
      </dialog>
    </>
  )
}
