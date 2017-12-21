import * as functions from 'firebase-functions'
import admin from 'firebase-admin'
admin.initializeApp(functions.config().firebase)
import * as express from 'express'
import api from './api/apiRoutes'
import cors from 'cors'
import setMiddleware from './middleware/'
import { tokensRef } from './services/db'
const googleAuth = require('google-auth-library')
import * as google from 'googleapis'
import {
  setGooogleSheetsApiTokens,
  authenticateForGoogleSheetsApi,
  appendNewEmailToSpreadsheetOnCreate
} from './services/googleSheets'

const app = express()
setMiddleware(app)
app.use(api)

exports.api = functions.https.onRequest(
  (req: express.Request, res: express.Response): express.Application => {
    // without trailing "/" will have req.path = null, req.url = null
    // which won't match to your app.get('/', ...) route
    if (!req.path) req.url = `/${req.url}`
    return app(req, res)
  }
)

/* NON-API ENDPOINTS */
exports.OauthCallback = functions.https.onRequest(setGooogleSheetsApiTokens)
exports.authGoogleAPI = functions.https.onRequest(
  authenticateForGoogleSheetsApi
)
exports.appendNewEmailToSpreadSheet = functions.firestore
  .document(`participants/{participantId}`)
  .onCreate(appendNewEmailToSpreadsheetOnCreate)
