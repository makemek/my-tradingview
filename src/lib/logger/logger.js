import debug from 'debug'

export default (moduleName) =>
  debug(`${process.env.APP_NAME}:${moduleName}`)
