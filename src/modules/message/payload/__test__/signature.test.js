import { getSignatureInfo } from '../signature'

describe('modules/message/payload/signature', () => {
  describe('#getSignatureInfo', () => {
    describe('valid signature', () => {
      it('~m~1234~m~', () => {
        const input = '~m~1234~m~'
        const expectedOutput = {
          text: input,
          length: 1234,
        }

        const output = getSignatureInfo(input)

        expect(output).toEqual(expectedOutput)
      })
      it('~m~1234~m~ANYTHING_BEYOND', () => {
        const input = '~m~1234~m~ANYTHING_BEYOND'
        const expectedOutput = {
          text: input,
          length: 1234,
        }

        const output = getSignatureInfo(input)

        expect(output).toEqual(expectedOutput)
      })
    })
    describe('invalid signature', () => {
      const expectedOutput = {
        text: null,
        length: null,
      }

      it('~m~~m~', () => {
        const input = '~m~~m~'

        const output = getSignatureInfo(input)

        expect(output).toEqual(expectedOutput)
      })

      it('NOT_START_WITH~m~1234~m~', () => {
        const input = 'NOT_START_WITH~m~1234~m~'

        const output = getSignatureInfo(input)

        expect(output).toEqual(expectedOutput)
      })
      it('~m~NOT_NUMBER~m~', () => {
        const input = '~m~NOT_NUMBER~m~'

        const output = getSignatureInfo(input)

        expect(output).toEqual(expectedOutput)
      })
    })
  })
})
