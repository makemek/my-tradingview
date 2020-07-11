import { isObservable } from 'rxjs'

import { _maybeHeartbeat } from '../message-handler'

describe('#_maybeHeartbeat', () => {
  it('is heartbeat string message should return observable', (done) => {
    const input = [{ signature: '~m~', payload: '~h~999' }]
    const expectedOutput = { type: 'heartbeat', payload: '~h~999' }

    const result$ = _maybeHeartbeat(input)

    expect(isObservable(result$)).toBe(true)
    result$.subscribe((result) => {
      expect(result).toEqual(expectedOutput)
      done()
    })
  })

  it('is heartbeat buffer message should return observable', (done) => {
    const input = [
      {
        signature: '~m~',
        payload: new Uint8Array(Buffer.from('~h~999')),
      },
    ]
    const expectedOutput = { type: 'heartbeat', payload: '~h~999' }

    const result$ = _maybeHeartbeat(input)

    expect(isObservable(result$)).toBe(true)
    result$.subscribe((result) => {
      expect(result).toEqual(expectedOutput)
      done()
    })
  })

  it('is NOT heartbeat message should return null', () => {
    const input = [{ signature: '~m~', payload: 'whatever' }]

    const result = _maybeHeartbeat(input)

    expect(result).toBeNull()
  })
})
