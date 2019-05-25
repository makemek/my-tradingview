import debug from 'debug'
import { Buffer } from 'buffer'
import { ioFilter } from 'modules/common/helpers'
import { compose, decompose } from './payload'
import { isHeartbeat } from './heartbeat'
import { Builder } from './protobuf'
import { CommandFieldConverter, schema } from './command'

const log = debug(`${process.env.APP_NAME}:message-handler`)
const builder = new Builder()
const commandConverter = new CommandFieldConverter(schema)

export function handleStringMessage(message) {
  const messages = decompose.withStringPayload(message)
  const [firstMessage] = messages
  const heartbeatSignature = firstMessage.payload.slice(0, 4)
  if (messages.length === 1 && isHeartbeat(heartbeatSignature)) {
    return ioFilter.apply('heartbeat', heartbeatSignature)
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
    log('decomposed', command, data)
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
    return ioFilter.apply('heartbeat', heartbeatSignature)
  }
  const modifiedMessages = messages.map((message) => {
    const { payload } = message
    const { command, data } = builder.decode(payload)
    const modifiedData = ioFilter.apply(command, data)
    const inputPayload = builder.encode(command, modifiedData)
    log('decomposed', command, data)
    return compose.withBufferPayload(inputPayload)
  })

  return Buffer.concat(modifiedMessages)
}
