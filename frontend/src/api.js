import R from './helpers'

let version = 'tool'

if (process.env.NODE_ENV === 'development') {
  version = 'dev'
}

const API_ROOT = `https://us-central1-wds-event-${version}.cloudfunctions.net/api`

const toParam = item =>
  item ? encodeURIComponent(decodeURIComponent(item)) : ''

const makeQueryParams = params =>
  Object.keys(params)
    .filter(k => params[k])
    .map(
      k =>
        R.is(Array, params[k])
          ? params[k].reduce(
              (acc, val, index) =>
                index === params[k].length - 1
                  ? `${acc}${toParam(k)}=${toParam(val)}`
                  : `${acc}${toParam(k)}=${toParam(val)}&`,
              ''
            )
          : `${toParam(k)}=${toParam(params[k])}`
    )
    .join('&')

export const endpoints = {
  auth: () => `${API_ROOT}/auth`,
  pass: ({ id, params }) =>
    `${API_ROOT}/temppass/${id}${params ? '/?' + makeQueryParams(params) : ''}`,
  participants: () => `${API_ROOT}/participants`,
  events: ({ id }) => `${API_ROOT}/events/${id ? id : ''}`,
  feedback: ({ id }) => `${API_ROOT}/events/${id}/feedback`,
  latestEvent: () => `${API_ROOT}/events/current`,
  registration: ({ id, params }) =>
    `${API_ROOT}/register/${id}${params ? '/?' + makeQueryParams(params) : ''}`
}
