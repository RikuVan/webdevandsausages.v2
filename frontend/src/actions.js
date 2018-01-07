import { of, encaseP2, tryP, reject, encase } from 'fluture'
import R from './helpers'

import { endpoints } from './api'

const fetchf = encaseP2(fetch)

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

const NOTIFICATION_FLASH_TIME = 5000

const actions = {
  changeTheme: 'ui/CHANGE_THEME',
  toggleMobileNav: 'ui/MOBILE_TOGGLE',
  setIsScrolled: 'ui/IS_SCROLLED',
  apiStart: 'api/START',
  apiFinish: 'api/FINNISH',
  resetApi: 'api/RESET',
  notify: 'notifications/NOTIFY',
  closeNotification: 'notifications/CLOSE',
  setAuth: 'auth/SET_AUTH',
  flashNotification: ({
    key,
    message,
    notificationTime = NOTIFICATION_FLASH_TIME
  }) => store => {
    store.actions.notify({ key, message })
    setTimeout(() => {
      store.actions.closeNotification({ key })
    }, notificationTime)
  },
  post: ({ key, resource, values, id }) => store => {
    of(store.actions.apiStart({ key }))
      .chain(() => encase(JSON.stringify)(values))
      .chain(data =>
        fetchf(endpoints[resource]({ id }), {
          credentials: 'include',
          headers,
          method: 'POST',
          body: data
        })
      )
      .chain(res => {
        if (res.status >= 300) {
          return reject(res.status)
        }
        return tryP(() => res.json())
      })
      .fork(
        error => {
          if (R.is(Number, error)) {
            store.actions.flashNotification({ key: `${key}Error` })
            return store.actions.apiFinish({ key, status: error })
          }
          store.actions.flashNotification({ key: `${key}Error` })
          return store.actions.apiFinish({ key, status: 500, error })
        },
        data => {
          store.actions.flashNotification({ key: `${key}Success` })
          store.actions.apiFinish({ key, status: 201, data })
          if (key === 'auth') {
            store.actions.setAuth({
              user: R.pathOr(null, ['data', 'name'], data)
            })
          }
        }
      )
  },
  get: ({
    key,
    resource,
    id,
    params,
    transform = v => v.data,
    notificationTime
  }) => store => {
    of(store.actions.apiStart({ key: key || resource }))
      .chain(() =>
        fetchf(endpoints[resource]({ id, params }), {
          headers,
          credentials: 'include'
        })
      )
      .chain(response => {
        if (response.status >= 204) {
          return reject({ status })
        }
        return tryP(() => response.json())
      })
      .map(transform)
      .fork(
        error => {
          store.actions.flashNotification({
            key: `${key}Error`,
            notificationTime
          })
          store.actions.apiFinish({ key: key || resource, status, error })
        },
        data => {
          store.actions.flashNotification({
            key: `${key}Success`,
            notificationTime
          })
          store.actions.apiFinish({ key: key || resource, status: 200, data })
          if (key === 'auth') {
            store.actions.setAuth({
              user: data.name,
              admin: data.admin,
              loggedIn: true
            })
          }
        }
      )
  },
  delete: ({ key, resource, id, values = {} }) => store => {
    of(store.actions.apiStart({ key: key || resource }))
      .chain(() => encase(JSON.stringify)(values))
      .chain(data =>
        fetchf(endpoints[resource]({ id }), {
          headers,
          method: 'DELETE',
          body: data,
          credentials: 'include'
        })
      )
      .chain(response => {
        if (response.status >= 204) {
          return reject({ status })
        }
        return of(response.status)
      })
      .fork(
        error =>
          store.actions.apiFinish({ key: key || resource, status, error }),
        status => {
          store.actions.apiFinish({ key: key || resource, status })
          if (key === 'auth') {
            store.actions.setAuth({ user: null, admin: null })
          }
        }
      )
  }
}

export default actions
