import SocketMessageHooker from './SocketMessageHooker'
import { ioFilter } from 'modules/common/helpers'
import debug from 'debug'
import { Builder } from 'modules/message/protobuf'
import { compose, decompose } from 'modules/message/payload'
import { isHeartbeat } from 'modules/message/heartbeat'
import { Buffer } from 'buffer'

const log = debug(`${process.env.APP_NAME}:main`)

init()

function init() {
  const isBackendSocketConnected = !!window.WSBackendConnection
  window.WebSocket = injectWebSocket()

  // This happends when tradingview backend socket in inline js script executes
  // before this extension finsish loading
  // Too late to inject into backend socket.
  // Usually happends when bundle is large, espicially in dev mode.
  // Because it takes longer time to load the extension.
  // Fortunately, backend socket provide interfaces which we can manually restart the connection
  if (isBackendSocketConnected) {
    log(
      'WSBackendConnection has already connected to websocket. Restart connection for injection',
    )
    window.WSBackendConnection.disconnect()
    window.WSBackendConnection.connect()
  }
}

function injectWebSocket() {
  const RealSocket = window.WebSocket

  return function(host, ...args) {
    const target = 'wss://data.tradingview.com/socket.io/websocket'
    if (host.includes(target)) {
      const filter = makeFilter()

      log(`inject web socket ${host}`)
      return new SocketMessageHooker(host, filter, ...args)
    }

    log(`use real web socket ${host}`)
    return new RealSocket(host, ...args)
  }
}

function handleStringMessage(message) {
  const messages = decompose.withStringPayload(message)
  const [firstMessage] = messages
  const heartbeatSignature = firstMessage.payload.slice(0, 4)
  if (messages.length === 1 && isHeartbeat(heartbeatSignature)) {
    return ioFilter.apply('heartbeat', heartbeatSignature)
  }
  const modifiedMessages = messages.map((message) => {
    const { payload } = message
    const { m: command, p: data } = JSON.parse(payload)
    const modifiedData = ioFilter.apply(command, data)
    const inputPayload = JSON.stringify({
      m: command,
      p: modifiedData,
    })
    log('decomposed', command, data)
    return compose.withStringPayload(inputPayload)
  })

  return modifiedMessages.join('')
}

function handleBufferMessage(message, builder) {
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

function makeFilter() {
  const builder = new Builder()
  const messageHandler = (message) =>
    typeof message === 'string'
      ? handleStringMessage(message)
      : handleBufferMessage(message, builder)
  ioFilter.bind(SocketMessageHooker.SOCKET_RECEIVE, messageHandler)
  ioFilter.bind(SocketMessageHooker.SOCKET_SEND, messageHandler)

  return ioFilter
}
