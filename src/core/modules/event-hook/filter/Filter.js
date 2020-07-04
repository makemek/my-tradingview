import defaultTo from 'lodash/defaultTo'
import { Subject } from 'rxjs'
import { map } from 'rxjs/operators'

class Filter {
  eventOperators = {}
  subject = new Subject()

  bind(eventName, callback) {
    const newOperator = makeSafeFilterChainOperator(callback)
    const operators = this.eventOperators[eventName]
    if (!operators) {
      this.eventOperators[eventName] = [newOperator]
    } else {
      operators.push(newOperator)
      this.eventOperators[eventName] = operators
    }
  }

  apply(eventName, message) {
    this.subject.pipe(...this.eventOperators[eventName])
    this.subject.next({
      type: eventName,
      payload: message,
    })
    return this.subject
    // const observerCallbacks = this.observers[eventName]
    // if (observerCallbacks === undefined) {
    //   return message
    // }
    //
    // return observerCallbacks.reduce(
    //   (accumulateMessage, currentObserver) =>
    //     defaultTo(
    //       currentObserver(accumulateMessage),
    //       accumulateMessage,
    //     ),
    //   message,
    // )
  }
}

function makeSafeFilterChainOperator(callback) {
  return map((action) => {
    const { payload } = action
    try {
      const result = callback(payload)
      return {
        ...action,
        payload: defaultTo(result, payload),
      }
    } catch (error) {
      console.error(error)
      return action
    }
  })
}

export default Filter
