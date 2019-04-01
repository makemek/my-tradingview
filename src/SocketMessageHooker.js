import { txFilter, rxFilter } from 'modules/event-hook/filter'

export default class SocketMessageHooker extends WebSocket {

  static SOCKET_SEND = 'SEND'
  static SOCKET_RECEIVE = 'RECEIVE'

  constructor(host, filter, ...socketArgs) {
    super(host, ...socketArgs)
    this._alreadyWrapReceiveEvent = false
    this._filter = filter
  }

  send(message) {
    if(!!this.onmessage && !this._alreadyWrapReceiveEvent) {
      this._wrapOnReceiveMessage(this.onmessage)
    }
    console.log('send', message)
    this._filter.apply(this.SOCKET_SEND, message)
    super.send(message)
  }

  receive(message) {
    console.log('receive', message.data)
    const processedMessage = this._filter.apply(this.SOCKET_RECEIVE, message.data)
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
