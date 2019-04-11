import { Buffer } from 'buffer'

export default {
  withStringPayload,
  withBufferPayload,
}

export function withStringPayload(...payload) {
  return payload
    .map((string) => `~m~${string.length}~m~${string}`)
    .join('')
}

export function withBufferPayload(...payload) {
  const payloadWithSignature = payload.map((buffer) =>
    Buffer.concat([
      Buffer.from(`~m~${buffer.byteLength}~m~`),
      buffer,
    ]),
  )
  return Buffer.concat(payloadWithSignature)
}
