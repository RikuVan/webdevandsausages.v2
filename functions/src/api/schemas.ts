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

const registrationSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required(),
  verificationCode: Joi.string().required()
})

export const eventSchema = Joi.object().keys({
  datetime: Joi.date().required(),
  location: Joi.string()
    .min(3)
    .required(),
  maxParticipants: Joi.number()
    .integer()
    .required(),
  registered: Joi.array()
    .unique()
    .items(registrationSchema),
  registrationOpens: Joi.date(),
  registrationCloses: Joi.date(),
  waitListed: Joi.array()
    .unique()
    .items(registrationSchema)
})
