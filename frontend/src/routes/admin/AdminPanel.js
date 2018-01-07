import { h, Component } from 'preact'
import { route } from 'preact-router'
import styled, { css } from 'styled-components'

import { connect } from '../../preact-smitty'
import R from '../../helpers'
import { toRem, phone, tablet } from '../../helpers/styleHelpers'

import Spinner from '../../components/Spinner'
import Notification from '../../components/Notification'
import { Tabs, Tab } from '../../components/Tabs'
import Panel from '../../components/Panel'
import Table, { Row, Column } from '../../components/Table'

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: center;
  color: white;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
`

const AdminPanelWrapper = styled.div`
  ${({ theme }) =>
    css`
      padding: ${toRem(theme.navHeight)} ${toRem(theme.pagePadding)} 50vh;
    `};
  ${({ isExpandedMobileNav, theme }) =>
    isExpandedMobileNav &&
    tablet(css`
      padding-top: ${toRem(theme.navHeight * 1.8)};
    `)} ${({ isExpandedMobileNav, theme }) =>
      isExpandedMobileNav &&
      phone(css`
        padding-top: ${toRem(theme.navHeight * 2.2)};
      `)};
  ${({ theme }) =>
    css`
      background: linear-gradient(
        15deg,
        ${theme.primaryOrange},
        ${theme.primaryBlue}
      );
    `};
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.17);
  height: 100%;
  width: 100%;
`

const TabsContainer = styled.section`
  width: 100%;
  background: transparent;
  margin: 0;
  padding: 3rem 0;
  margin-top: ${toRem(100)};
`

const InnerPanel = styled.div`
  min-width: 1000px;
`

const tabs = {
  MAILING_LIST: 'mailingList',
  EVENTS: 'events'
}

const maybeTab = tab => (R.contains(tab, R.values(tabs)) ? tab : null)

class AdminPanel extends Component {
  setTab = tab => {
    route(`/__admin__?tab=${encodeURIComponent(tab)}`)
  }

  handleTabChange = tab => e => {
    this.setTab(tab)
  }

  getTab = (props = this.props) =>
    R.compose(maybeTab, R.pathOr(null, ['matches', 'tab']))(props)

  componentDidMount() {
    if (!this.getTab()) {
      this.setTab(tabs.MAILING_LIST)
    }
    const { actions: a } = this.props
    a.flashNotification({ key: 'loginSuccess' })
    a.get({ key: 'allParticipants', resource: 'participants' })
    a.get({ key: 'allEvents', resource: 'events' })
  }

  componentWillReceiveProps(nextProps) {
    if (!this.getTab(nextProps)) {
      this.setTab(tabs.MAILING_LIST)
    }
  }

  render({ participants, events, loadingParts, loadingEvents }) {
    const tab = this.getTab()
    if (loadingEvents || loadingParts) {
      return (
        <PageWrapper>
          <AdminPanelWrapper>
            <Notification
              type="success"
              id="loginSuccess"
              defaultMessage="You are authenticated"
            />
            <Spinner />
          </AdminPanelWrapper>
        </PageWrapper>
      )
    }
    return (
      <PageWrapper>
        <AdminPanelWrapper>
          <TabsContainer>
            <Tabs width="90%">
              <Tab
                active={tab === tabs.MAILING_LIST}
                onClick={this.handleTabChange(tabs.MAILING_LIST)}
              >
                Mailing List
              </Tab>
              <Tab
                active={tab === tabs.EVENTS}
                onClick={this.handleTabChange(tabs.EVENTS)}
              >
                Events
              </Tab>
            </Tabs>
            <Panel active={tab === tabs.MAILING_LIST} width="90%">
              <InnerPanel>
                <Table
                  head={[
                    'Email',
                    'Last Name',
                    'First Name',
                    'Affiliation',
                    'Joined',
                    'Active'
                  ]}
                >
                  {participants.map(p => (
                    <Row>
                      <Column>{p.email}</Column>
                      <Column>{p.lastName}</Column>
                      <Column>{p.firstName}</Column>
                      <Column>{p.affiliation}</Column>
                      <Column>{p.insertedOn}</Column>
                      <Column>{p.receivesMail ? 'x' : ''}</Column>
                    </Row>
                  ))}
                </Table>
              </InnerPanel>
            </Panel>
            <Panel active={tab === tabs.EVENTS} width="90%">
              <InnerPanel>
                <Table
                  head={[
                    'When',
                    'Where',
                    'Sponsor',
                    'Opens',
                    'Closes',
                    'Max Participants'
                  ]}
                >
                  {events.map(e => (
                    <Row>
                      <Column>{e.datetime}</Column>
                      <Column>{e.location}</Column>
                      <Column>{e.sponsor}</Column>
                      <Column>{e.registrationOpens}</Column>
                      <Column>{e.registrationCloses}</Column>
                      <Column>{e.maxParticipants}</Column>
                    </Row>
                  ))}
                </Table>
              </InnerPanel>
              <pre>{JSON.stringify(events, null, 2)}</pre>
            </Panel>
          </TabsContainer>
        </AdminPanelWrapper>
      </PageWrapper>
    )
  }
}

const mapStateToProps = state => ({
  loadingParts: R.pathEq(
    ['api', 'allParticipants', 'status'],
    'started',
    state
  ),
  loadingEvents: R.pathEq(['api', 'allEvents', 'status'], 'started', state),
  participants: R.pathOr([], ['api', 'allParticipants', 'data'], state),
  events: R.pathOr([], ['api', 'allEvents', 'data'], state)
})

export default connect(mapStateToProps)(AdminPanel)
