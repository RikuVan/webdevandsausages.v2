import * as functions from 'firebase-functions'
import admin from 'firebase-admin'
import { Unauthorized } from 'http-errors'
import { tryP } from 'fluture'

// The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header like this:
// `Authorization: Bearer <Firebase ID Token>`.
// when decoded successfully, the ID Token content will be added as `req.user`.
export const validateFirebaseIdToken = (req, res, next) => {
  if (
    (!req.headers.authorization ||
      !req.headers.authorization.startsWith('Bearer ')) &&
    !req.cookies.__session
  ) {
    console.error(
      'No Firebase ID token was passed as a Bearer token in the Authorization header.',
      'Make sure you authorize your request by providing the following HTTP header:',
      'Authorization: Bearer <Firebase ID Token>',
      'or by passing a "__session" cookie.'
    )
    next(new Unauthorized())
    return
  }

  let idToken
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    idToken = req.headers.authorization.split('Bearer ')[1]
  } else {
    idToken = req.cookies.__session
  }
  tryP(() => admin.auth().verifyIdToken(idToken)).fork(
    error => {
      console.error('Error while verifying Firebase ID token:', error)
      next(new Unauthorized())
    },
    decodedIdToken => {
      req.user = decodedIdToken
      next()
    }
  )
}
