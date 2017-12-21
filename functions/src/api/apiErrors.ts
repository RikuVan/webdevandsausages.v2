import { Errback, Request, Response } from 'express'
import { pick } from 'ramda'

const parseError = pick(['status', 'message'])

export const apiErrorHandler = (err: Errback, req: Request, res: Response) => {
  const { status, message } = parseError(err)
  res.status(status || 500).send(message || err.toString())
}
