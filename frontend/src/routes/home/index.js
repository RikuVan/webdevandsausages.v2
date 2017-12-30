import { h, Component } from 'preact'
import styled, { css } from 'styled-components'
import { connect } from '../../preact-smitty'
import { pathOr, pathEq } from 'ramda'

import { toRem, tablet, phone } from '../../helpers/styleHelpers'
import MailingListForm from '../../components/forms/MailingListForm'
import { theme } from '../../style/theme'
import Spinner from '../../components/Spinner'
import { ButtonLink } from '../../components/Button'

import FireyTitle from './FireyTitle'
import TwitterTimeline from './TwitterTimeline'
import PreviousEvents from './PreviousEvents'
import CurrentEvent from './CurrentEvent'

import format from 'date-fns/format'

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: top;
  align-items: center;
  text-align: center;
  color: white;
  box-sizing: border-box;
  min-height: 60vh;
`

const TopSection = styled.div`
  padding: ${toRem(theme.navHeight)} ${toRem(theme.pagePadding)};
  ${p =>
    p.isExpandedMobileNav &&
    tablet(css`
      padding-top: ${toRem(theme.navHeight * 1.8)};
    `)} ${p =>
      p.isExpandedMobileNav &&
      phone(css`
        padding-top: ${toRem(theme.navHeight * 2.2)};
      `)};
  background: linear-gradient(15deg, ${'#52bdf6'}, ${'#f7b733'});
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.17);
  width: 100%;
`

const Title = styled.h2`
  font-size: 2rem;
  color: #367db7;
  ${p =>
    p.isActive &&
    css`
      text-shadow: 0 0 10px #52bdf6, 0 0 20px #52bdf6, 0 0 30px #52bdf6,
        0 0 40px #fefcc9, 0 0 70px #fefcc9, 0 0 80px #fefcc9, 0 0 100px #fefcc9,
        0 0 150px #fefcc9;
    `};
`

const PreviousEventsWrapper = styled.section`
  background: #fff
  min-height: 50vh;
  width: 100%;
  padding-bottom: 5rem;
`
const Footer = styled.article`
  background: #52bdf6;
  min-height: 10vh;
  width: 100%;
`

const Seperator = styled.hr`
  width: 50%;
  border: 0;
  height: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(8, 94, 140, 0.3);
  margin-top: 2rem;
  margin-bottom: 2rem;
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

const NoEventText = styled.div`
  color: #367db7;
  padding-top: 2rem;
  font-size: 1.5rem;
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
  return (
    <NoEventText>
      The next event is the planning stages. Stay Tuned!
    </NoEventText>
  )
}

const Home = ({
  isExpandedMobileNav,
  hideIcon,
  event,
  loadingEvent,
  isEventOpen
}) => (
  <Wrapper>
    <TopSection isExpandedMobileNav={isExpandedMobileNav}>
      <FireyTitle
        isExpandedMobileNav={isExpandedMobileNav}
        hideIcon={hideIcon}
      />
      <Seperator />
      <Title isActive={isEventOpen}>Our Next Meetup</Title>
      {getEventUi(loadingEvent, isEventOpen, event)}
      {!loadingEvent &&
        isEventOpen && (
          <InnerWrapper marginTop={60}>
            <ButtonLink href="/registration">Register</ButtonLink>
          </InnerWrapper>
        )}
      <Seperator />
      <MailingListForm />
    </TopSection>
    <PreviousEventsWrapper>
      <PreviousEvents />
    </PreviousEventsWrapper>
    <Footer />
  </Wrapper>
)

export default connect(state => ({
  isExpandedMobileNav: pathOr(false, ['ui', 'showMobileNav'], state),
  hideIcon: pathEq(['ui', 'isScrolled'], true, state)
}))(Home)
