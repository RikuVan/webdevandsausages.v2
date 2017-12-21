import * as functions from 'firebase-functions'
import axios from 'axios'
import { encaseP2 } from 'fluture'
const axiosF = encaseP2(axios.post)

export const notifySlack = email => {
  const body = { text: `${email} joined the mailing list!` }
  axiosF(functions.config().slack.url, { body }).fork(
    err =>
      console.log('An error occurred dispatching a message to slack: ', err),
    () => console.log(`Slack has received a notification about ${email}`)
  )
}
