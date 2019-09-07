import createStudyTransformer from '../create-study-transformer'

describe('modules/plugins/create-study-transformer', () => {
  describe('#default', () => {
    describe('buffer input', () => {
      it('should output expected object', () => {
        // can't figure out buffer format yet.
        // closest guess
        // <session> <study_name> <parent> <turnaround> <study> <inputs>
        const studyConfig = { data: true }
        const data = {
          inputs: {
            buffer: Buffer.from(
              `\nabc123 s1 s1 s1 myStudy ${JSON.stringify(
                studyConfig,
              )}`,
            ),
          },
        }
        const outputSpy = jest.fn()
        const bindFunc = (event, callback) =>
          outputSpy(callback(data))
        const hook = { bind: bindFunc, EVENT: {} }

        createStudyTransformer()(hook)

        const expectOutput = {
          $inputsDecoded: {
            inputs: studyConfig,
          },
          ...data,
        }
        expect(outputSpy.mock.calls[0][0]).toEqual(expectOutput)
      })
    })
    describe('string input', () => {
      it('should output expected object', () => {
        const studyConfig = { data: true }
        const data = {
          extra: true,
          inputs: studyConfig,
        }
        const outputSpy = jest.fn()
        const bindFunc = (event, callback) =>
          outputSpy(callback(data))
        const hook = { bind: bindFunc, EVENT: {} }

        createStudyTransformer()(hook)

        const expectOutput = {
          $inputsDecoded: {
            inputs: studyConfig,
          },
          ...data,
        }
        expect(outputSpy.mock.calls[0][0]).toEqual(expectOutput)
      })
    })
  })
})
