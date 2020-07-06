/**
 * An example demonstrates how to implement a plugin which listens to events
 * and do something with it.
 * A plugin is a custom rxjs operator
 */

import { logger } from 'lib/logger'
import { tap } from 'rxjs/operators'

const log = logger('interceptor:example')

/**
 * [description]
 * @param  {[any]} config plugin's configuration
 * @return {[Filter]}
 */
export default (config) => (hook) => {
  // do anything with the config

  // bind to event
  // for ease of use, there is an enum EVENT which contains all available event name
  // For available event, please take a look at src/modules/common/schema/schema.js
  const { qsd } = hook.EVENT
  hook.bind(qsd, (stream$) =>
    stream$.pipe(tap((data) => log('processing qsd', data, config))),
  )
}
