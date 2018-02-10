import { Router } from 'express'
import { register, verifyRegistration } from './register'
import { getAllParticipants, addParticipant } from './participants'
import { apiErrorHandler } from './apiErrors'
import { cancelRegistration } from './cancelRegistration'
import { authorizeAdmin } from '../middleware/auth'
import { getCodeByEmailOrSms, auth, login, logout } from './auth'
import {
  getAllEvents,
  getCurrentEvent,
  createEvent,
  updateEvent,
  removeEvent
} from './events'

const router = Router()

/* EVENTS */
router.get('/events', authorizeAdmin, getAllEvents)
router.get('/events/current', getCurrentEvent)
router.post('/events', authorizeAdmin, createEvent)
router.put('/events/:id', authorizeAdmin, updateEvent)
router.delete('/events/:id', authorizeAdmin, removeEvent)

/* PARTICIPANTS */
router.get('/participants', authorizeAdmin, getAllParticipants)
router.post('/participants', addParticipant)
//TODO: router.delete('/participants, authorizeAdmin, deleteParticipant)

/* REGISTRATION */
router.post('/register/:eventId', register)
router.get('/register/:eventId', verifyRegistration)
router.delete('/register/:eventId', cancelRegistration)

router.get('/temppass/:id', getCodeByEmailOrSms)
router.get('/auth', authorizeAdmin, auth)
router.post('/auth', login)
router.delete('/auth', logout)

/* ERROR */
router.use(apiErrorHandler)

export default router
