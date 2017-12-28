import * as Joi from 'joi'
import Future, { tryP, reject } from 'fluture'
import { eventsRef } from '../services/db'
import * as createError from 'http-errors'
import { docDataOrNull, areValidResults } from '../utils'
import { evolve, identity, merge, pick, compose } from 'ramda'
import { sendMail } from '../services/mail'

const getSuccessMessage = details =>
  `You are not longer registered for the event at ${details.location} on ${
    details.datetime
  }.`

const filterByTokenAndEmail = (email: string, token: string) => queue =>
  queue.filter(reg => !(reg.email === email && reg.verificationToken === token))

const removeFromRegistationQueue = (
  eventId: string,
  email: string,
  token: string
) => details => {
  const valid = areValidResults(details)
  if (valid) {
    const updatedEvent = compose(
      evolve({
        waitListed: filterByTokenAndEmail(email, token),
        registered: filterByTokenAndEmail(email, token)
      }),
      pick(['waitListed', 'registered'])
    )(details)

    if (
      updatedEvent.waitListed.length === details.waitListed.length &&
      updatedEvent.registered.length === details.registered.length
    ) {
      return reject(
        createError(
          401,
          'Your email and verificationToken do not match a registration.'
        )
      )
    }

    return tryP(() => eventsRef.doc(eventId).update(updatedEvent)).bimap(
      identity,
      merge({ message: getSuccessMessage(details) })
    )
  }

  return reject(createError(404, 'No open event found from database'))
}

export const cancelRegistration = (request, response, next) => {
  const eventId = request.params.eventId
  const email = request.body.email
  const token = request.body.verificationToken

  return Future((rej, res) => {
    const { error } = Joi.validate(
      request.body,
      Joi.object({
        email: Joi.string()
          .email()
          .required(),
        verificationToken: Joi.string()
          .min(3)
          .required()
      })
    )
    return error ? rej(createError(422, error.message)) : res(null)
  })
    .chain(() => tryP(() => eventsRef.doc(eventId).get()))
    .map(docDataOrNull)
    .chain(removeFromRegistationQueue(eventId, email, token))
    .chain(result => {
      const msg = {
        to: email,
        from: 'richard.vancamp@gmail.com',
        subject: 'Web dev & sausages event registration cancellation',
        text: result.message
      }
      return sendMail(msg)
    })
    .fork(error => next(error), () => response.status(202).send('OK'))
}
