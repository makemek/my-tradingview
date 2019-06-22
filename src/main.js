import core from './core'
import example from './interceptor/example'

core.registerMessageEventPlugins([example()])
core.start()
