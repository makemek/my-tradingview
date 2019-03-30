export default class SocketMessageHooker extends WebSocket {
  constructor(host) {
    super(host)
    this._alreadyWrapReceiveEvent = false
  }

  send(message) {
    if(!!this.onmessage && !this._alreadyWrapReceiveEvent) {
      this._wrapOnReceiveMessage(this.onmessage)
    }
    console.log('send', message)
    super.send(message)
  }

  _wrapOnReceiveMessage(functionToWrap) {
    this.onmessage = (message) => {
      console.log('receive', message.data)
      functionToWrap(message)
    }
    this._alreadyWrapReceiveEvent = true
  }
}
