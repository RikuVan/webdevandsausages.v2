import * as Joi from 'joi'

export const participantSchema = Joi.object().keys({
  firstName: Joi.string(),
  lastName: Joi.string(),
  email: Joi.string()
    .email()
    .required(),
  receivesMail: Joi.boolean().required(),
  affiliation: Joi.string(),
  insertedOn: Joi.date()
})
