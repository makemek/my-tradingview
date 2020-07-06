import { logger } from 'lib/logger'

const log = logger('core:interceptor')

export default class SocketInterceptor extends WebSocket {
  static SOCKET_SEND = 'SOCKET_SEND'
  static SOCKET_RECEIVE = 'SOCKET_RECEIVE'

  constructor(host, filter, ...socketArgs) {
    super(host, ...socketArgs)
    this._alreadyWrapReceiveEvent = false
    this._filter = filter
  }

  send(message) {
    if (!!this.onmessage && !this._alreadyWrapReceiveEvent) {
      this._wrapOnReceiveMessage(this.onmessage)
    }
    log('send', message)
    try {
      // some commands don't match with command schema such as quote_add_symbols.
      // When filtered, it sends to server with some fields missing.
      // The server sent no response cause the app to hang.
      // Filtering for sending messages won't be supported for now.
      // const processedMessage = this._filter.apply(SocketInterceptor.SOCKET_SEND, message)
      super.send(message)
    } catch (error) {
      // for any unhandled messages sent from tradingview's app
      log('send:filter-error', error)
      super.send(message)
    }
  }

  receive(message) {
    log('receive', message.data)
    const processedMessage = this._filter.apply(
      SocketInterceptor.SOCKET_RECEIVE,
      message.data,
    )
    return { ...message, data: processedMessage }
  }

  _wrapOnReceiveMessage(functionToWrap) {
    this.onmessage = (message) => {
      const processedMessage = this.receive(message)
      functionToWrap(processedMessage)
    }
    this._alreadyWrapReceiveEvent = true
  }
}
