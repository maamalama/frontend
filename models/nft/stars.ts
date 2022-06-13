import { createEvent, createStore } from 'effector'
import { persist } from 'effector-storage/local'

export const markHolderAsFav = createEvent<string>('mark holder as fav')

export const $stars = createStore<Record<string, boolean>>({})
  .on(markHolderAsFav, (map, address) => {
    return { ...map, [address]: !map[address] }
  })

persist({ store: $stars, key: 'stars' })
