import SocketMessageHooker from './SocketMessageHooker'

window.WebSocket = injectWebSocket()

function injectWebSocket() {
  const RealSocket = window.WebSocket

  return function(host, ...args) {
    console.log(host)
    const target = 'wss://data.tradingview.com/socket.io/websocket'
    if(host.includes(target)) {
      return new SocketMessageHooker(host, ...args)
    }
    return new RealSocket(host, ...args)
  }
}
