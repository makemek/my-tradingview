import { logger } from 'lib/logger'
import { webSocket } from 'rxjs/webSocket'
import { map } from 'rxjs/operators'

const log = logger('core:interceptor')

export default class SocketInterceptor extends WebSocket {
  static SOCKET_SEND = 'SOCKET_SEND'
  static SOCKET_RECEIVE = 'SOCKET_RECEIVE'

  constructor(host, filter, ...socketArgs) {
    super()
    this._socketSubject = webSocket(host, ...socketArgs)
    this._alreadyWrapReceiveEvent = false
    this._filter = filter
  }

  send(message) {
    if (!!this.onmessage && !this._alreadyWrapReceiveEvent) {
      this._wrapOnReceiveMessage(this.onmessage)
    }
    log('send', message)
    const stream$ = this._filter.apply(SocketInterceptor.SOCKET_SEND, message)
    stream$.subscribe(message => this._socketSubject.next(message))
  }

  receive(message) {
    log('receive', message.data)
    const stream$ = this._filter.apply(
      SocketInterceptor.SOCKET_RECEIVE,
      message.data,
    )
    return stream$.pipe(
      map(processedMessage => ({ ...message, data: processedMessage }))
    )
  }

  _wrapOnReceiveMessage(functionToWrap) {
    this.onmessage = (message) => {
      const stream$ = this.receive(message)
      stream$.subscribe(processedMessage => functionToWrap(processedMessage))
    }
    this._alreadyWrapReceiveEvent = true
  }
}
