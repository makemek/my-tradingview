import * as compose from '../compose'
import { TextEncoder, TextDecoder } from 'util'

describe('core/modules/message/payload/compose', () => {
  describe('#withStringPayload', () => {
    it('should output expected string', () => {
      const inputString1 = 'thisIsAString1'
      const inputString2 = 'thisIsAString2'
      const expectedString = `~m~${
        inputString1.length
      }~m~${inputString1}~m~${inputString2.length}~m~${inputString2}`

      const outputString = compose.withStringPayload(
        inputString1,
        inputString2,
      )

      expect(outputString).toEqual(expectedString)
    })
  })
  describe('#withBufferPayload', () => {
    it('should output expected string', () => {
      const inputString1 = 'thisIsAString1'
      const inputString2 = 'thisIsAString2'
      const expectedString = `~m~${
        inputString1.length
      }~m~${inputString1}~m~${inputString2.length}~m~${inputString2}`
      const encoder = new TextEncoder()
      const decoder = new TextDecoder()

      const outputBuffer = compose.withBufferPayload(
        encoder.encode(inputString1),
        encoder.encode(inputString2),
      )
      const outputString = decoder.decode(outputBuffer)

      expect(outputString).toEqual(expectedString)
    })
  })
})
