import { isObservable } from 'rxjs'

import { maybeHeartbeat } from '../message-handler'

describe('#maybeHeartbeat', () => {
  it('is heartbeat message should return observable', (done) => {
    const input = [{ signature: '~m~', payload: '~h~999' }]
    const expectedOutput = { type: 'heartbeat', payload: '~h~999' }

    const result$ = maybeHeartbeat(input)

    expect(isObservable(result$)).toBe(true)
    result$.subscribe((result) => {
      expect(result).toEqual(expectedOutput)
      done()
    })
  })

  it('is NOT heartbeat message should return null', () => {
    const input = [{ signature: '~m~', payload: 'whatever' }]

    const result = maybeHeartbeat(input)

    expect(result).toBeNull()
  })
})