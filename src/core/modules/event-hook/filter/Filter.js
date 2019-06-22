class Filter {
  observers = {}

  bind(eventName, callback) {
    const subscribers = this.observers[eventName]
    if (!subscribers) {
      this.observers[eventName] = [callback]
    } else {
      subscribers.push(callback)
      this.observers[eventName] = subscribers
    }
  }

  apply(eventName, message) {
    const observerCallbacks = this.observers[eventName]
    if (observerCallbacks === undefined) {
      return message
    }

    return observerCallbacks.reduce(
      (accumulateMessage, currentObserver) =>
        currentObserver(accumulateMessage),
      message,
    )
  }
}

export default Filter
