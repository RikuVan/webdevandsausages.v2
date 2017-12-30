import { h, Component } from 'preact'
import { Router } from 'preact-router'
import styled from 'styled-components'
import { connect } from '../preact-smitty'
import { pathOr, pathEq } from 'ramda'

import Nav from './nav'
import Home from '../routes/home'
import About from '../routes/about'
import Registration from '../routes/registration'
import Admin from 'async!../routes/admin'
import ScrollWatcher from './ScrollWatcher'
import store from '../store'

import isWithinRange from 'date-fns/is_within_range'

const Main = styled.main`
  font-family: museo_sans500, sans-serif;
  font-weight: 400;
  height: 100%;
`

class App extends Component {
  /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   */

  handleRoute = e => {
    this.currentUrl = e.url
  }

  componentDidMount() {
    store.actions.get({
      key: 'latestEvent',
      resource: 'events',
      params: 'current'
    })
  }

  render({ latestEvent, loadingEvent, isEventOpen }) {
    return (
      <Main id="app">
        <ScrollWatcher>
          <Nav />
        </ScrollWatcher>
        <Router onChange={this.handleRoute}>
          <Home
            path="/"
            event={latestEvent}
            loadingEvent={loadingEvent}
            isEventOpen={isEventOpen}
          />
          <About path="/about/" />
          <Registration
            path="/registration/"
            event={latestEvent}
            loadingEvent={loadingEvent}
            isEventOpen={isEventOpen}
          />
          <Admin path="/admin" />
        </Router>
      </Main>
    )
  }
}

const isRegistrationOpen = event => {
  if (event.registrationOpens) {
    const endDate = event.registrationCloses
      ? event.registrationCloses
      : new Date(8640000000000000)
    return isWithinRange(new Date(), event.registrationOpens, endDate)
  }
  return false
}

const mapStateToProps = state => {
  const latestEvent = pathOr({}, ['api', 'latestEvent', 'data'], state)
  const loadingEvent = pathEq(
    ['api', 'latestEvent', 'status'],
    'started',
    state
  )
  const isEventOpen = isRegistrationOpen(latestEvent)
  return { latestEvent, loadingEvent, isEventOpen }
}

export default connect(mapStateToProps)(App)
