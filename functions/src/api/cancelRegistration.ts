import * as Joi from 'joi'
import Future, { tryP } from 'fluture'
import { eventsRef } from '../services/db'
import * as createError from 'http-errors'
import { docDataOrNull, areValidResults } from '../utils'
import { evolve, without, identity, merge, pick, compose } from 'ramda'
import { sendMail } from '../services/mail'

const getSuccessMessage = details =>
  `You are not longer registered for the event at ${details.location} on ${
    details.datetime
  }.`

const removeFromRegistationQueue = (
  eventId: string,
  email: string
) => details => {
  const valid = areValidResults(details)
  console.log(valid, details)
  if (valid) {
    const updatedEvent = compose(
      evolve({
        waitListed: without([email]),
        registered: without([email])
      }),
      pick(['waitListed', 'registered'])
    )(details)

    return tryP(() => eventsRef.doc(eventId).update(updatedEvent)).bimap(
      identity,
      merge({ message: getSuccessMessage(details) })
    )
  }

  return Future.reject(createError(404, 'No open event found from database'))
}

export const cancelRegistration = (request, response, next) => {
  const eventId = request.params.eventId
  const email = request.body.email

  return Future((rej, res) => {
    const { error } = Joi.validate(
      email,
      Joi.string()
        .email()
        .required()
    )
    return error ? rej(createError(422, error.message)) : res(null)
  })
    .chain(() => tryP(() => eventsRef.doc(eventId).get()))
    .map(docDataOrNull)
    .chain(removeFromRegistationQueue(eventId, email))
    .fork(
      error => next(error),
      result => {
        const msg = {
          to: email,
          from: 'richard.vancamp@gmail.com',
          subject: 'Web dev & sausages event registration cancellation',
          text: result.message
        }
        sendMail(msg)
        response.status(202).json({ result })
      }
    )
}
