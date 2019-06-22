import debug from 'debug'

const log = debug(`${process.env.APP_NAME}:interceptor:example`)

export default (config) => (hook) => {
  // do anything with the config

  // bind to event
  // for ease of use, there is an enum EVENT which contains all available event name
  const { qsd } = hook.EVENT
  hook.bind(qsd, (data) => {
    log('processing qsd', data, config)

    // it is a good practice to return filtered data even though we don't do anything to it
    // by default, if nothing is returned, the original data will be passed to the next listener
    return data
  })
}
