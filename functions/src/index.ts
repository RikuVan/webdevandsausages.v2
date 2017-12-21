import * as functions from 'firebase-functions'
import admin from 'firebase-admin'
admin.initializeApp(functions.config().firebase)
export const config = () => ({
  slackUrl: functions.config().slack.url,
  sendgridKey: functions.config().sendgrid.key,
  google: {
    secret: functions.config().googleapi.client_secret,
    id: functions.config().googleapi.client_id
  }
})
import * as express from 'express'
import api from './api/apiRoutes'
import setMiddleware from './middleware/'
import {
  setGooogleSheetsApiTokens,
  authenticateForGoogleSheetsApi,
  appendNewEmailToSpreadsheetOnCreate
} from './services/googleSheets'

console.log(config())

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
