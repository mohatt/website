import { ICONS } from '../constants'

const getIcon = name => {
  if (typeof ICONS[name] === 'undefined') {
    throw new Error(`Undefined icon "${name}".`)
  }

  return ICONS[name]
}

export default getIcon
