import defaultTo from 'lodash/defaultTo'
import { of } from 'rxjs'
import { map } from 'rxjs/operators'

class Filter {
  eventOperators = {}

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
    const stream$ = of({
      type: eventName,
      payload: message,
    })
    const operators = this.eventOperators[eventName]

    if (!operators) {
      return stream$
    }
    return stream$.pipe(...operators)
  }
}

function makeSafeFilterChainOperator(callback) {
  return map((action) => {
    const { payload } = action
    try {
      const result = callback(payload)
      console.log(action, result)
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
