import { Request, Response, NextFunction } from 'express'
import { JoiObject, validate } from 'joi'
import { participantSchema } from './schemas'
import { CollectionReference } from '@google-cloud/firestore'
import Future, { tryP, of, ResolveFunction, Next } from 'fluture'
import * as createError from 'http-errors'
import {
  notNil,
  docDataOrNull,
  addInsertionDate,
  createMailMsg
} from '../utils'
import { participantsRef, eventsRef } from '../services/db'
import { filter, traverse, merge, isNil, isEmpty, either } from 'ramda'
import { Readable } from 'stream'
import { IParticipant } from '../models'
import { sendMail } from '../services/mail'

const safeData = schema => doc => {
  const data = docDataOrNull(doc)
  if (either(isNil, isEmpty)(data)) return of(null)
  const { error } = validate(data, schema)
  if (data && error) {
    return of(merge(data, { validationError: error.message }))
  }
  return of(data)
}

export const getCollection = (
  dbRef: CollectionReference,
  schema: JoiObject
) => (req: Request, res: Response, next: NextFunction) => {
  return tryP(() => dbRef.get())
    .chain(docsSnapshots => {
      const docs = []
      docsSnapshots.forEach(d => docs.push(d))
      return traverse(of, safeData(schema), docs)
    })
    .map(filter(notNil))
    .fork(error => next(createError(500, error)), data => res.json({ data }))
}

export const getAllParticipants = getCollection(
  participantsRef,
  participantSchema
)

export const upsertParticipant = (body: IParticipant) => () => {
  const currentRef = participantsRef.doc(body.email)
  const participant = addInsertionDate(body)
  return tryP(() => currentRef.set(participant, { merge: true }))
}

export const addParticipant = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  return (
    Future((rej, res) => {
      const { error } = validate(request.body, participantSchema)
      return error ? rej(createError(422, error.message)) : res(null)
    })
      // save participant to db or merge with existing one
      .chain(upsertParticipant(request.body))
      .chain(() => tryP(() => participantsRef.doc(request.body.email).get()))
      .map(docDataOrNull)
      .fork(
        error => {
          console.error('Failed to save participant to db: ', error)
          next(new createError.InternalServerError())
        },
        result => {
          const msg = createMailMsg({
            to: result.email,
            from: null,
            subject: 'waiting list',
            text:
              'You have been added to the Web Dev & Sausages mailing list. To unsubscribe please respond to this email with the subject "Unsubscribe".'
          })
          sendMail(msg)
          response.status(201).json({ result })
        }
      )
  )
}
