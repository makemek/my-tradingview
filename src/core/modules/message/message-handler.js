import { Buffer } from 'buffer'
import { logger } from 'lib/logger'
import { ioFilter } from 'core/modules/common/helpers'
import pick from 'lodash/pick'
import { of, forkJoin, isObservable } from 'rxjs'
import { map, mergeMap } from 'rxjs/operators'

import { compose, decompose } from './payload'
import { isHeartbeat } from './heartbeat'
import { Builder } from './protobuf'
import { CommandFieldConverter } from './command'
import { schema } from 'core/modules/common/schema'

const log = logger('core:message')
const builder = new Builder(schema)
const commandConverter = new CommandFieldConverter(schema)

export function routeMessage(stream$) {
  return stream$.pipe(
    mergeMap(({ payload }) => {
      if (typeof payload === 'string') {
        return handleStringMessage(payload, stream$)
      }
      return handleBufferMessage(payload, stream$)
    }),
  )
}

export function handleStringMessage(rawMessage) {
  return of(rawMessage).pipe(
    map(function decomposeEmbeddedMessages(embeddedMessages) {
      return decompose.withStringPayload(embeddedMessages)
    }),
    mergeMap(function transformMessages(messages) {
      const heartbeat$ = _maybeHeartbeat(messages)
      if (isObservable(heartbeat$)) {
        return heartbeat$.pipe(
          map(({ payload }) => [compose.withStringPayload(payload)]),
        )
      }

      return forkJoin(
        messages.map((message) => {
          const { payload } = message
          const { m: command, p: data } = JSON.parse(payload)
          const commandFields = commandConverter.toCommandFields(
            command,
            data,
          )
          return ioFilter.apply(command, commandFields).pipe(
            map(({ payload: modifiedData }) => {
              const cleanModifiedData = _cleanForignFields(
                modifiedData,
                command,
              )
              const fieldArray = commandConverter.toFieldArray(
                command,
                cleanModifiedData,
              )
              const inputPayload = JSON.stringify({
                m: command,
                p: fieldArray,
              })
              log('string:decomposed', command, data)
              return compose.withStringPayload(inputPayload)
            }),
          )
        }),
      )
    }),
    map(function combineMessages(messages) {
      return messages.join('')
    }),
  )
}

export function handleBufferMessage(rawMessage) {
  return of(rawMessage).pipe(
    map(function decomposeEmbeddedMessages(embeddedMessages) {
      return decompose.withBufferPayload(embeddedMessages)
    }),
    mergeMap(function transformMessages(messages) {
      const heartbeat$ = _maybeHeartbeat(messages)
      if (isObservable(heartbeat$)) {
        return heartbeat$.pipe(
          map(({ payload }) => [
            compose.withBufferPayload(Buffer.from(payload)),
          ]),
        )
      }

      return forkJoin(
        messages.map((message) => {
          const { payload } = message
          const { command, data } = builder.decode(payload)
          return ioFilter.apply(command, data).pipe(
            map(({ payload: modifiedData }) => {
              const cleanModifiedData = _cleanForignFields(
                modifiedData,
                command,
              )
              const inputPayload = builder.encode(
                command,
                cleanModifiedData,
              )
              log('buffer:decomposed', command, data)
              return compose.withBufferPayload(inputPayload)
            }),
          )
        }),
      )
    }),
    map(function combineMessages(messages) {
      return Buffer.concat(messages)
    }),
  )
}

/**
 * Check for potential messages that could be a heartbeat message format ~h~<number>
 * Command protobuf can't decode it because it doesn't exist in the schema.
 * It has to be processed separately
 *
 * @param  {[Object[]} decomposedMessages decomposed messages
 * @return {[Observable | null]} If heartbeat return observable. Otherwise, null
 */
export function _maybeHeartbeat(decomposedMessages) {
  // all signatures are always in the first message as of now
  const [{ signature, payload }] = decomposedMessages
  const heartbeatMessage = payload.toString()
  const maybeHeartbeatNoSignature =
    !signature && decomposedMessages.length === 1

  if (isHeartbeat(heartbeatMessage) || maybeHeartbeatNoSignature) {
    log('string:heartbeat', heartbeatMessage)
    return ioFilter.apply('heartbeat', heartbeatMessage)
  }

  return null
}

/**
 * Remove fields that maybe generated by Filter's listeners
 * to prevent protobuf error thrown when encoding a message.
 */
function _cleanForignFields(message, command) {
  return pick(
    message,
    commandConverter.getField(command).map(({ name }) => name),
  )
}
