import { createStore } from 'effector'

export const $me = createStore({ role: 'author' }) // fixme

export const $isAuthor = $me.map(me => me.role === 'author')
export const $isHolder = $me.map(me => me.role === 'holder')
export const $isGuest = $me.map(me => !me.role)
