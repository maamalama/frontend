import { combine, Effect, merge, restore, sample } from 'effector'
import { $myNftAddress } from '../me/myNft'
import { initialized } from '../app'
import { $isAuthor } from '../me/me'

export function createTiedStore<P, D, E, S>(effect: Effect<{ address: string }, D, E>, defaultState: D = null) {
  const $data = restore(effect.doneData, defaultState)
    .reset($myNftAddress.updates)

  const $store = combine({
    data: $data,
    isLoading: effect.pending,
    error: restore(effect.failData, null),
  })

  sample({
    clock: merge([initialized, $myNftAddress.updates]),
    source: $myNftAddress,
    filter: $isAuthor,
    fn: (address) => ({ address }),
    target: effect,
  })

  return $store
}
