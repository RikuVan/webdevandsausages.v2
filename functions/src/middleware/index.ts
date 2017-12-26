import { Request, Response, NextFunction } from 'express'
const cors = require('cors')({ origin: true })
import * as cookieParser from 'cookie-parser'

const setMiddleware = app => {
  app.use(cors)
  app.use(cookieParser())
  return app
}

export default setMiddleware
