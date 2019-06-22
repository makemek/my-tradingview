import init from './init'
import { messageEventPlugin } from './modules/plugins/message-event'

class Core {
  start() {
    init()
  }

  registerMessageEventPlugins(plugins) {
    messageEventPlugin(plugins)
  }
}

export default Core
