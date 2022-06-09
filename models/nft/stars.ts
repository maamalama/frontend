import { createEvent, createStore } from 'effector'
import { persist } from 'effector-storage/local'

export const markHolderAsFav = createEvent<string>('mark holder as fav')

export const $stars = createStore({})

persist({ store: $stars, key: 'stars' })

$stars.on(markHolderAsFav, (map, address) => {
  return { ...map, [address]: !map[address] }
})
