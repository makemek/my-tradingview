import protobuf from 'protobufjs'

class Builder {
  constructor(protobufSchema) {
    this._protoMessage = protobuf.loadJson(protobufSchema).build()
    this._Msg = this._protoMessage.Msg
    this._commandByNumber = []

    for (const message in this._protoMessage) {
      this._commandByNumber[this._Msg.Commands[message]] = message
    }
  }

  decode(buffer) {
    const { command_number, data, time } = this._Msg.decode(buffer)
    const command = this._commandByNumber[command_number]

    return {
      command,
      data: this._protoMessage[command].decode(data),
      time,
    }
  }

  encode(command_number, data) {
    return this._Msg
      .encode({
        command_number,
        data: this._protoMessage[command_number].encode(data),
      })
      .toBuffer()
  }
}

export default Builder
