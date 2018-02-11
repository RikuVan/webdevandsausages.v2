import { Request, Response, NextFunction } from 'express'
import { eventsRef } from '../services/db'
import { feedbackSchema } from './schemas'
import { validate } from 'joi'
import Future, { tryP, reject } from 'fluture'
import { NotFound, UnprocessableEntity, Forbidden } from 'http-errors'
import { prop, compose, concat, propOr, trim, toLower } from 'ramda'
import { docDataOrNull, isNot, dateIsBetween } from '../utils'

const trimLower = compose(trim, toLower)
const hasPasswordMismatch = password =>
  compose(isNot(trimLower(password)), trimLower, prop('feedbackPass'))

const feedbackIsOpen = ({ datetime }) => dateIsBetween(datetime)

export const addFeedback = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const eventId = request.params.id
  const feedback = request.body.feedback
  const password = request.body.password
  Future((rej, res) => {
    const { error } = validate(request.body, feedbackSchema)
    return error ? rej(new UnprocessableEntity(error.message)) : res(null)
  })
    .chain(() => {
      return tryP(() => eventsRef.doc(eventId).get())
        .map(docDataOrNull)
        .chain(event => {
          if (!event) {
            return reject(new NotFound())
          } else if (
            hasPasswordMismatch(password)(event) ||
            !feedbackIsOpen(event)
          ) {
            return reject(new Forbidden())
          }
          const updatedFeedback = concat(propOr([], 'feedback', event), [
            feedback
          ])
          return tryP(() =>
            eventsRef.doc(eventId).update({ feedback: updatedFeedback })
          )
        })
    })
    .fork(error => next(error), () => response.json({ result: 'success' }))
}
