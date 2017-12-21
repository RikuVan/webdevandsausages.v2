const sgMail = require('@sendgrid/mail')
import functions from 'firebase-functions'
import { tryP } from 'fluture'
import { MailData } from '@sendgrid/helpers/classes/mail'
import { config } from '..'

export const sendMail = (msg: MailData) => {
  sgMail.setApiKey(config().sendgridKey)
  const futMail = tryP(() => sgMail.send(msg))
  return futMail.fork(
    err =>
      console.error(
        `Sendgrid failed to send mail to ${msg.to}.`,
        err.toString()
      ),
    () => console.log(`Mail sent to ${msg.to}. Subject: ${msg.subject}`)
  )
}
