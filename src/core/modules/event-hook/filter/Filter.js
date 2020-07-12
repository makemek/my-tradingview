import { of } from 'rxjs'

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
      action: eventName,
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
