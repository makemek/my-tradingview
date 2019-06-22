import debug from 'debug'
import { Buffer } from 'buffer'
import { ioFilter } from 'core/modules/common/helpers'
import { compose, decompose } from './payload'
import { isHeartbeat } from './heartbeat'
import { Builder } from './protobuf'
import { CommandFieldConverter } from './command'
import { schema } from 'core/modules/common/schema'

const log = debug(`${process.env.APP_NAME}:core:message`)
const builder = new Builder(schema)
const commandConverter = new CommandFieldConverter(schema)

export function handleStringMessage(message) {
  const messages = decompose.withStringPayload(message)
  const [firstMessage] = messages
  const heartbeatSignature = firstMessage.payload.slice(0, 4)
  if (messages.length === 1 && isHeartbeat(heartbeatSignature)) {
    log('string:heartbeat', heartbeatSignature)
    return ioFilter.apply('heartbeat', heartbeatSignature)
  }
  if (!firstMessage.signature) {
    return message
  }
  const modifiedMessages = messages.map((message) => {
    const { payload } = message
    const { m: command, p: data } = JSON.parse(payload)
    const commandFields = commandConverter.toCommandFields(
      command,
      data,
    )
    const modifiedData = ioFilter.apply(command, commandFields)
    const fieldArray = commandConverter.toFieldArray(
      command,
      modifiedData,
    )
    const inputPayload = JSON.stringify({
      m: command,
      p: fieldArray,
    })
    log('string:decomposed', command, data)
    return compose.withStringPayload(inputPayload)
  })

  return modifiedMessages.join('')
}

export function handleBufferMessage(message) {
  const messages = decompose.withBufferPayload(message)
  const [firstMessage] = messages
  const heartbeatSignature = Buffer.from(
    firstMessage.payload.slice(0, 4),
  ).toString()
  if (messages.length === 1 && isHeartbeat(heartbeatSignature)) {
    log('buffer:heartbeat', heartbeatSignature)
    return ioFilter.apply('heartbeat', heartbeatSignature)
  }
  const modifiedMessages = messages.map((message) => {
    const { payload } = message
    const { command, data } = builder.decode(payload)
    const modifiedData = ioFilter.apply(command, data)
    const inputPayload = builder.encode(command, modifiedData)
    log('buffer:decomposed', command, data)
    return compose.withBufferPayload(inputPayload)
  })

  return Buffer.concat(modifiedMessages)
}
