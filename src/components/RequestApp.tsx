import { addApp } from 'atoms/appsActions'
import { useAtom, useSetAtom } from 'jotai'
import { useEffect } from 'react'
import comeback from 'helpers/comeback'
import formatURL from 'helpers/formatURL'
import modal from 'helpers/modal'
import requestedAppAtom from 'atoms/requestedApp'
import track from 'helpers/track'

const modalId = 'requestAppModal'

export default function () {
  const [requestedApp, setRequestedApp] = useAtom(requestedAppAtom)
  const add = useSetAtom(addApp)

  if (requestedApp == null) return null

  useEffect(() => {
    modal(modalId, true)
  }, [requestedApp])

  const close = () => {
    modal(modalId, false)
    setRequestedApp(null)
    comeback(requestedApp)
  }

  const allow = async () => {
    add(requestedApp)
    await track('Allow App', { app: requestedApp })
    close()
  }
  const disallow = () => close()

  return (
    <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        {/* TODO: rewrite text */}
        <h3 className="font-bold text-lg">Request access</h3>
        <p className="py-4 font-bold">{formatURL(requestedApp)}</p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn" onClick={disallow}>
              Disallow
            </button>
            <button className="btn btn-primary ml-2" onClick={allow}>
              Allow
            </button>
          </form>
        </div>
      </div>
    </dialog>
  )
}
