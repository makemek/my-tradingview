import debug from 'debug'
import SocketMessageHooker from './SocketMessageHooker'
import { ioFilter } from 'modules/common/helpers'
import {
  handleStringMessage,
  handleBufferMessage,
} from 'modules/message/message-handler'

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

function makeFilter() {
  const messageHandler = (message) =>
    typeof message === 'string'
      ? handleStringMessage(message)
      : handleBufferMessage(message)
  ioFilter.bind(SocketMessageHooker.SOCKET_RECEIVE, messageHandler)
  ioFilter.bind(SocketMessageHooker.SOCKET_SEND, messageHandler)

  return ioFilter
}
