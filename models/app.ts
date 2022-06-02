import { createEvent, createStore } from 'effector'

export const init = createEvent()

export const initialized = createStore(false, { name: 'init' })
  .on(init, () => true)
