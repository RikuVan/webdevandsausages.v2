import { of, encaseP2, tryP, reject, encase } from 'fluture'
import { is } from 'ramda'

import { endpoints } from './api'

const fetchf = encaseP2(fetch)

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

const NOTIFICATION_FLASH_TIME = 4000

const actions = {
  toggleMobileNav: 'ui/MOBILE_TOGGLE',
  setIsScrolled: 'ui/IS_SCROLLED',
  apiStart: 'api/START',
  apiFinish: 'api/FINNISH',
  resetApi: 'api/RESET',
  notify: 'notifications/NOTIFY',
  closeNotification: 'notifications/CLOSE',
  changeTab: 'tabs/CHANGE',
  flashNotification: ({ key, message }) => store => {
    store.actions.notify({ key, message })
    setTimeout(() => {
      store.actions.closeNotification({ key })
    }, NOTIFICATION_FLASH_TIME)
  },
  post: ({ key, resource, values, id }) => store => {
    of(store.actions.apiStart({ key }))
      .chain(() => encase(JSON.stringify)(values))
      .chain(data =>
        fetchf(endpoints[resource]({ id }), {
          headers,
          method: 'POST',
          body: data
        })
      )
      .chain(({ status }) => {
        if (status >= 300) {
          return reject(status)
        }
        return of(status)
      })
      .fork(
        error => {
          if (is(Number, error)) {
            store.actions.flashNotification({ key: `${key}Error` })
            return store.actions.apiFinish({ key, status: error })
          }
          store.actions.flashNotification({ key: `${key}Error` })
          return store.actions.apiFinish({ key, status: 500, error })
        },
        status => {
          store.actions.flashNotification({ key: `${key}Success` })
          store.actions.apiFinish({ key, status })
        }
      )
  },
  get: ({ key, resource, id, params, transform = v => v.data }) => store => {
    of(store.actions.apiStart({ key }))
      .chain(() => fetchf(endpoints[resource]({ id, params }), { headers }))
      .chain(response => {
        if (response.status >= 204) {
          return reject({ status })
        }
        return tryP(() => response.json())
      })
      .map(transform)
      .fork(
        error => store.actions.apiFinish({ key, status, error }),
        data => store.actions.apiFinish({ key, status: 200, data })
      )
  },
  delete: ({ key, resource, id, values = {} }) => store => {
    of(store.actions.apiStart({ key }))
      .chain(() => encase(JSON.stringify)(values))
      .chain(data =>
        fetchf(endpoints[resource]({ id }), {
          headers,
          method: 'DELETE',
          body: data
        })
      )
      .chain(response => {
        if (response.status >= 204) {
          return reject({ status })
        }
        return of(response.status)
      })
      .fork(
        error => store.actions.apiFinish({ key, status, error }),
        status => store.actions.apiFinish({ key, status })
      )
  }
}

export default actions
