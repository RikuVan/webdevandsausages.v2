import { h } from 'preact'
import styled, { css } from 'styled-components'
import { connect } from '../../preact-smitty'
import R from '../../helpers'

import { toRem, tablet, phone } from '../../helpers/styleHelpers'
import MailingListForm from './MailingListForm'
import { theme } from '../../style/theme'
import Spinner from '../../components/Spinner'
import { ButtonLink } from '../../components/Button'
import PageWrapper from '../../components/PageWrapper'
import Footer from '../../components/Footer'
import Separator from '../../components/Separator'
import SausageIcon from '../../components/SausageIcon'

import MainTitle from './MainTitle'
import PreviousEvents from './PreviousEvents'
import CurrentEvent from './CurrentEvent'
import FutureEvent from './FutureEvent'

import format from 'date-fns/format'

const TopSection = styled.div`
  padding: ${toRem(theme.navHeight)} ${toRem(theme.pagePadding)};
  ${p =>
    p.isExpandedMobileNav &&
    tablet(css`
      padding-top: ${toRem(theme.navHeight * 1.8)};
    `)};
  ${p =>
    p.isExpandedMobileNav &&
    phone(css`
      padding-top: ${toRem(theme.navHeight * 2.2)};
    `)};
  background: linear-gradient(15deg, ${theme.primaryOrange}, ${'#52bdf6'});
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.17);
  width: 100%;
`

const Title = styled.h2`
  font-size: 2.5rem;
  ${({ theme }) =>
    css`
      color: ${theme.primaryOrange};
    `};
  font-weight: 700;
`

const PreviousEventsWrapper = styled.section`
  background: #fff
  min-height: 50vh;
  width: 100%;
  padding-bottom: 5rem;
`

const CurrentEventWrapper = styled.section`
  width: 100%;
  padding: 2rem 0 3rem;
`

const InnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: auto;
  ${p =>
    p.marginTop &&
    css`
      margin-top: ${toRem(p.marginTop)};
    `};
  ${p =>
    p.marginBottom &&
    css`
      margin-top: ${toRem(p.marginBottom)};
    `};
`

const getEventUi = (loadingEvent, isEventOpen, event, eventDate) => {
  if (loadingEvent) {
    return (
      <InnerWrapper>
        <Spinner />
      </InnerWrapper>
    )
  } else if (event && isEventOpen) {
    const eventDate = event.datetime
      ? format(event.datetime, 'MMMM Do, YYYY, HH:mm')
      : ''
    return <CurrentEvent event={event} eventDate={eventDate} />
  }
  return <FutureEvent />
}

const Home = ({
  isExpandedMobileNav,
  hideIcon,
  event,
  loadingEvent,
  isEventOpen
}) => (
  <PageWrapper>
    <TopSection isExpandedMobileNav={isExpandedMobileNav}>
      <MainTitle
        isExpandedMobileNav={isExpandedMobileNav}
        hideIcon={hideIcon}
      />
      <SausageIcon />
      <Separator />
      <MailingListForm />
    </TopSection>
    <CurrentEventWrapper>
      <Title isActive={isEventOpen}>Our Next Meetup</Title>
      {getEventUi(loadingEvent, isEventOpen, event)}
      {!loadingEvent &&
        isEventOpen && (
          <InnerWrapper marginTop={60}>
            <ButtonLink
              id="register-link-button"
              big
              light
              href="/registration"
            >
              Register
            </ButtonLink>
          </InnerWrapper>
        )}
    </CurrentEventWrapper>
    <Separator orange />
    <PreviousEventsWrapper>
      <PreviousEvents />
    </PreviousEventsWrapper>
    <Footer color="primaryBlue" />
  </PageWrapper>
)

export default connect(state => ({
  isExpandedMobileNav: R.pathOr(false, ['ui', 'showMobileNav'], state),
  hideIcon: R.pathEq(['ui', 'isScrolled'], true, state)
}))(Home)
