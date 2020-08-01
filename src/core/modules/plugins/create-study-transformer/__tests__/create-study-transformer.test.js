import { TestScheduler } from 'rxjs/testing'

import { _handleCreateStudy } from '../create-study-transformer'

describe('modules/plugins/create-study-transformer', () => {
  describe('#_handleCreateStudy', () => {
    let testScheduler

    beforeEach(() => {
      testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expect.objectContaining(expected))
      })
    })

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
        const expectOutput = {
          $inputsDecoded: {
            inputs: studyConfig,
          },
          ...data,
        }

        testScheduler.run((helpers) => {
          const { cold, expectObservable } = helpers
          const stream$ = cold('a|', { a: data })

          const result$ = _handleCreateStudy(stream$)

          expectObservable(result$).toBe('a', { a: expectOutput })
        })
      })
    })
    describe('string input', () => {
      it('should output expected object', () => {
        const studyConfig = { data: true }
        const data = {
          extra: true,
          inputs: studyConfig,
        }
        const expectOutput = {
          $inputsDecoded: {
            inputs: studyConfig,
          },
          ...data,
        }

        testScheduler.run((helpers) => {
          const { cold, expectObservable } = helpers
          const stream$ = cold('a|', { a: data })

          const result$ = _handleCreateStudy(stream$)

          expectObservable(result$).toBe('a', { a: expectOutput })
        })
      })
    })
  })
})
