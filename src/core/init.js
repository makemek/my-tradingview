import { logger } from 'lib/logger'
import { SocketInterceptor } from 'core/modules/interceptor/socket'
import { Filter } from 'core/modules/event-hook/filter'
import { routeMessage } from 'core/modules/message/message-handler'
import { CHART_WEBSOCKET, PRO_CHART_WEBSOCKET } from 'config'

const log = logger('core')

export default function init() {
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
    if (
      host.includes(CHART_WEBSOCKET) ||
      host.includes(PRO_CHART_WEBSOCKET)
    ) {
      const filter = makeFilter()

      log(`inject web socket ${host}`)
      return new SocketInterceptor(
        PRO_CHART_WEBSOCKET,
        filter,
        ...args,
      )
    }

    log(`use real web socket ${host}`)
    return new RealSocket(host, ...args)
  }
}

function makeFilter() {
  const filter = new Filter()
  filter.bind(SocketInterceptor.SOCKET_RECEIVE, routeMessage)
  filter.bind(SocketInterceptor.SOCKET_SEND, routeMessage)

  return filter
}
