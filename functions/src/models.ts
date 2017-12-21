export interface IEventRegistration {
  cancelled: boolean
  registerOn: string
  waitListed: boolean
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
