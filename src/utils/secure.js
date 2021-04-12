import crypto from 'crypto'
import environment from '../globalConfig/environments'

const { algorithm, password, keyLength } = environment
export const encrypt = object => {
  const text = JSON.stringify(object)
  const iv = crypto.randomBytes(parseInt(keyLength, 10))
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(password), iv)
  let encrypted = cipher.update(text)
  encrypted = Buffer.concat([encrypted, cipher.final()])
  return `${iv.toString('hex')}:${encrypted.toString('hex')}`
}

export const decrypt = (text, isText) => {
  const textParts = text.split(':')
  const iv = Buffer.from(textParts.shift(), 'hex')
  const encryptedText = Buffer.from(textParts.join(':'), 'hex')
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(password), iv)
  let decrypted = decipher.update(encryptedText)
  decrypted = Buffer.concat([decrypted, decipher.final()])
  return !isText ? JSON.parse(decrypted.toString()) : decrypted.toString()
}
