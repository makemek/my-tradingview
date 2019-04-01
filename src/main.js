import SocketMessageHooker from './SocketMessageHooker'
import { Filter } from 'modules/event-hook/filter'

window.WebSocket = injectWebSocket()

function injectWebSocket() {
  const RealSocket = window.WebSocket

  return function(host, ...args) {
    console.log(host)
    const target = 'wss://data.tradingview.com/socket.io/websocket'
    if(host.includes(target)) {
      const filter = new Filter()

      return new SocketMessageHooker(host, filter, ...args)
    }
    return new RealSocket(host, ...args)
  }
}
