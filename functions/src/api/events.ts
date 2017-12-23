import { getCollection } from './participants'
import { eventsRef } from '../services/db'
import { eventSchema } from './schemas'

export const getAllEvents = getCollection(eventsRef, eventSchema)
