export interface IEventRegistration {
  validationToken: string
  email: string
}

export interface IParticipant {
  firstName?: string
  lastName?: string
  affiliation?: boolean
  email: string
  insertedOn: string
}

export interface IMailMsg {
  to: string
  from?: string
  subject?: string
  text?: string
}
