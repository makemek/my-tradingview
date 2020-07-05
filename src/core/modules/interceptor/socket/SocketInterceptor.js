import { logger } from 'lib/logger'
import { webSocket } from 'rxjs/webSocket'
import { map } from 'rxjs/operators'

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
    console.log('message', message)
    if (!!this.onmessage && !this._alreadyWrapReceiveEvent) {
      this._wrapOnReceiveMessage(this.onmessage)
    }
    log('send', message)
    // this._filter.apply(SocketInterceptor.SOCKET_SEND, message)
    super.send(message)
  }

  receive(message) {
    console.log('receive', message)
    log('receive', message.data)
    const stream$ = this._filter.apply(
      SocketInterceptor.SOCKET_RECEIVE,
      message.data,
    )
    return stream$.pipe(
      map(({ payload }) => ({ ...message, data: payload }))
    )
  }

  _wrapOnReceiveMessage(functionToWrap) {
    this.onmessage = (message) => {
      const stream$ = this.receive(message)
      stream$.subscribe(processedMessage => {
        console.log(processedMessage)
      })
    }
    this._alreadyWrapReceiveEvent = true
  }
}
