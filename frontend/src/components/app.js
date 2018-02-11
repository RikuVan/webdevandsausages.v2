import { h, Component } from 'preact'
import { Router } from 'preact-router'
import styled, { ThemeProvider } from 'styled-components'
import { connect } from '../preact-smitty'
import R from '../helpers'
import isWithinRange from 'date-fns/is_within_range'
import isBefore from 'date-fns/is_before'
import addHours from 'date-fns/add_hours'

import Nav from './nav'
import Home from '../routes/home'
import About from '../routes/about'
import NotFound from '../routes/notfound'
import Registration from 'async!../routes/registration'
import Admin from 'async!../routes/admin'
import ScrollWatcher from './ScrollWatcher'

import { theme } from '../style/theme'

const Main = styled.main`
  font-family: museo_sans500, sans-serif;
  font-weight: 400;
`

class App extends Component {
  /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   */

  handleRoute = e => {
    if (this.currentUrl !== e.url) {
      document.body.scrollTop = 0
    }

    this.currentUrl = e.url
    const { reverseTheme, actions: { changeTheme } } = this.props

    if (this.currentUrl.includes('registration')) {
      changeTheme('reverse')
    } else if (this.currentUrl.includes('about')) {
      changeTheme('reverse')
    } else if (reverseTheme) {
      changeTheme('standard')
    }
  }

  componentDidMount() {
    this.props.actions.get({
      key: 'latestEvent',
      resource: 'latestEvent'
    })
  }

  render({ latestEvent, loadingEvent, isEventOpen, isRegistrationOpen }) {
    return (
      <ThemeProvider theme={theme}>
        <Main id="app">
          <ScrollWatcher>
            <Nav disableRegistration={!isRegistrationOpen || loadingEvent} />
          </ScrollWatcher>
          <Router onChange={this.handleRoute}>
            <Home
              path="/"
              event={latestEvent}
              loadingEvent={loadingEvent}
              isEventOpen={isEventOpen}
              isRegistrationOpen={isRegistrationOpen}
            />
            <About path="/about/" />
            <Registration
              path="/registration/"
              event={latestEvent}
              loadingEvent={loadingEvent}
              isRegistrationOpen={isRegistrationOpen}
            />
            <Admin path="/__admin__/:section?" />
            <NotFound default />
          </Router>
        </Main>
      </ThemeProvider>
    )
  }
}

const getIsRegistrationOpen = event => {
  if (event.registrationOpens) {
    const endDate = event.registrationCloses
      ? event.registrationCloses
      : new Date(8640000000000000)
    return isWithinRange(new Date(), event.registrationOpens, endDate)
  }
  return false
}

const getIsEventOpen = ({ datetime }) =>
  isBefore(new Date(), addHours(datetime, 24))

const mapStateToProps = state => {
  const latestEvent = R.pathOr(
    {},
    ['api', 'latestEvent', 'data', 'currentEvent'],
    state
  )
  const loadingEvent = R.pathEq(
    ['api', 'latestEvent', 'status'],
    'started',
    state
  )
  const isRegistrationOpen = getIsRegistrationOpen(latestEvent)
  const isEventOpen = getIsEventOpen(latestEvent)
  const reverseTheme = R.pathEq(['ui', 'theme'], 'reverse', state)
  return {
    latestEvent,
    loadingEvent,
    isEventOpen,
    isRegistrationOpen,
    reverseTheme
  }
}

export default connect(mapStateToProps)(App)
