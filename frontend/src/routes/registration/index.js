import { h, Component } from 'preact'
import { route } from 'preact-router'
import styled, { css } from 'styled-components'
import { pathOr, contains, compose, values } from 'ramda'
import { connect } from '../../preact-smitty'
import opacify from 'polished/lib/color/opacify'
import transparentize from 'polished/lib/color/transparentize'
import lighten from 'polished/lib/color/lighten'
import format from 'date-fns/format'

import { theme } from '../../style/theme'
import { toRem, tablet, phone } from '../../helpers/styleHelpers'
import store from '../../store'

import PageWrapper from '../../components/PageWrapper'
import Footer from '../../components/Footer'
import Separator from '../../components/Separator'
import { Tabs, Tab } from '../../components/Tabs'
import Panel from '../../components/Panel'

import RegistrationForm from './RegistrationForm'
import CancellationForm from './CancellationForm'
import VerificationForm from './VerificationForm'

const TopSection = styled.div`
  padding: ${toRem(theme.navHeight)} 0 50vh;
  background: linear-gradient(15deg, ${theme.primaryOrange}, ${'#52bdf6'});
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.17);
  width: 100%;
`

const PageTitle = styled.h1`
  margin-top: 100px;
  font-size: 2rem;
  text-transform: uppercase;
  color: #fff;
  z-index: 1;
  ${tablet(
    css`
      font-size: 1.8rem;
    `
  )};
  ${phone(
    css`
      font-size: 1.2rem;
    `
  )};
`

const Event = styled.h3`
  margin: auto;
  max-width: 50%;
  color: #fff;
  ${tablet(
    css`
      max-width: 70%;
    `
  )};
  ${phone(
    css`
      max-width: 90%;
    `
  )};
`

const TabsContainer = styled.section`
  width: 100%;
  background: white;
  margin: 0;
  padding: 3rem 0;
  margin-top: ${toRem(100)};
  box-shadow: inset 0 2px 20px rgba(0, 0, 0, 0.17);
`

const FormSection = styled.section`
  background: #fff;
  width: 100%;
  padding: 2rem 0 0;
`

const tabs = {
  REGISTRATION: 'register',
  CANCELLATION: 'cancel',
  VERIFICATION: 'verify'
}

const maybeTab = tab => (contains(tab, values(tabs)) ? tab : null)

class Registration extends Component {
  componentDidMount() {
    const tabQuery = compose(maybeTab, pathOr(null, ['matches', 'tab']))(
      this.props
    )
    if (tabQuery && tabQuery !== tabs.REGISTRATION) {
      store.actions.changeTab(tabQuery)
    } else {
      this.setTab(tabs.REGISTRATION)
    }
  }

  setTab = tab => {
    route(`/registration?tab=${encodeURIComponent(tab)}`)
  }

  handleTabChange = tab => e => {
    e.preventDefault()
    this.setTab(tab)
    store.actions.changeTab(tab)
  }

  render({
    isExpandedMobileNav,
    hideIcon,
    event,
    loadingEvent,
    isEventOpen,
    currentTab
  }) {
    return (
      <PageWrapper>
        <TopSection>
          <PageTitle>Registration</PageTitle>
          <Separator />
          <Event>
            Sign up here for the event on{' '}
            {format(event.datetime, 'MMMM Do, YYYY')}. Using the verification
            token you receive by email, you can also check or cancel your
            registration below.
          </Event>
          <TabsContainer>
            <Tabs>
              <Tab
                active={currentTab === tabs.REGISTRATION}
                onClick={this.handleTabChange(tabs.REGISTRATION)}
              >
                Registration
              </Tab>
              <Tab
                active={currentTab === tabs.CANCELLATION}
                onClick={this.handleTabChange(tabs.CANCELLATION)}
              >
                Cancellation
              </Tab>
              <Tab
                active={currentTab === tabs.VERIFICATION}
                onClick={this.handleTabChange(tabs.VERIFICATION)}
              >
                Verification
              </Tab>
            </Tabs>
            <Panel active={currentTab === tabs.REGISTRATION}>
              <RegistrationForm
                eventDate={
                  event.datetime ? format(event.datetime, 'MMMM Do, YYYY') : ''
                }
                eventId={event.id}
              />
            </Panel>
            <Panel active={currentTab === tabs.CANCELLATION}>
              <CancellationForm
                eventDate={
                  event.datetime ? format(event.datetime, 'MMMM Do, YYYY') : ''
                }
                eventId={event.id}
              />
            </Panel>
            <Panel active={currentTab === tabs.VERIFICATION}>
              <VerificationForm
                eventDate={
                  event.datetime ? format(event.datetime, 'MMMM Do, YYYY') : ''
                }
                eventId={event.id}
              />
            </Panel>
          </TabsContainer>
        </TopSection>
        <Footer color="primaryOrange" />
      </PageWrapper>
    )
  }
}

export default connect(state => ({
  currentTab: pathOr('registration', ['ui', 'currentTab'], state)
}))(Registration)
