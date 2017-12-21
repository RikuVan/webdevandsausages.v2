import { Request, Response, NextFunction } from 'express'
import * as cors from 'cors'
import * as cookieParser from 'cookie-parser'

const setMiddleware = app => {
  app.use(cors({ origin: true }))
  app.use(cookieParser())
  return app
}

export default setMiddleware
