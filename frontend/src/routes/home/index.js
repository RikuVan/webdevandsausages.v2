import { h } from 'preact'
import styled, { css, keyframes } from 'styled-components'
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
import SectionTitle from '../../components/SectionTitle'
import EventConsumer from '../../components/EventConsumer'

import PreviousEvents from './PreviousEvents'
import CurrentEvent from './CurrentEvent'
import FutureEvent from './FutureEvent'
import Merchandise from './Merchandise'

import LargeLogo from '../../components/LargeLogo'

const moveSausages = keyframes`
from {background-position: bottom right;}
  to {background-position: top left;}
`

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
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.17);
  width: 100%;
  background-image: url('../../assets/witch.svg'),
    linear-gradient(15deg, ${theme.primaryOrange}, ${'#52bdf6'});
  animation: ${moveSausages} 90s linear infinite;
  background-size: 60px, auto;
  background-repeat: repeat space;
  margin-top: -30px;
`

const PreviousEventsWrapper = styled.section`
  background: #fff;
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

const RegistrationLink = () => (
  <InnerWrapper marginTop={60}>
    <ButtonLink id="register-link-button" big light href="/registration">
      Register
    </ButtonLink>
  </InnerWrapper>
)

const Loading = () => (
  <InnerWrapper>
    <Spinner />
  </InnerWrapper>
)

const Home = ({ isExpandedMobileNav }) => (
  <PageWrapper>
    <TopSection isExpandedMobileNav={isExpandedMobileNav}>
      <LargeLogo />
      <Separator />
      <MailingListForm />
    </TopSection>
    <CurrentEventWrapper>
      <SectionTitle>Our Next Meetup</SectionTitle>
      <EventConsumer
        renderLoading={() => <Loading />}
        renderOpenEvent={() => <CurrentEvent />}
        renderOpenEventWithRegistration={() => <CurrentEvent />}
        renderClosedEvent={() => <FutureEvent />}
        renderNoEvent={() => <FutureEvent />}
      />
      <EventConsumer
        renderOpenEventWithRegistration={() => <RegistrationLink />}
      />
    </CurrentEventWrapper>
    <Separator orange />
    <PreviousEventsWrapper>
      <PreviousEvents />
    </PreviousEventsWrapper>
    <Separator orange />
    <Merchandise />
    <Footer color="primaryBlue" />
  </PageWrapper>
)

export default connect(state => ({
  isExpandedMobileNav: R.pathOr(false, ['ui', 'showMobileNav'], state),
  hideIcon: R.pathEq(['ui', 'isScrolled'], true, state)
}))(Home)
