import * as compose from '../compose'
import { TextEncoder, TextDecoder } from 'util'

describe('modules/message/payload/compose', () => {
  describe('#withStringPayload', () => {
    it('should output expected string', () => {
      const inputString = 'thisIsAString'
      const expectedString = `~m~${
        inputString.length
      }~m~${inputString}`

      const outputString = compose.withStringPayload(inputString)

      expect(outputString).toEqual(expectedString)
    })
  })
  describe('#withBufferPayload', () => {
    it('should output expected string', () => {
      const inputString = 'thisIsAString'
      const expectedString = `~m~${
        inputString.length
      }~m~${inputString}`
      const encoder = new TextEncoder()
      const decoder = new TextDecoder()

      const outputBuffer = compose.withBufferPayload(
        encoder.encode(inputString),
      )
      const outputString = decoder.decode(outputBuffer)

      expect(outputString).toEqual(expectedString)
    })
  })
})
