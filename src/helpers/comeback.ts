import formatURL from 'helpers/formatURL'

export default function (url: string) {
  const referrer = document.referrer
  // referringPage http://localhost:5174/ requestedApp http://localhost:5174
  // trim last slash if needed
  const ref = referrer.endsWith('/') ? referrer.slice(0, -1) : referrer

  if (formatURL(ref) === url) window.close()
}
