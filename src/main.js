import SocketMessageHooker from './SocketMessageHooker'
import { ioFilter } from 'modules/common/helpers'
import debug from 'debug'
import { Builder } from 'modules/message/protobuf'

const log = debug(`${process.env.APP_NAME}:main`)

window.WebSocket = injectWebSocket()

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

const onReceive = () => (message) => {
  // filter signature out (they use for buffer validation internally) ~m~<messageBufferLength>~m~
  // - <SIGNATURE>heartBeat case
  // - <SIGNATURE>protobuf case
  // - <SIGNATURE>JSON case

  // what to do when get heart beat ~h~1, ~h~2, ~h~3, ...

  // what to do when get json

  // what to do when get protobuf
  if (typeof message === 'object') {
    // const decoded = builder.decode(message)
    // console.log(decoded)
  }
  return message
}

function onSend(message) {
  return message
}

function makeFilter() {
  const builder = new Builder()
  ioFilter.bind(
    SocketMessageHooker.SOCKET_RECEIVE,
    onReceive(builder),
  )
  ioFilter.bind(SocketMessageHooker.SOCKET_SEND, onSend)

  return ioFilter
}
