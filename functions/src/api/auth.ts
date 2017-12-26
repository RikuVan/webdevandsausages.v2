import admin from 'firebase-admin'
const randomWord = require('random-word')
import { sendSms } from '../services/sms'
import { sendMail } from '../services/mail'
import { adminsRef } from '../services/db'
import { tryP, reject, both } from 'fluture'
import { docDataOrNull } from '../utils'
import { Unauthorized, InternalServerError } from 'http-errors'
import { compose, toLower, pathOr } from 'ramda'
import * as moment from 'moment'

const sendCodeByEmail = (data, pass) => {
  const msg = {
    to: data.email,
    from: 'richard.vancamp@gmail.com',
    subject: 'Web dev & sausages admin',
    text: pass
  }
  return sendMail(msg)
}

const sendCodeBySms = (data, pass) => sendSms(pass, data.phoneNumber)

export const getCodeByEmailOrSms = (req, res, next) => {
  const name = compose(toLower, pathOr('', ['params', 'id']))(req)
  const bySms = req.query.method && req.query.method === 'sms'
  const pass = randomWord()
  const expires = moment()
    .add(10, 'minutes')
    .unix()
  const sender = bySms ? sendCodeBySms : sendCodeByEmail

  return tryP(() => adminsRef.doc(name).get())
    .map(docDataOrNull)
    .chain(data => {
      if (data && data.phoneNumber) {
        return both(
          tryP(() => adminsRef.doc(name).update({ pass, expires })),
          sender(data, pass)
        )
      }
      return reject(new Unauthorized())
    })
    .fork(
      err => {
        console.log(err)
        next(new InternalServerError())
      },
      () => res.status(200).json({ status: 'success' })
    )
}

const isValidPass = (data, pass) => {
  const unixNow = moment().unix()
  return (
    data.pass && data.expires && data.pass === pass && unixNow <= data.expires
  )
}

export const auth = (req, res, next) => {
  const pass = req.body.pass
  const name = req.body.name
  tryP(() => adminsRef.doc(name).get())
    .map(docDataOrNull)
    .chain(data => {
      if (isValidPass(data, pass)) {
        return tryP(() => admin.auth().createCustomToken(name, { admin: true }))
      }
      return reject(new Unauthorized())
    })
    .map(token => {
      console.log(token)
      return token
    })
    .fork(err => next(err), token => res.status(200).send({ token }))
}
