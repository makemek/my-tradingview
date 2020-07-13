import { map } from 'rxjs/operators'
import { TestScheduler } from 'rxjs/testing'

import Filter from '../Filter'

describe('Filter', () => {
  describe('#bind', () => {
    describe('bind event to a new eventOperator', () => {
      it('should put expected event name and operator in eventOperators', () => {
        const filter = new Filter()
        const operator1 = () => 'rxjs custom operator1'
        const operator2 = () => 'rxjs custom operator2'
        const operator3 = () => 'rxjs custom operator3'

        filter.bind('event1', operator1)
        filter.bind('event2', operator2)
        filter.bind('event3', operator3)

        expect(filter.eventOperators).toEqual({
          event1: [operator1],
          event2: [operator2],
          event3: [operator3],
        })
      })
    })

    describe('bind event to an existing eventOperator', () => {
      it('should append eventOperator', () => {
        const filter = new Filter()
        const exsistingCallback = () => 'existingCallback'
        const newCallback = () => 'newCallback'
        filter.eventOperators = {
          existingEvent: [exsistingCallback],
        }

        filter.bind('existingEvent', newCallback)

        expect(filter.eventOperators).toEqual({
          existingEvent: [exsistingCallback, newCallback],
        })
      })
    })
  })

  describe('#apply', () => {
    let testScheduler

    beforeEach(() => {
      testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected)
      })
    })

    describe('no observer', () => {
      it('should return the same message as passed in the parameter', () => {
        const filter = new Filter()
        const inputMessage = 'inputMessage'
        const expectedMessage = inputMessage
        testScheduler.run(({ expectObservable }) => {
          const stream$ = filter.apply('anEvent', inputMessage)
          expectObservable(stream$).toBe('(a|)', {
            a: expectedMessage,
          })
        })
      })
    })

    describe('has observer and event match with what observer subscribe', () => {
      it('should call expected observer with expected message', () => {
        const filter = new Filter()
        const operator = (stream$) =>
          stream$.pipe(
            map(() => ({
              action: 'shouldTriggerEvent',
              payload: 'appliedMessage',
            })),
          )
        const expectedOutput = {
          action: 'shouldTriggerEvent',
          payload: 'appliedMessage',
        }
        filter.eventOperators = {
          shouldNotTriggerEvent: [
            () => 'shouldNotTriggerThisCallback',
          ],
          shouldTriggerEvent: [operator],
        }

        testScheduler.run(({ expectObservable }) => {
          const stream$ = filter.apply(
            'shouldTriggerEvent',
            'message2Apply',
          )

          expectObservable(stream$).toBe('(a|)', {
            a: expectedOutput,
          })
        })
      })
    })

    describe('has obsesrver and no event match with what observer subscribe', () => {
      it('should return the same message as passsed in the parameter', () => {
        const filter = new Filter()
        const inputMessage = 'inputMessage'
        const expectedOutput = inputMessage
        filter.eventOperators = {
          event1: [() => 'shouldNotTriggerThisCallback'],
          event2: [() => 'shouldNotTriggerThisCallback'],
          event3: [() => 'shouldNotTriggerThisCallback'],
        }

        testScheduler.run(({ expectObservable }) => {
          const stream$ = filter.apply(
            'nonExistingEvent',
            inputMessage,
          )

          expectObservable(stream$).toBe('(a|)', {
            a: expectedOutput,
          })
        })
      })
    })
  })
})
