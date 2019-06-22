import { Filter } from 'core/modules/event-hook/filter'
import { CommandFieldConverter } from 'core/modules/message/command'
import { schema } from 'core/modules/common/schema'

/**
 * Singleton object for other modules to bind
 * tradingview's command event
 */

class IoFilter extends Filter {
  EVENT = Object.freeze(new CommandFieldConverter(schema).toEnum())
}

export default new IoFilter()
