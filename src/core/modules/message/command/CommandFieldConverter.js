class CommandFieldConverter {
  constructor(schema) {
    this._cmdFields = this._command2key(schema)
  }

  toCommandFields(commandName, fieldArray) {
    const output = {}

    if (!this._cmdFields.hasOwnProperty(commandName)) {
      return null
    }
    this._cmdFields[commandName].forEach(({ name, id }) => {
      output[name] = fieldArray[id - 1]
    })

    return output
  }

  toFieldArray(commandName, commandFields) {
    if (!this._cmdFields.hasOwnProperty(commandName)) {
      return null
    }
    const fields = this._cmdFields[commandName]

    return fields.reduce((acc, cur) => {
      const { name, id } = cur
      acc[id - 1] = commandFields[name]
      return acc
    }, [])
  }

  _command2key(model) {
    const reducer = (acc, cur) => {
      const { name, fields } = cur
      acc[name] = fields
      return acc
    }
    return model.messages.reduce(reducer, {})
  }
}

export default CommandFieldConverter
