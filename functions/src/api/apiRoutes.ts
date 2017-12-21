import { Router } from 'express'
import { register } from './register'
import { getAllParticipants, addParticipant } from './participants'
import { apiErrorHandler } from './apiErrors'
import { cancelRegistration } from './cancelRegistration'
import { validateFirebaseIdToken } from '../middleware/auth'

const router = Router()

/* EVENTS */
//TODO: get (one && all), post, put, delete

/* PARTICIPANTS */
router.get('/participants', validateFirebaseIdToken, getAllParticipants)
router.post('/participants', addParticipant)
//TODO: add (mailing list), delete

/* REGISTRATION */
router.post('/register/:eventId', register)
router.delete('/register/:eventId', cancelRegistration)

/* ERROR */
router.use(apiErrorHandler)

export default router
