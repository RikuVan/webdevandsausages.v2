import { of, encaseP2, tryP, reject, encase } from 'fluture'
import R from './helpers'
import Event from './Event'
import isWithinRange from 'date-fns/is_within_range'
import isBefore from 'date-fns/is_before'
import addHours from 'date-fns/add_hours'

import { endpoints } from './api'

const getIsEventOpen = ({ datetime }) =>
  isBefore(new Date(), addHours(datetime, 24))

const getIsRegistrationOpen = event => {
  if (event.registrationOpens) {
    const endDate = event.registrationCloses
      ? event.registrationCloses
      : new Date(8640000000000000)
    return isWithinRange(new Date(), event.registrationOpens, endDate)
  }
  return false
}

const fetchf = encaseP2(fetch)

const handleResponse = minStatus => response => {
  if (response.status >= minStatus) {
    return reject({ error: response.error })
  }
  return tryP(() => response.json())
}

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

const NOTIFICATION_FLASH_TIME = 5000

const actions = {
  changeTheme: 'ui/CHANGE_THEME',
  toggleMobileNav: 'ui/MOBILE_TOGGLE',
  toggleSidebar: 'ui/SIDE_TOGGLE',
  setIsScrolled: 'ui/IS_SCROLLED',
  apiStart: 'api/START',
  apiFinish: 'api/FINISH',
  eventFinish: 'event/FINISH',
  eventFetching: 'event/FETCHING',
  resetApi: 'api/RESET',
  notify: 'notifications/NOTIFY',
  closeNotification: 'notifications/CLOSE',
  closePopupNotification: 'popup/CLOSE',
  setAuth: 'auth/SET_AUTH',
  broadcastNotification: ({
    key,
    status,
    notificationTime = NOTIFICATION_FLASH_TIME
  }) => store => {
    store.actions.notify({ key, status })
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
      .chain(handleResponse(300))
      .fork(
        error => {
          console.log(error)
          if (R.is(Number, error)) {
            store.actions.broadcastNotification({
              key: `${key}Error`,
              status: error
            })
            if (key === 'auth') {
              store.actions.setAuth({ pass: null, admin: null })
            }
            return store.actions.apiFinish({ key, status: error })
          }
          if (key === 'auth') {
            store.actions.setAuth({ pass: null, admin: null })
          }
          store.actions.apiFinish({ key, status: 500, error })
          store.actions.broadcastNotification({
            key: `${key}Error`,
            status: 500
          })
        },
        data => {
          store.actions.broadcastNotification({ key: `${key}Success` })
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
      .chain(handleResponse(204))
      .map(transform)
      .fork(
        error => {
          store.actions.broadcastNotification({
            key: `${key}Error`,
            notificationTime
          })
          store.actions.apiFinish({ key: key || resource, status, error })
        },
        data => {
          store.actions.broadcastNotification({
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
  getEvent: () => store => {
    of(store.actions.eventFetching())
      .chain(() =>
        fetchf(endpoints.latestEvent(), {
          headers,
          credentials: 'include'
        })
      )
      .chain(handleResponse(204))
      .map(({ data }) => {
        const event = R.pathOr(null, ['currentEvent'], data)
        if (!data.currentEvent) {
          return Event.NoEvent
        }
        if (data.feedbackOpen) {
          return Event.ClosedEventWithFeedback(event)
        } else if (getIsEventOpen(event) && getIsRegistrationOpen(event)) {
          return Event.OpenEventWithRegistration(event)
        } else if (getIsEventOpen(event)) {
          return Event.OpenEvent(event)
        }
        return Event.ClosedEvent(event)
      })
      .fork(
        error => store.actions.eventFinish({ Event: Event.Failure(error) }),
        Event =>
          store.actions.eventFinish({
            Event
          })
      )
  },
  delete: ({ key, resource, id, values = {}, cb }) => store => {
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
        error => {
          store.actions.apiFinish({ key: key || resource, status, error })
          store.actions.broadcastNotification({ key: `${key}Error` })
        },
        status => {
          store.actions.apiFinish({ key: key || resource, status })
          store.actions.broadcastNotification({ key: `${key}Success` })
          if (key === 'auth') {
            store.actions.setAuth({ user: null, admin: null })
          }
          cb && cb()
        }
      )
  }
}

export default actions
