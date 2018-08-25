import daggy from 'daggy'

const Event = daggy.taggedSum('Event', {
  NotAsked: [],
  Loading: [],
  Failure: ['error'],
  OpenEvent: ['data'],
  OpenEventWithRegistration: ['data'],
  ClosedEvent: ['data'],
  ClosedEventWithFeedback: ['data'],
  NoEvent: []
})

export default Event
