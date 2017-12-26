import { h, Component } from 'preact'
import { Router } from 'preact-router'
import { connect, track } from '../preact-smitty'
import { pathOr } from 'ramda'

import Nav, { NAV_HEIGHT } from './nav'
import Home from '../routes/home'
import About from '../routes/about'
import Admin from 'async!../routes/admin'
import styled, { css } from 'styled-components'
import { toRem, tablet, phone } from '../helpers/styleHelpers'

const PAGE_PADDING = 20

const Main = styled.main`
  font-family: museo_sans500, sans-serif;
  font-weight: 400;
  height: 100%;
  background: #fafafa;
`

const Page = styled.div`
  padding: ${toRem(NAV_HEIGHT * 1.3)} ${toRem(PAGE_PADDING)};
  ${p =>
    p.isExpandedMobileNav &&
    tablet(css`
      padding-top: ${toRem(NAV_HEIGHT * 2)};
    `)} ${p =>
      p.isExpandedMobileNav &&
      phone(css`
        padding-top: ${toRem(NAV_HEIGHT * 2.7)};
      `)} min-height: 100%;
  height: 100%;
  width: 100%;
  color: #444;
`

class App extends Component {
  /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   */
  handleRoute = e => {
    this.currentUrl = e.url
  }

  render({ isExpandedMobileNav }) {
    console.log(isExpandedMobileNav)
    return (
      <Main id="app">
        <Nav />
        <Page isExpandedMobileNav={isExpandedMobileNav}>
          <Router onChange={this.handleRoute}>
            <Home path="/" />
            <About path="/about/" />
            <About path="/profile/:user" />
            <Admin path="/admin" />
          </Router>
        </Page>
      </Main>
    )
  }
}

export default connect(state => ({
  isExpandedMobileNav: pathOr(false, ['ui', 'showMobileNav'], state)
}))(App)
