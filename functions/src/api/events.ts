import { Request, Response, NextFunction } from 'express'
import { getCollection, safeData } from './participants'
import { eventsRef } from '../services/db'
import { eventSchema } from './schemas'
import { tryP, of, reject } from 'fluture'
import { NotFound, InternalServerError } from 'http-errors'
import { filter, traverse, compose, prop, evolve, length } from 'ramda'
import * as moment from 'moment-timezone'
import { IEvent } from '../models'

export const getAllEvents = getCollection(eventsRef, eventSchema)

const isFutureEvent = compose(
  date => moment().isSameOrBefore(date),
  prop('datetime')
)

const transformations = {
  registered: length,
  waitListed: length
}
const safeHead = array => (array.length > 0 ? array[0] : {})
const transformForPublicApi = (current: IEvent[]): any =>
  compose(evolve(transformations), safeHead)(current)

export const getCurrentEvent = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return tryP(() => eventsRef.get())
    .chain(docsSnapshots => {
      const docs = []
      docsSnapshots.forEach(d => docs.push(d))
      return traverse(of, safeData(eventSchema, false, true), docs)
    })
    .chain(events => {
      const current = filter(isFutureEvent, events)
      if (current.length === 0) return reject(new NotFound())
      return of(transformForPublicApi(current as IEvent[]))
    })
    .fork(error => next(new InternalServerError()), data => res.json({ data }))
}
