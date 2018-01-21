import { h, Component } from 'preact'
import { route } from 'preact-router'
import styled, { css } from 'styled-components'

import { connect } from '../../preact-smitty'
import R from '../../helpers'
import { toRem, phone, tablet } from '../../helpers/styleHelpers'

import Spinner from '../../components/Spinner'
import Notification from '../../components/Notification'
import isAfter from 'date-fns/is_after'
import subDays from 'date-fns/sub_days'

import CurrentEvent from './CurrentEvent'
import Registered from './Registered'
import WaitingList from './WaitingList'
import MailingList from './MailingList'

const views = {
  CurrentEvent,
  Registered,
  WaitingList,
  MailingList
}

export const sections = [
  'Registered',
  'Waiting List',
  'Mailing List',
  'Current Event'
]

const PageWrapper = styled.div`
  height: 100%;
  width: 100%;
`

const AdminPanelWrapper = styled.div`
  ${({ theme }) =>
    css`
      padding: ${toRem(theme.navHeight)} ${toRem(theme.pagePadding)} 50vh
        ${toRem(theme.sidebarWidth)};
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
      background: #fff;
    `};
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.17);
  height: 100%;
  width: 100%;
`

class AdminPanel extends Component {
  componentDidMount() {
    this.props.actions.toggleSidebar()
    if (!this.props.matches.section) {
      route('/__admin__/registered')
    }
    const { actions: a } = this.props
    a.broadcastNotification({ key: 'loginSuccess' })
    a.get({ key: 'allParticipants', resource: 'participants' })
    a.get({ key: 'allEvents', resource: 'events' })
  }

  componentWillUnmount() {
    this.props.actions.toggleSidebar()
  }

  render({ loadingParts, loadingEvents, matches, ...rest }) {
    const section = matches && R.dedashify(matches.section)
    const View = views[section]
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
          <View {...rest} />
        </AdminPanelWrapper>
      </PageWrapper>
    )
  }
}

const isFutureOrPresentEvent = R.compose(
  date => isAfter(new Date(date), subDays(new Date(), 1)),
  R.prop('datetime')
)
const addIndex = data => data.map((d, i) => ({ ...d, id: i + 1 }))
const safeHead = ev => (ev.length ? ev[0] : {})
const getArrayPropWithId = prop =>
  R.compose(addIndex, R.propOr([], prop), safeHead)
const toRow = pair => ({ name: pair[0], value: pair[1] })
const arrayLengths = pair =>
  R.is(Array, pair[1]) ? [pair[0], pair[1].length] : pair
const mapStateToProps = state => {
  const loadingParts = R.pathEq(
    ['api', 'allParticipants', 'status'],
    'started',
    state
  )
  const loadingEvents = R.pathEq(
    ['api', 'allEvents', 'status'],
    'started',
    state
  )
  const participants = R.pathOr([], ['api', 'allParticipants', 'data'], state)
  const events = R.pathOr([], ['api', 'allEvents', 'data'], state)
  const event = R.filter(isFutureOrPresentEvent)(events)
  const registered = getArrayPropWithId('registered')(event)
  const waitListed = getArrayPropWithId('waitListed')(event)
  const currentEvent = R.compose(
    R.map(toRow),
    R.map(arrayLengths),
    R.toPairs,
    safeHead
  )(event)
  const eventId = R.pathOr(null, [0, 'id'], event)
  return {
    loadingParts,
    loadingEvents,
    participants,
    events,
    currentEvent,
    registered,
    waitListed,
    eventId
  }
}

export default connect(mapStateToProps)(AdminPanel)
