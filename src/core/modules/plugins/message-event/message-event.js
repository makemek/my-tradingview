import { ioFilter } from 'core/modules/common/helpers'

export default function(plugins) {
  plugins.forEach((plugin) => plugin(ioFilter))
}
