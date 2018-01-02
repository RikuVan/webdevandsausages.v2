import { h, Component } from 'preact'
import { route } from 'preact-router'
import styled, { css } from 'styled-components'
import { pathOr, contains, compose, values } from 'ramda'
import { connect } from '../../preact-smitty'
import opacify from 'polished/lib/color/opacify'
import transparentize from 'polished/lib/color/transparentize'
import format from 'date-fns/format'

import { theme } from '../../style/theme'
import { toRem, tablet, phone } from '../../helpers/styleHelpers'
import store from '../../store'

import PageWrapper from '../../components/PageWrapper'
import Footer from '../../components/Footer'
import RegistrationForm from './RegistrationForm'
import CancellationForm from './CancellationForm'
import VerificationForm from './VerificationForm'

const TopSection = styled.div`
  padding: ${toRem(theme.navHeight)} ${toRem(theme.pagePadding)} 50vh;
  background: linear-gradient(15deg, ${theme.primaryOrange}, ${'#52bdf6'});
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.17);
  width: 100%;
`

const TabsContainer = styled.section`
  width: 70%;
  margin: auto;
  margin-top: ${toRem(100)};
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.17);
  ${tablet(css`
    width: 80%;
    margin-top: ${toRem(150)};
  `)};
  ${phone(css`
    width: 100%;
    margin-top: ${toRem(150)};
  `)};
`

const Tabs = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

const Tab = styled.div`
  flex-grow: 1;
  max-height: ${toRem(100)};
  min-width: ${toRem(250)};
  display: inline-block;
  padding: 10px;
  vertical-align: top;
  background: transparent;
  cursor: hand;
  cursor: pointer;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid ${opacify(0.1, theme.secondaryBlue)};
  font-size: ${toRem(24)};
  color: ${theme.secondaryBlue};
  &:hover {
    background: ${transparentize(0.5, '#52bdf6')};
    border-top: 5px solid ${theme.secondaryBlue};
  }
  ${p =>
    p.active &&
    css`
      background: ${transparentize(0.4, theme.primaryOrange)};
      color: ${theme.secondaryBlue};
      border-top: 5px solid ${theme.secondaryBlue};
      border-bottom: none;
      &:hover {
        background: ${transparentize(0.3, theme.primaryOrange)};
        border-top: 5px solid ${theme.secondaryBlue};
    `};
`

const Panel = styled.div`
  min-height: 200px;
  background: ${transparentize(0.4, theme.primaryOrange)};
  display: none;
  align-items: start;
  padding: ${toRem(20)};
  ${p =>
    p.active &&
    css`
      display: flex;
      flex-direction: column;
    `};
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
