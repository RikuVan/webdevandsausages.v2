import { h, Component } from 'preact'
import { Router } from 'preact-router'
import styled, { ThemeProvider } from 'styled-components'
import { connect } from '../preact-smitty'
import R from '../helpers'
import isWithinRange from 'date-fns/is_within_range'

import Nav from './nav'
import Home from '../routes/home'
import About from '../routes/about'
import NotFound from '../routes/notfound'
import Registration from 'async!../routes/registration'
import Admin from 'async!../routes/admin'
import ScrollWatcher from './ScrollWatcher'
import store from '../store'

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
    const { reverseTheme } = this.props
    const { actions: { changeTheme } } = store

    if (this.currentUrl.includes('registration')) {
      changeTheme('reverse')
    } else if (this.currentUrl.includes('about')) {
      changeTheme('reverse')
    } else if (reverseTheme) {
      changeTheme('standard')
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
            <Admin path="/__admin__" />
            <NotFound default />
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
  const latestEvent = R.pathOr({}, ['api', 'latestEvent', 'data'], state)
  const loadingEvent = R.pathEq(
    ['api', 'latestEvent', 'status'],
    'started',
    state
  )
  const isEventOpen = isRegistrationOpen(latestEvent)
  const reverseTheme = R.pathEq(['ui', 'theme'], 'reverse', state)
  return { latestEvent, loadingEvent, isEventOpen, reverseTheme }
}

export default connect(mapStateToProps)(App)
