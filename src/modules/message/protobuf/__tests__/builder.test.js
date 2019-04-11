import Builder from '../builder'

describe('Builder', () => {
  it('should #encode() and #decode() have expected value', () => {
    const builder = new Builder()
    const msg = {
      session: 'session',
      timezone: 'timezone',
    }
    const encodedMessage = builder.encode(
      'switch_timezone',
      msg,
    )
    const decodedMessage = builder.decode(encodedMessage)

    expect(decodedMessage.command).toEqual(
      'switch_timezone',
    )
    expect(decodedMessage.data).toEqual(msg)
  })
})
