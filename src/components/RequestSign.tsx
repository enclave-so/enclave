import { hexToString } from 'viem'
import { removeSignRequest } from 'atoms/signRequestsActions'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import SignRequest from 'models/SignRequest'
import cx from 'helpers/cx'
import formatNative from 'helpers/formatNative'
import formatTx from 'helpers/formatTx'
import formatURL from 'helpers/formatURL'
import getChain from 'helpers/getChain'
import getEmoji from 'helpers/getEmoji'
import modal from 'helpers/modal'
import personalSign from 'helpers/personalSign'
import sendTransaction from 'helpers/sendTransaction'
import signRequestsAtom from 'atoms/signRequests'
import signResponse from 'atoms/signResponse'
import signTransaction from 'helpers/signTransaction'
import signTypedData from 'helpers/signTypedData'
import track from 'helpers/track'

const modalId = 'requestSignModal'

const dividerClass = cx('divider', 'my-0')
const paramsClass = cx('font-semibold', 'my-0') //TODO: rename

export default function () {
  const [signRequests] = useAtom(signRequestsAtom)
  const [, remove] = useAtom(removeSignRequest) // Removed unused variable '_'
  const [, setSignResponse] = useAtom(signResponse)

  const signRequest = signRequests[0]
  if (signRequest == null) return null

  useEffect(() => {
    modal(modalId, true)
  }, [signRequest])

  const sign = () => {
    switch (signRequest.method) {
      case 'personal_sign':
        return personalSign(signRequest.wallet, signRequest.message)
      case 'eth_signTypedData_v4':
        return signTypedData(signRequest.wallet, signRequest.data)
      case 'eth_signTransaction':
        return signTransaction(
          signRequest.wallet,
          signRequest.chainId,
          signRequest.rawTx
        )
      case 'eth_sendTransaction':
        return sendTransaction(
          signRequest.wallet,
          signRequest.chainId,
          signRequest.rawTx
        )
    }
  }

  const action = async (ok: boolean) => {
    const result = ok ? await sign() : null
    setSignResponse({ id: signRequest.id, result })

    if (ok) {
      //TODO: doesnt comeback if there is an error
      await track('Sign', { method: signRequest.method, app: signRequest.app })
    }

    //close
    remove(signRequest.id)

    if (signRequests.length === 1) {
      //last one
      modal(modalId, false)
    }
  }
  const wallet = signRequest.wallet
  const chain = 'chainId' in signRequest ? getChain(signRequest.chainId) : null

  return (
    <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <Title req={signRequest} />
        <p className={paramsClass}>
          {`Signing with ${getEmoji(wallet)} ${wallet.slice(0, 6)}•••${wallet.slice(-4)}`}
        </p>
        <div className={dividerClass} />
        <p className={paramsClass}>{`App: ${formatURL(signRequest.app)}`}</p>
        <div className={dividerClass} />
        {chain && (
          <>
            <p className={paramsClass}>{`Chain: ${chain.name}`}</p>
            <div className={dividerClass} />
          </>
        )}
        {/* <p className={paramsClass}>{`Request ID: ${signRequest.id}`}</p>
        <div className={dividerClass} /> */}
        <Content req={signRequest} />
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn" onClick={() => action(false)}>
              Deny
            </button>
            <button
              className="btn btn-primary ml-2"
              onClick={() => action(true)}
            >
              Approve
            </button>
          </form>
        </div>
      </div>
    </dialog>
  )
}

const titleClass = cx('font-bold', 'text-lg')

function Title({ req }: { req: SignRequest }) {
  switch (req.method) {
    case 'personal_sign':
      return <h3 className={titleClass}>Message Signing Request</h3>
    case 'eth_signTypedData_v4':
      return <h3 className={titleClass}>Sign typed data</h3>
    case 'eth_signTransaction':
      return <h3 className={titleClass}>Sign transaction</h3>
    case 'eth_sendTransaction':
      return <h3 className={titleClass}>Send transaction</h3>
  }
}

function Content({ req }: { req: SignRequest }) {
  switch (req.method) {
    case 'personal_sign':
      return <PersonalSign req={req} />
    case 'eth_signTypedData_v4':
      return <SignTypedData req={req} />
    case 'eth_signTransaction':
      return <SignTransaction req={req} />
    case 'eth_sendTransaction':
      return <SendTransaction req={req} />
  }
}

function PersonalSign({ req }: { req: SignRequest }) {
  if (req.method !== 'personal_sign') return null

  return (
    <p>
      Message: <br />
      {hexToString(req.message)}
    </p>
  )
}

function SignTypedData({ req }: { req: SignRequest }) {
  if (req.method !== 'eth_signTypedData_v4') return null

  return (
    <p>
      Typed data: <br />
      {req.data}
    </p>
  )
}

function SignTransaction({ req }: { req: SignRequest }) {
  if (req.method !== 'eth_signTransaction') return null

  const tx = formatTx(req.rawTx)
  return (
    <p>
      Transaction <br />
      To: {tx.to} <br />
      <Amount value={tx.value} chainId={req.chainId} />
    </p>
  )
}

function SendTransaction({ req }: { req: SignRequest }) {
  if (req.method !== 'eth_sendTransaction') return null

  const tx = formatTx(req.rawTx)
  return (
    <p>
      Transaction <br />
      To: {tx.to} <br />
      <Amount value={tx.value} chainId={req.chainId} />
    </p>
  )
}

function Amount({
  value,
  chainId,
}: {
  value: bigint | undefined
  chainId: number
}) {
  if (!value) return null
  return (
    <>
      Value: {formatNative(value, chainId)}
      <br />
    </>
  )
}
