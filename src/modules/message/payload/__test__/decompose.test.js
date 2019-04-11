import {
  withStringPayload,
  withBufferPayload,
  _withBufferPayload,
} from '../decompose'

describe('modules/message/payload/decompose', () => {
  describe('#withStringPayload', () => {
    describe('valid signature ~m~', () => {
      it('should output exepcted signature and payload', () => {
        const inputPayload = 'thisIsAString'
        const signature = `~m~${inputPayload.length}~m~`
        const expectedOutput = {
          signature,
          payload: inputPayload,
        }

        const output = withStringPayload(
          `${signature}${inputPayload}`,
        )

        expect(output).toEqual(expectedOutput)
      })
    })
    describe('invalid signature ~m~', () => {
      const expectedOutput = {
        signature: null,
        payload: null,
      }

      it('~m~~m~', () => {
        const signature = '~m~~m~'

        const output = withStringPayload(signature)

        expect(output).toEqual(expectedOutput)
      })
      it('~m~NOT_NUMBER~m~', () => {
        const signature = '~m~NOT_NUMBER~m~'

        const output = withStringPayload(signature)

        expect(output).toEqual(expectedOutput)
      })
      it('does not start with ~m~ and end with ~m~', () => {
        const inputPayload = 'thisIsAString'
        const signature = `BROKEN_SIGNATURE~#m ~${
          inputPayload.length
        }~&m&~`

        const output = withStringPayload(
          `${signature}${inputPayload}`,
        )

        expect(output).toEqual(expectedOutput)
      })
    })
  })

  describe('#_withBufferPayload', () => {
    describe('valid signature ~m~', () => {
      it('should output expected signature and payload', () => {
        const inputPayload = Buffer.from('x'.repeat(123)) //payload could be huge, like 40000 bytes
        const signature = Buffer.from(`~m~${inputPayload.length}~m~`)
        const expectedOutput = {
          signature: signature.toString(),
          payload: inputPayload,
        }

        const output = _withBufferPayload(
          Buffer.concat([signature, inputPayload]),
        )

        expect(output).toEqual(expectedOutput)
      })
    })
    describe('invalid signature ~m~', () => {
      const expectedOutput = {
        signature: null,
        payload: null,
      }

      it('~m~~m~', () => {
        const signature = Buffer.from('~m~~m~')

        const output = _withBufferPayload(signature)

        expect(output).toEqual(expectedOutput)
      })
      it('~m~NOT_NUMBER~m~', () => {
        const signature = Buffer.from('~m~NOT_NUMBER~m~')

        const output = _withBufferPayload(signature)

        expect(output).toEqual(expectedOutput)
      })
      it('does not start with ~m~ and end with ~m~', () => {
        const inputPayload = Buffer.from('thisIsAString')
        const signature = Buffer.from(
          `BROKEN_SIGNATURE~#m ~${inputPayload.length}~&m&~`,
        )

        const output = _withBufferPayload(
          Buffer.concat([signature, inputPayload]),
        )

        expect(output).toEqual(expectedOutput)
      })
    })
  })

  describe('#withBufferPayload', () => {
    it('should output expected signature and payload', () => {
      const message1 = Buffer.from('message')
      const message2 = Buffer.from('anotherMessage')
      const signature1 = Buffer.from(`~m~${message1.length}~m~`)
      const signature2 = Buffer.from(`~m~${message2.length}~m~`)
      const inputPayload = Buffer.concat([
        signature1,
        message1,
        signature2,
        message2,
      ])
      const expectedOutput = [
        {
          signature: signature1.toString(),
          payload: message1,
        },
        {
          signature: signature2.toString(),
          payload: message2,
        },
      ]

      const output = withBufferPayload(inputPayload)

      expect(output).toEqual(expectedOutput)
    })
  })
})
