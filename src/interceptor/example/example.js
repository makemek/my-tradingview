import debug from 'debug'

const log = debug(`${process.env.APP_NAME}:interceptor:example`)

export default (config) => (hook) => {
  // do anything with the config

  // bind to event
  hook.bind('SOME_EVENT', () => {
    log(config)
  })
}
