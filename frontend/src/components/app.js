import { h, Component } from 'preact'
import { Router } from 'preact-router'
import styled, { ThemeProvider } from 'styled-components'
import { connect } from '../preact-smitty'
import { pathOr, pathEq } from 'ramda'
import isWithinRange from 'date-fns/is_within_range'

import Nav from './nav'
import Home from '../routes/home'
import About from '../routes/about'
import Registration from '../routes/registration'
import Admin from 'async!../routes/admin'
import ScrollWatcher from './ScrollWatcher'
import store from '../store'

import { theme } from '../style/theme'

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
    if (this.currentUrl.includes('registration')) {
      store.actions.changeTheme('reverse')
    } else if (this.props.reverseTheme) {
      store.actions.changeTheme('standard')
    }
  }

  componentDidMount() {
    store.actions.get({
      key: 'latestEvent',
      resource: 'latestEvent'
    })
  }

  render({ latestEvent, loadingEvent, isEventOpen }) {
    //Todo: refactor to use the theme provider instead of the theme import
    return (
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
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
  const reverseTheme = pathEq(['ui', 'theme'], 'reverse', state)
  return { latestEvent, loadingEvent, isEventOpen, reverseTheme }
}

export default connect(mapStateToProps)(App)
