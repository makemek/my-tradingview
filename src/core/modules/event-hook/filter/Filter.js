import defaultTo from 'lodash/defaultTo'
import { of } from 'rxjs'
import { map } from 'rxjs/operators'

class Filter {
  eventOperators = {}

  bind(eventName, newOperator) {
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

export default Filter
