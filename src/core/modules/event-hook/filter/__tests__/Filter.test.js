import Filter from '../Filter'

describe.skip('Filter', () => {
  describe('#bind', () => {
    describe('bind event to a new observer', () => {
      it('should put expected event name and callback in observers', () => {
        const filter = new Filter()
        const callback1 = () => 'callback1'
        const callback2 = () => 'callback2'
        const callback3 = () => 'callback3'

        filter.bind('event1', callback1)
        filter.bind('event2', callback2)
        filter.bind('event3', callback3)

        expect(filter.observers).toEqual({
          event1: [callback1],
          event2: [callback2],
          event3: [callback3],
        })
      })
    })

    describe('bind event to an existing observer', () => {
      it('should append observer', () => {
        const filter = new Filter()
        const exsistingCallback = () => 'existingCallback'
        const newCallback = () => 'newCallback'
        filter.observers = {
          existingEvent: [exsistingCallback],
        }

        filter.bind('existingEvent', newCallback)

        expect(filter.observers).toEqual({
          existingEvent: [exsistingCallback, newCallback],
        })
      })
    })
  })

  describe('#apply', () => {
    describe('no observer', () => {
      it('should return the same message as passed in the parameter', () => {
        const filter = new Filter()
        const inputMessage = 'inputMessage'

        const appliedMessage = filter.apply('anEvent', inputMessage)

        expect(appliedMessage).toEqual(inputMessage)
      })
    })

    describe('has observer and event match with what observer subscribe', () => {
      it('should call expected observer with expected message', () => {
        const filter = new Filter()
        const message = 'message2Apply'
        const expectedObserverMessage = 'appliedMessage'
        const observerCallback = jest
          .fn()
          .mockReturnValue(expectedObserverMessage)
        filter.observers = {
          shouldNotTriggerEvent: [
            () => 'shouldNotTriggerThisCallback',
          ],
          shouldTriggerEvent: [observerCallback],
        }

        const appliedMessage = filter.apply(
          'shouldTriggerEvent',
          message,
        )

        expect(appliedMessage).toEqual(expectedObserverMessage)
        expect(observerCallback.mock.calls.length).toBe(1)
        expect(observerCallback).toBeCalledWith(message)
      })

      it('should pass processed value to next observer', () => {
        const filter = new Filter()
        const message = 'message2Apply'
        const observer1 = (msg) => msg
        const observer2 = () => {} // only subscribes, and not return any data
        const observer3 = (msg) => msg

        filter.observers = {
          shouldTriggerEvent: [observer1, observer2, observer3],
        }

        const appliedMessage = filter.apply(
          'shouldTriggerEvent',
          message,
        )

        expect(appliedMessage).toEqual(message)
      })
    })

    describe('has obsesrver and no event match with what observer subscribe', () => {
      it('should return the same message as passsed in the parameter', () => {
        const filter = new Filter()
        const inputMessage = 'inputMessage'
        filter.observers = {
          event1: [() => 'shouldNotTriggerThisCallback'],
          event2: [() => 'shouldNotTriggerThisCallback'],
          event3: [() => 'shouldNotTriggerThisCallback'],
        }

        const appliedMessage = filter.apply(
          'nonExistingEvent',
          inputMessage,
        )

        expect(appliedMessage).toEqual(inputMessage)
      })
    })
  })
})
