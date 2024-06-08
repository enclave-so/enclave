const lsKey = 'trackId'

const generateTrackId = () =>
  `a${Math.random()
    .toString(20)
    .substring(2, 19 + 2)}` //20 symbols long id sort compatible with xid

function trackId() {
  const id = localStorage.getItem(lsKey)
  if (id) return id

  const newId = generateTrackId()
  localStorage.setItem(lsKey, newId)
  return newId
}

export default trackId()
