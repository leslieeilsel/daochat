import { defineStore } from 'pinia'

function buf2hex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function hex2buf(hex) {
  const bytes = new Uint8Array(hex.length / 2)
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16)
  }
  return bytes
}

async function deriveKey(passphrase, salt) {
  const enc = new TextEncoder()
  const pass = enc.encode(passphrase)
  const baseKey = await crypto.subtle.importKey('raw', pass, 'PBKDF2', false, [
    'deriveKey',
  ])
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  )
}

export const useConfigStore = defineStore('config', {
  state: () => ({ apiKey: null }),
  actions: {
    async setApiKey(passphrase, key) {
      const enc = new TextEncoder()
      const iv = crypto.getRandomValues(new Uint8Array(12))
      const salt = crypto.getRandomValues(new Uint8Array(16))
      const cryptoKey = await deriveKey(passphrase, salt)
      const data = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        cryptoKey,
        enc.encode(key)
      )
      const record =
        buf2hex(salt) + ':' + buf2hex(iv) + ':' + buf2hex(data)
      localStorage.setItem('api', record)
      this.apiKey = key
    },
    async unlock(passphrase) {
      const record = localStorage.getItem('api')
      if (!record) return false
      const [saltHex, ivHex, dataHex] = record.split(':')
      const salt = hex2buf(saltHex)
      const iv = hex2buf(ivHex)
      const data = hex2buf(dataHex)
      const cryptoKey = await deriveKey(passphrase, salt)
      try {
        const dec = await crypto.subtle.decrypt(
          { name: 'AES-GCM', iv },
          cryptoKey,
          data
        )
        const decoder = new TextDecoder()
        this.apiKey = decoder.decode(dec)
        return true
      } catch (e) {
        console.error(e)
        return false
      }
    },
  },
})
