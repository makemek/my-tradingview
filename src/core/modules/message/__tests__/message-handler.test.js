import { TestScheduler } from 'rxjs/testing'

import { _maybeHeartbeat } from '../message-handler'

describe('#_maybeHeartbeat', () => {
  let testScheduler

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected)
    })
  })

  it('is heartbeat string message should return observable', () => {
    const input = [{ signature: '~m~', payload: '~h~999' }]
    const expectedOutput = { action: 'heartbeat', payload: '~h~999' }

    testScheduler.run(({ expectObservable }) => {
      const result$ = _maybeHeartbeat(input)
      expectObservable(result$).toBe('(a|)', { a: expectedOutput })
    })
  })

  it('is heartbeat buffer message should return observable', () => {
    const input = [
      {
        signature: '~m~',
        payload: new Uint8Array(Buffer.from('~h~999')),
      },
    ]
    const expectedOutput = { action: 'heartbeat', payload: '~h~999' }

    testScheduler.run(({ expectObservable }) => {
      const result$ = _maybeHeartbeat(input)
      expectObservable(result$).toBe('(a|)', { a: expectedOutput })
    })
  })

  it('is NOT heartbeat message should return null', () => {
    const input = [{ signature: '~m~', payload: 'whatever' }]

    const result = _maybeHeartbeat(input)

    expect(result).toBeNull()
  })
})
