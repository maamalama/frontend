import { createEffect, createStore } from 'effector'
import { BASE_URL } from '../../data/constants'

export const $me = createStore({ role: 'author' }) // fixme

export const $isAuthor = $me.map(me => me.role === 'author')
export const $isHolder = $me.map(me => me.role === 'holder')
export const $isGuest = $me.map(me => !me.role)

export const sendProfile = createEffect({
  name: 'send profile',
  async handler(data: { signature: string, payload: { nft: string, holder: string, twitter: any }}) {
    return await fetch(`${BASE_URL}/profile/update`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    })
  }
})
