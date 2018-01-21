import { h, Component } from 'preact'
import { route } from 'preact-router'
import styled, { css } from 'styled-components'
import R from '../../helpers'
import { connect } from '../../preact-smitty'
import format from 'date-fns/format'

import { theme } from '../../style/theme'
import { toRem, tablet, phone } from '../../helpers/styleHelpers'

import PageWrapper from '../../components/PageWrapper'
import Footer from '../../components/Footer'
import Separator from '../../components/Separator'
import { Tabs, Tab } from '../../components/Tabs'
import Panel from '../../components/Panel'
import PageTitle from '../../components/PageTitle'
import Spinner from '../../components/Spinner'

import RegistrationForm from './RegistrationForm'
import CancellationForm from './CancellationForm'
import VerificationForm from './VerificationForm'

const TopSection = styled.div`
  padding: ${toRem(theme.navHeight)} 0 30vh;
  background: linear-gradient(15deg, ${theme.primaryOrange}, ${'#52bdf6'});
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.17);
  width: 100%;
  ${({ isExpandedMobileNav, theme }) =>
    isExpandedMobileNav &&
    tablet(css`
      padding-top: ${toRem(theme.navHeight * 1.8)};
    `)};
  ${({ isExpandedMobileNav, theme }) =>
    isExpandedMobileNav &&
    phone(css`
      padding-top: ${toRem(theme.navHeight * 2.5)};
    `)};
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

const tabs = {
  REGISTRATION: 'register',
  CANCELLATION: 'cancel',
  VERIFICATION: 'verify'
}

const maybeTab = tab => (R.contains(tab, R.values(tabs)) ? tab : null)

class Registration extends Component {
  setTab = tab => {
    route(`/registration?tab=${encodeURIComponent(tab)}`, true)
  }

  handleTabChange = tab => e => {
    this.setTab(tab)
  }

  getTab = (props = this.props) =>
    R.compose(maybeTab, R.pathOr(null, ['matches', 'tab']))(props)

  componentDidMount() {
    if (!this.getTab()) {
      this.setTab(tabs.REGISTRATION)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.getTab(nextProps)) {
      this.setTab(tabs.REGISTRATION)
    }
  }

  renderForm = (FormComponent, loading, { datetime, id }) => {
    if (loading) {
      return <Spinner marginTop="80" />
    }
    return (
      <FormComponent
        eventDate={datetime ? format(datetime, 'MMMM Do, YYYY') : ''}
        eventId={id}
      />
    )
  }

  render({ isExpandedMobileNav, hideIcon, event, loadingEvent, isEventOpen }) {
    const tab = this.getTab()
    return (
      <PageWrapper>
        <TopSection isExpandedMobileNav={isExpandedMobileNav}>
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
                id={tabs.REGISTRATION}
                active={tab === tabs.REGISTRATION}
                onClick={this.handleTabChange(tabs.REGISTRATION)}
              >
                Registration
              </Tab>
              <Tab
                id={tabs.CANCELLATION}
                active={tab === tabs.CANCELLATION}
                onClick={this.handleTabChange(tabs.CANCELLATION)}
              >
                Cancellation
              </Tab>
              <Tab
                id={tabs.VERIFICATION}
                active={tab === tabs.VERIFICATION}
                onClick={this.handleTabChange(tabs.VERIFICATION)}
              >
                Verification
              </Tab>
            </Tabs>
            <Panel active={tab === tabs.REGISTRATION}>
              {this.renderForm(RegistrationForm, loadingEvent, event)}
            </Panel>
            <Panel active={tab === tabs.CANCELLATION}>
              {this.renderForm(CancellationForm, loadingEvent, event)}
            </Panel>
            <Panel active={tab === tabs.VERIFICATION}>
              {this.renderForm(VerificationForm, loadingEvent, event)}
            </Panel>
          </TabsContainer>
        </TopSection>
        <Footer color="primaryOrange" />
      </PageWrapper>
    )
  }
}

export default connect(state => ({
  isExpandedMobileNav: R.pathOr(false, ['ui', 'showMobileNav'], state)
}))(Registration)
