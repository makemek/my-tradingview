import CommandFieldConverter from '../CommandFieldConverter'

describe('modules/command/CommandFieldConverter', () => {
  describe('#toCommandFields', () => {
    describe('command exists', () => {
      it('should return expected field names and its value for sorted field ids', () => {
        const schema = makeSchema({
          name: 'myCommand',
          fields: [
            {
              name: 'field1',
              id: 1,
            },
            {
              name: 'field2',
              id: 2,
            },
            {
              name: 'field3',
              id: 3,
            },
          ],
        })
        const converter = new CommandFieldConverter(schema)
        const command = converter.toCommandFields('myCommand', [
          'value1',
          'value2',
          'value3',
        ])
        expect(command).toEqual({
          field1: 'value1',
          field2: 'value2',
          field3: 'value3',
        })
      })
      it('should return expected field names and its value for unsorted field ids', () => {
        const schema = makeSchema({
          name: 'myCommand',
          fields: [
            {
              name: 'field1',
              id: 1,
            },
            {
              name: 'field3',
              id: 3,
            },
            {
              name: 'field2',
              id: 2,
            },
          ],
        })
        const converter = new CommandFieldConverter(schema)
        const command = converter.toCommandFields('myCommand', [
          'value1',
          'value2',
          'value3',
        ])
        expect(command).toEqual({
          field1: 'value1',
          field2: 'value2',
          field3: 'value3',
        })
      })
    })
    describe('command not exists', () => {
      it('should return null', () => {
        const schema = makeSchema()
        const converter = new CommandFieldConverter(schema)
        const command = converter.toCommandFields(
          '__NO_COMMAND__',
          [],
        )
        expect(command).toBe(null)
      })
    })
    describe('given command does not match with given field array', () => {
      it('should return fields where each field has undefined value', () => {
        const schema = makeSchema({
          name: 'foo',
          fields: [
            { name: 'field1', id: 1 },
            { name: 'field2', id: 2 },
          ],
        })
        const converter = new CommandFieldConverter(schema)
        const commandFields = converter.toCommandFields('foo', [])
        expect(commandFields).toEqual({
          field1: undefined,
          field2: undefined,
        })
      })
    })
  })

  describe('#toFieldArray', () => {
    describe('command exists', () => {
      it('should return expected array', () => {
        const schema = makeSchema({
          name: 'myCommand',
          fields: [
            { name: 'field1', id: 1 },
            { name: 'field2', id: 2 },
            { name: 'field3', id: 3 },
          ],
        })
        const converter = new CommandFieldConverter(schema)
        const result = converter.toFieldArray('myCommand', {
          field1: 'value1',
          field2: 'value2',
          field3: 'value3',
        })
        expect(result).toEqual(['value1', 'value2', 'value3'])
      })
    })
    describe('command not exists', () => {
      it('should return null', () => {
        const schema = makeSchema()
        const converter = new CommandFieldConverter(schema)
        const command = converter.toFieldArray('__NO_COMMAND__', {})
        expect(command).toBe(null)
      })
    })
    describe('given command does not match with given command fields', () => {
      it('should return array where expected element is undefined', () => {
        const schema = makeSchema({
          name: 'foo',
          fields: [
            { name: 'field1', id: 1 },
            { name: 'field2', id: 2 },
          ],
        })
        const converter = new CommandFieldConverter(schema)
        const commandFields = converter.toFieldArray('foo', {
          field1: 'field1Value',
          nope2: 'nope2Value',
        })
        expect(commandFields).toEqual(['field1Value', undefined])
      })
    })
  })

  describe('#toEnum', () => {
    it('should return expected enum', () => {
      const schema = makeSchema(
        {
          name: 'myCommand0',
          fields: [
            { name: 'field1', id: 1 },
            { name: 'field2', id: 2 },
            { name: 'field3', id: 3 },
          ],
        },
        {
          name: 'myCommand1',
          fields: [{ name: 'field1', id: 1 }],
        },
      )

      const converter = new CommandFieldConverter(schema)
      const result = converter.toEnum()
      expect(result.myCommand0).toEqual('myCommand0')
      expect(result.myCommand1).toEqual('myCommand1')
    })
  })

  describe('#getField', () => {
    it('should return expected field', () => {
      const schema = makeSchema(
        {
          name: 'myCommand0',
          fields: [
            { name: 'field1', id: 1 },
            { name: 'field2', id: 2 },
          ],
        },
        {
          name: 'myCommand1',
          fields: [{ name: 'field1', id: 1 }],
        },
      )

      const converter = new CommandFieldConverter(schema)
      const result = converter.getField('myCommand0')
      expect(result).toEqual([
        { name: 'field1', id: 1 },
        { name: 'field2', id: 2 },
      ])
    })
  })
})

function makeSchema(...commands) {
  return {
    package: null,
    syntax: 'proto2',
    messages: commands,
    isNamespace: !0,
  }
}
