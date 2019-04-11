import { Buffer } from 'buffer'

export default {
  withStringPayload,
  withBufferPayload,
}

export function withStringPayload(payload) {
  return `~m~${payload.length}~m~${payload}`
}

export function withBufferPayload(payload) {
  return Buffer.concat([
    Buffer.from(`~m~${payload.byteLength}~m~`),
    payload,
  ])
}
