import { Router } from 'express'
import { register } from './register'
import { getAllParticipants, addParticipant } from './participants'
import { apiErrorHandler } from './apiErrors'
import { cancelRegistration } from './cancelRegistration'
import { validateFirebaseIdToken } from '../middleware/auth'
import { getCodeByEmailOrSms, auth } from './auth'
import { getAllEvents } from './events'

const router = Router()

/* EVENTS */
router.get('/events', getAllEvents)
router.get('/events/id')
//router.post('/events', validateFirebaseIdToken)
//router.put('/events/:id', validateFirebaseIdToken)
//router.delete('/events/:id', validateFirebaseIdToken)

/* PARTICIPANTS */
router.get('/participants', validateFirebaseIdToken, getAllParticipants)
router.post('/participants', addParticipant)
//TODO: router.delete('/participants, deleteParticipant)

/* REGISTRATION */
router.post('/register/:eventId', register)
router.delete('/register/:eventId', cancelRegistration)

router.get('/temppass/:id', getCodeByEmailOrSms)
router.post('/auth', auth)

/* ERROR */
router.use(apiErrorHandler)

export default router
