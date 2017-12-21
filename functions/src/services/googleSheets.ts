import * as functions from 'firebase-functions'
import admin from 'firebase-admin'
const googleAuth = require('google-auth-library')
import * as google from 'googleapis'
import Future, { tryP, of, reject } from 'fluture'
import { tokensRef } from './db'
import { docDataOrNull } from '../utils'
import { notifySlack } from './slack'

// config for goolgeAuthApi
const FUNCTIONS_CLIENT_ID = functions.config().googleapi.client_id
const FUNCTIONS_SECRET_KEY = functions.config().googleapi.client_secret
const FUNCTIONS_REDIRECT =
  'https://us-central1-wds-event-tool.cloudfunctions.net/OauthCallback'

const oauthTokens = null

const auth = new googleAuth()
const functionsOauthClient = new auth.OAuth2(
  FUNCTIONS_CLIENT_ID,
  FUNCTIONS_SECRET_KEY,
  FUNCTIONS_REDIRECT
)

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

// visit the URL for this Function to obtain tokens
export const authenticateForGoogleSheetsApi = (req, res) => {
  const redirectUrl = functionsOauthClient.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent'
  })

  res.redirect(redirectUrl)
}

export const setGooogleSheetsApiTokens = (request, response) => {
  const code = request.query.code
  // TODO: how to encase this directly in a Future?
  functionsOauthClient.getToken(code, (error, token) => {
    Future((rej, res) => (error ? rej(error) : res(token)))
      // Now tokens contains an access_token and an optional refresh_token. Save them.
      .chain(tokens => tryP(() => tokensRef.doc('googleSheetsApi').set(tokens)))
      .fork(
        err => {
          console.log('Google OAuth token request failure: ', err)
          response.status(400).send(err)
        },
        () => response.status(200).send('OK')
      )
  })
}

function getAuthorizedClient() {
  return Future((res, rej) => {
    if (oauthTokens) {
      return res(functionsOauthClient)
    }
    return res(null)
  }).chain(res => {
    if (!res) {
      return tryP(() => tokensRef.doc('googleSheetsApi').get()).map(
        docDataOrNull
      )
    }
    return of(res)
  })
}

function appendFuture(requestWithoutAuth) {
  getAuthorizedClient()
    .chain(client => {
      if (!client) {
        return reject(null)
      }
      const sheets = google.sheets('v4')
      const request = requestWithoutAuth
      request.auth = client

      return sheets.spreadsheets.values.append(request, (err, response) => {
        if (err) {
          console.log(`The API returned an error: ${err}`)
          return reject(err)
        }

        return of(response)
      })
    })
    .fork(
      err => console.log('Appending email to spreadsheeet failed: ', err),
      () => console.log('New participant email saved to Google sheet.')
    )
}

const GOOGLE_SHEET_ID = '1jnATckAl0Mb3vjkGf7SEQ0wDBR0q4AVnry1ZxrPrhxw'

export const appendNewEmailToSpreadsheetOnCreate = event => {
  const newParticipant = event.data.data()

  notifySlack(newParticipant.email)

  return appendFuture({
    spreadsheetId: GOOGLE_SHEET_ID,
    range: 'A:C',
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    resource: {
      values: [
        [
          newParticipant.email,
          newParticipant.receivesMail,
          newParticipant.insertedOn
        ]
      ]
    }
  })
}
