import isHeartbeat from '../isHeartbeat'

describe('modules/message/heartbeat', () => {
  describe('#verify', () => {
    describe('valid', () => {
      it('~h~1234', () => {
        const input = '~h~1234'

        const output = isHeartbeat(input)

        expect(output).toBe(true)
      })
      it('~h~1234ANYTHING_BEYOND', () => {
        const input = '~h~1234ANYTHING_BEYOND'

        const output = isHeartbeat(input)

        expect(output).toBe(true)
      })
    })

    describe('invalid', () => {
      it('empty string', () => {
        const input = ''

        const output = isHeartbeat(input)

        expect(output).toBe(false)
      })
      it('~ h ~ 1234', () => {
        const input = '~ h ~ 1234'

        const output = isHeartbeat(input)

        expect(output).toBe(false)
      })
      it('NOT_START_WITH~h~1234', () => {
        const input = 'NOT_START_WITH~h~1234'

        const output = isHeartbeat(input)

        expect(output).toBe(false)
      })
      it('~h~NOT_NUMBER', () => {
        const input = '~h~NOT_NUMBER'

        const output = isHeartbeat(input)

        expect(output).toBe(false)
      })
    })
  })
})
