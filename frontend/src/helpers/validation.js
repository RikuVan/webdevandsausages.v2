const emailRegex = /^.+@.+\..+$/i
export const isEmail = value => emailRegex.test(value)
