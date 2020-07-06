/**
 * Listening for 'create_study' event.
 *
 * Decode buffer of 'inputs' field categorize each field on to '$inputsDecoded'
 * so that plugin implementers doesn't have to decode it by themselves.
 */

import { Buffer } from 'buffer'
import { map } from 'rxjs/operators'
//--
import { logger } from 'lib/logger'

const log = logger('core:plugins:create-study-transformer')

export default () => (hook) => {
  const { create_study } = hook.EVENT

  hook.bind(create_study, _handleCreateStudy)
}

export function _handleCreateStudy(stream$) {
  return stream$.pipe(
    map((data) => {
      // the 'inputs' have the same format as 'create_study' protobuf implicitly
      const { inputs } = data
      const createStudyModel = {
        session: undefined,
        study_name: undefined,
        turnaround: undefined,
        parent: undefined,
        study: undefined,
        inputs: undefined,
      }

      if (inputs.buffer) {
        const inputString = Buffer.from(inputs.buffer).toString()

        data.$inputsDecoded = {
          ...createStudyModel,
          ...tokenize(inputString),
        }
        log('transform', inputString, data.$inputsDecoded)
        return data
      }
      data.$inputsDecoded = {
        ...createStudyModel,
        inputs: data.inputs,
      }
      return data
    }),
  )
}

function tokenize(str) {
  const body = str.split('\n')[1]
  const inputs = JSON.parse(body.match(/{.*}/))

  // TODO support other fields embedded in 'inputs'
  return {
    session: undefined,
    study_name: undefined,
    turnaround: undefined,
    parent: undefined,
    study: undefined,
    inputs,
  }
}
