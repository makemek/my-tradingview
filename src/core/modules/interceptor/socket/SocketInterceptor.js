import debug from 'debug'

const log = debug(`${process.env.APP_NAME}:core:interceptor`)

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
    this._filter.apply(SocketInterceptor.SOCKET_SEND, message)
    super.send(message)
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
