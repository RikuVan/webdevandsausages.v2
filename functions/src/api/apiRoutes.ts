import { Router } from 'express'
import { register, verifyRegistration } from './register'
import { getAllParticipants, addParticipant } from './participants'
import { apiErrorHandler } from './apiErrors'
import { cancelRegistration } from './cancelRegistration'
import { validateFirebaseIdToken } from '../middleware/auth'
import { getCodeByEmailOrSms, auth } from './auth'
import { getAllEvents, getCurrentEvent } from './events'

const router = Router()

/* EVENTS */
router.get('/events', getAllEvents) //TODO: add validation
router.get('/events/current', getCurrentEvent)
router.get('/events/id')
//router.post('/events', validateFirebaseIdToken)
//router.put('/events/:id', validateFirebaseIdToken)
//router.delete('/events/:id', validateFirebaseIdToken)

/* PARTICIPANTS */
router.get('/participants', validateFirebaseIdToken, getAllParticipants)
router.post('/participants', addParticipant)
//TODO: router.delete('/participants, validateFirebaseIdToken, deleteParticipant)

/* REGISTRATION */
router.post('/register/:eventId', register)
router.get('/register/:eventId', verifyRegistration)
router.delete('/register/:eventId', cancelRegistration)

router.get('/temppass/:id', getCodeByEmailOrSms)
router.post('/auth', auth)

/* ERROR */
router.use(apiErrorHandler)

export default router
