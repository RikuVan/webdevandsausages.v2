const sgMail = require('@sendgrid/mail')
import functions from 'firebase-functions'
import { tryP } from 'fluture'
import { MailData } from '@sendgrid/helpers/classes/mail'

export const sendMail = (msg: MailData) => {
  sgMail.setApiKey(functions.config().sendgrid.key)
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
