import { of, encaseP2, tryP, reject } from 'fluture'
import { is } from 'ramda'

import { endpoints } from './api'

const identity = v => v
const fetchf = encaseP2(fetch)

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

const actions = {
  toggleMobileNav: 'ui/MOBILE_TOGGLE',
  setIsScrolled: 'ui/IS_SCROLLED',
  apiStart: 'api/START',
  apiFinish: 'api/FINNISH',
  post: ({ key, resource, values }) => store => {
    of(store.actions.apiStart({ key }))
      .chain(() => encase(JSON.stringify)(values))
      .chain(data =>
        fetchf(endpoints[resource](), {
          headers,
          method: 'POST',
          body: data
        })
      )
      .chain(({ status }) => {
        if (status < 300) {
          return reject(status)
        }
        return of(status)
      })
      .fork(
        error => {
          if (is(Number, error)) {
            return store.actions.apiFinish({ key, status: error })
          }
          return store.actions.apiFinish({ key, status: 500, error })
        },
        status => store.actions.apiFinish({ key, status })
      )
  },
  get: ({ key, resource, params, transform = v => v.data }) => async store => {
    of(store.actions.apiStart({ key }))
      .chain(() => fetchf(endpoints[resource](params), { headers }))
      .chain(response => {
        if (response.status >= 300) {
          return reject({ status })
        }
        return tryP(() => response.json())
      })
      .map(transform)
      .fork(
        error => store.actions.apiFinish({ key, status, error }),
        data => store.actions.apiFinish({ key, status: 200, payload: data })
      )
  }
}

export default actions
