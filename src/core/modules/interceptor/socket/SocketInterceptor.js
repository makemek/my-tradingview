import { logger } from 'lib/logger'
import { map, filter } from 'rxjs/operators'

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
    const stream$ = this._filter.apply(
      SocketInterceptor.SOCKET_SEND,
      message,
    )
    stream$
      // .pipe(
      //   filter(({ type }) => type === SocketInterceptor.SOCKET_SEND),
      // )
      .subscribe((action) => {
        console.log('send', action)
      })
    super.send(message)
  }

  receive(message) {
    log('receive', message.data)
    const stream$ = this._filter.apply(
      SocketInterceptor.SOCKET_RECEIVE,
      message.data,
    )
    return stream$.pipe(
      // filter(({ type }) => type === SocketInterceptor.SOCKET_RECEIVE),
      map(({ payload }) => ({ ...message, data: payload })),
    )
  }

  _wrapOnReceiveMessage(functionToWrap) {
    this.onmessage = (message) => {
      const stream$ = this.receive(message)
      stream$.subscribe((action) => {
        console.log('receive', action)
        functionToWrap(message)
      })
    }
    this._alreadyWrapReceiveEvent = true
  }
}
