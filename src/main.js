import SocketMessageHooker from './SocketMessageHooker'
import { Filter } from 'modules/event-hook/filter'
import debug from 'debug'

const log = debug(`${process.env.APP_NAME}:main`)

window.WebSocket = injectWebSocket()

function injectWebSocket() {
  const RealSocket = window.WebSocket

  return function(host, ...args) {
    const target =
      'wss://data.tradingview.com/socket.io/websocket'
    if (host.includes(target)) {
      const filter = new Filter()

      log(`inject web socket ${host}`)
      return new SocketMessageHooker(host, filter, ...args)
    }

    log(`use real web socket ${host}`)
    return new RealSocket(host, ...args)
  }
}
