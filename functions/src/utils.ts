import { create, env } from 'sanctuary'
const { env: flutureEnv } = require('fluture-sanctuary-types')
import {
  has,
  either,
  isNil,
  compose,
  not,
  assoc,
  propOr,
  evolve,
  prop
} from 'ramda'
import * as moment from 'moment'
import { IMailMsg } from './models'

const checkTypes = process.env.NODE_ENV !== 'production'
export const S = create({ checkTypes, env: env.concat(flutureEnv) })

export const docDataOrNull = doc => (!doc || !doc.exists ? null : doc.data())
export const areValidResults = compose(not, either(isNil, has('error')))
export const notNil = compose(not, isNil)
export const addInsertionDate = assoc(
  'insertedOn',
  moment().format('YYYY-MM-DD HH:mm')
)
export const createMailMsg = (msg: IMailMsg) =>
  evolve({
    from: v => (v ? v : 'richard.vancamp@gmail.com'),
    subject: s => `Web Dev & Sausages ${s || ''}`,
    text: propOr('', 'message')
  })
