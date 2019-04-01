class Filter {
  observers = {}

  bind(eventName, callback) {
    this.observers[eventName] = callback
  }

  apply(eventName, message) {
    const observerCallback = this.observers[eventName]
    if (observerCallback === undefined) {
      return message
    }

    return observerCallback(message)
  }
}

export default Filter
