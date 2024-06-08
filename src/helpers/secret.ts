// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/generateKey
// const generateKey = async () => {
//   return window.crypto.subtle.generateKey(
//     {
//       name: 'AES-GCM',
//       length: 256,
//     },
//     true,
//     ['encrypt', 'decrypt']
//   )
// }

// https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder
const encode = (data: string) => {
  const encoder = new TextEncoder()

  return encoder.encode(data)
}

// https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues
const generateIv = () => {
  // https://developer.mozilla.org/en-US/docs/Web/API/AesGcmParams
  return window.crypto.getRandomValues(new Uint8Array(12))
}

// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt
const encrypt = async (data: string, key: CryptoKey) => {
  const encoded = encode(data)
  const iv = generateIv()
  const cipher = await window.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv,
    },
    key,
    encoded
  )

  return {
    cipher,
    iv,
  }
}

//https://developer.mozilla.org/en-US/docs/Glossary/Base64#the_unicode_problem
function pack(bytes: ArrayBuffer) {
  const binString = String.fromCodePoint(...new Uint8Array(bytes))
  return btoa(binString)
}

// From https://developer.mozilla.org/en-US/docs/Glossary/Base64#the_unicode_problem.
function unpack(base64: string) {
  const binString = atob(base64)
  return Uint8Array.from(binString, (m) => m.codePointAt(0)!)
}

// https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder
const decode = (bytestream: AllowSharedBufferSource) => {
  const decoder = new TextDecoder()

  return decoder.decode(bytestream)
}

// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/decrypt
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const decrypt = async (cipher: BufferSource, iv: any, key: CryptoKey) => {
  const encoded = await window.crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: iv,
    },
    key,
    cipher
  )

  return decode(encoded)
}

const marshal = async (data: string) => {
  const key = await defaultKey
  //TODO: dont use default?
  const { cipher, iv } = await encrypt(data, key)

  const packedCipher = pack(cipher)
  const packedIv = pack(iv)

  return `${packedCipher}:${packedIv}`
}

const unmarshal = async (packed: string) => {
  const key = await defaultKey
  //TODO: dont use default?
  const [packedCipher, packedIv] = packed.split(':')

  const cipher = unpack(packedCipher)
  const iv = unpack(packedIv)

  return decrypt(cipher, iv, key)
}

//all users will have same default password
//private keys and mnemonics already unique
//iv is unique for each encryption
//we are not storing passwords hashes
//we no need unique salt to protect against rainbow tables
const salt = new TextEncoder().encode('enclave')
const iterations = 1000
const keyLength = 256 // 256-bit key

const deriveKey = async (password: string) => {
  const baseKey = await window.crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  )
  return window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: iterations,
      hash: 'SHA-256',
    },
    baseKey,
    { name: 'AES-GCM', length: keyLength },
    true,
    ['encrypt', 'decrypt']
  )
}

const defaultKey = deriveKey('H3KKlluyLk8TxGoa') //TODO: move to password + passkeys

export { marshal, unmarshal }
