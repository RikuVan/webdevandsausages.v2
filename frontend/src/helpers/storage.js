export default {
  get(key, defaultValue) {
    if (typeof window === 'undefined') {
      return defaultValue
    }
    const value = window.localStorage[key]
    const expiration = window.localStorage[`${key}-expiration`]
    return typeof value !== 'undefined' &&
      new Date().getTime() < (expiration || Infinity)
      ? value
      : defaultValue
  },
  set(key, value, expirationMS) {
    if (typeof window !== 'undefined') {
      window.localStorage[key]
      window.localStorage[`${key}-expiration`] = expirationMS
    }
  }
}
