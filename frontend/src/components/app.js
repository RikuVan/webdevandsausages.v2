import { h, Component } from 'preact'
import { Router } from 'preact-router'
import styled from 'styled-components'
import { connect } from '../preact-smitty'
import { pathOr, tap, compose, identity } from 'ramda'

import Nav, { NAV_HEIGHT } from './nav'
import Home from '../routes/home'
import About from '../routes/about'
import Registration from '../routes/registration'
import Admin from 'async!../routes/admin'
import ScrollWatcher from './ScrollWatcher'
import store from '../store'

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

  render({ latestEvent }) {
    const eventData = latestEvent && latestEvent.data ? latestEvent.data : {}
    const loadingEvent = !latestEvent || latestEvent.status === 'started'
    return (
      <Main id="app">
        <ScrollWatcher>
          <Nav />
        </ScrollWatcher>
        <Router onChange={this.handleRoute}>
          <Home path="/" event={eventData} loadingEvent={loadingEvent} />
          <About path="/about/" />
          <Registration
            path="/registration/"
            event={eventData}
            loadingEvent={loadingEvent}
          />
          <Admin path="/admin" />
        </Router>
      </Main>
    )
  }
}

export default connect(state => ({
  latestEvent: pathOr(null, ['api', 'latestEvent'], state)
}))(App)
