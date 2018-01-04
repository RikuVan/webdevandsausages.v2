import * as functions from 'firebase-functions'
import admin from 'firebase-admin'
import { Unauthorized } from 'http-errors'

export const authorizeAdmin = (req, res, next) => {
  console.log(req.session, req.session.user)
  if (!req.session.user) {
    console.error('No session cookie was present.', req.session)
    next(new Unauthorized())
    return
  }
  next()
}
