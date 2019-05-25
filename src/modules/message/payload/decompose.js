import findIndex from 'lodash/findIndex'
import { Buffer } from 'buffer'
import { getSignatureInfo } from './signature'

export default {
  withStringPayload,
  withBufferPayload,
}

export function withStringPayload(payload) {
  const messages = []
  let nextMessage = payload

  while (nextMessage.length > 0) {
    const message = _withStringPayload(nextMessage)
    const { signature } = message
    if (!signature) {
      messages.push(message)
      break
    } else {
      const { length: payloadLength } = getSignatureInfo(signature)
      message.payload = message.payload.slice(0, payloadLength)
      messages.push(message)

      nextMessage = nextMessage.slice(
        signature.length + payloadLength,
      )
    }
  }

  return messages
}

export function _withStringPayload(payload) {
  const matches = /^~m~(\d+?)~m~/.exec(payload)
  if (!matches) {
    return {
      signature: null,
      payload,
    }
  }
  const [signature] = matches

  return {
    signature,
    payload: payload.substring(signature.length),
  }
}

export function withBufferPayload(buffer) {
  const messages = []
  let nextMessage = buffer

  while (nextMessage.byteLength > 0) {
    const message = _withBufferPayload(nextMessage)
    const { signature } = message
    if (!signature) {
      break
    }
    const { length: payloadLength } = getSignatureInfo(signature)
    message.payload = message.payload.slice(0, payloadLength)
    messages.push(message)

    nextMessage = nextMessage.slice(signature.length + payloadLength)
  }

  return messages
}

export function _withBufferPayload(buffer) {
  const bufferUint8 = Buffer.from(buffer)
  const signature = '~m~'
  const invalidSignature = {
    signature: null,
    payload: null,
  }

  const [sigTiltStart, sigM, sigTiltEnd] = bufferUint8
  const startWithSignature =
    String.fromCharCode(sigTiltStart, sigM, sigTiltEnd) === signature
  if (!startWithSignature) {
    return invalidSignature
  }

  const SIG_TILT_ASCII = 0x7e
  const NUM0_ASCII = 0x30
  const NUM9_ASCII = 0x39
  const sigTiltEndIdx = findIndex(
    bufferUint8,
    (byte) => byte === SIG_TILT_ASCII,
    3,
  )
  const noTiltEnd = sigTiltEndIdx < 0
  const payloadByteSize = bufferUint8.slice(3, sigTiltEndIdx)
  const hasNoNumberInSignature =
    findIndex(
      payloadByteSize,
      (byte) => byte < NUM0_ASCII || byte > NUM9_ASCII,
    ) >= 0
  const hasNoByteSize = payloadByteSize.byteLength === 0
  const endWithSignature =
    String.fromCharCode(
      bufferUint8[sigTiltEndIdx],
      bufferUint8[sigTiltEndIdx + 1],
      bufferUint8[sigTiltEndIdx + 2],
    ) === signature
  if (
    noTiltEnd ||
    !endWithSignature ||
    hasNoNumberInSignature ||
    hasNoByteSize
  ) {
    return invalidSignature
  }

  return {
    signature: bufferUint8.slice(0, sigTiltEndIdx + 3).toString(),
    payload: buffer.slice(sigTiltEndIdx + 3),
  }
}
