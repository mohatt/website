export { default as wrapRootElement } from './src/wrapRootElement'

/**
 * Emitts an event with loading state
 *
 * @see ./src/hook/loading
 */
function setLoadingState(state) {
  window.___emitter.emit('___loading', state)
}

export function onPreRouteUpdate() {
  setLoadingState('started')
}

export function onRouteUpdate() {
  setLoadingState('done')
}

export function onRouteUpdateDelayed() {
  setLoadingState('delayed')
}
