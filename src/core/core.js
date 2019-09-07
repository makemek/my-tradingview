import init from './init'
import { messageEventPlugin } from './modules/plugins/message-event'
import { createStudyTransformerPlugin } from './modules/plugins/create-study-transformer'

class Core {
  // required plugins
  _plugins = [createStudyTransformerPlugin()]

  start() {
    init()
  }

  registerMessageEventPlugins(plugins) {
    messageEventPlugin(this._plugins.concat(plugins))
  }
}

export default Core
