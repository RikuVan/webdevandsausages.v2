import { Request, Response, NextFunction } from 'express'
import { validate } from 'joi'
import * as moment from 'moment-timezone'
import Future, { tryP, reject, of } from 'fluture'
import * as createError from 'http-errors'
import { areValidResults, docDataOrNull } from '../utils'
import { sendMail } from '../services/mail'
import { participantSchema } from './schemas'
import { eventsRef } from '../services/db'
import { allPass, compose, prop, merge, identity, uniq, concat } from 'ramda'
import { upsertParticipant } from './participants'
const randomWord = require('random-word')

moment()
  .tz('Europe/Helsinki')
  .format()

const isNotClosed = compose(
  date => moment().isSameOrBefore(date),
  prop('registrationCloses')
)

const isOpen = compose(
  date => moment().isSameOrBefore(date),
  prop('registrationOpens')
)
const isEventOpen = allPass([isOpen, isNotClosed])

const getSuccessMessage = (details, action, verificationToken) =>
  `You have been ${action} for the event at ${details.location} on ${
    details.datetime
  }. To cancel your registration, use the following personal verification token at the Web Dev & Sausages website: ${verificationToken}`

const hasSpace = details => details.registered.length < details.maxParticipants

type registrationQueue = 'registered' | 'waitListed'
const pushToEventQueue = (
  email: string,
  type: registrationQueue,
  eventId: string,
  details: object
) => {
  // unique token allows cancellation of registration
  const verificationToken = `${randomWord()}-${randomWord()}`
  const registration = {
    email,
    verificationToken
  }
  const updatedList = compose(uniq, concat(details[type]))([registration])

  return tryP(() =>
    eventsRef.doc(eventId).update({ [type]: updatedList })
  ).bimap(
    identity,
    merge({
      message: getSuccessMessage(details, type.toLowerCase(), verificationToken)
    })
  )
}

const registerOrWaitlist = (eventId: string, email: string) => details => {
  const valid = areValidResults(details)

  if (valid && isEventOpen(details) && hasSpace(details)) {
    return pushToEventQueue(email, 'registered', eventId, details)
  } else if (valid && isEventOpen(details)) {
    return pushToEventQueue(email, 'waitListed', eventId, details)
  }

  return Future.reject(createError(404, 'No open event found from database'))
}

export const register = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const eventId = request.params.eventId
  const email = request.body.email

  return (
    Future((rej, res) => {
      const { error } = validate(request.body, participantSchema)
      return error ? rej(createError(422, error.message)) : res(null)
    })
      // save participant to db or merge with existing one
      .chain(upsertParticipant(request.body))
      // if event is open, add to registration list or wait list
      .chain(() => {
        return tryP(() => eventsRef.doc(eventId).get())
          .map(docDataOrNull)
          .chain(registerOrWaitlist(eventId, email))
      })
      .chain(result => {
        const msg = {
          to: email,
          from: 'richard.vancamp@gmail.com',
          subject: 'Web dev & sausages event registration',
          text: result.message
        }
        return sendMail(msg)
      })
      .fork(error => next(error), () => response.status(201).send('OK'))
  )
}
