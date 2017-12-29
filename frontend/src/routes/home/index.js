import { h, Component } from 'preact'
import styled, { css } from 'styled-components'
import { connect } from '../../preact-smitty'
import { pathOr, pathEq } from 'ramda'
import darken from 'polished/lib/color/darken'

import { toRem, tablet, phone } from '../../helpers/styleHelpers'
import MailingListForm from '../../components/forms/MailingListForm'
import { theme } from '../../style/theme'
import Spinner from '../../components/Spinner'
import { ButtonLink } from '../../components/Button'

import FireyTitle from './FireyTitle'
import TwitterTimeline from './TwitterTimeline'

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
  text-shadow: 0 0 10px #52bdf6, 0 0 20px #52bdf6, 0 0 30px #52bdf6,
    0 0 40px #fefcc9, 0 0 70px #fefcc9, 0 0 80px #fefcc9, 0 0 100px #fefcc9,
    0 0 150px #fefcc9;
`

const EventSection = styled.article`
  background: #fff
  min-height: 50vh;
  width: 100%;
`
const Footer = styled.article`
  background: #52bdf6;
  min-height: 20vh;
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

const EventInfoWrapper = styled.article`
  font-size: ${toRem(20)};
  text-align: left;
  margin: auto;
  width: 50%;
  color: ${darken(0.2, theme.iconsColor)};
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
`

const SponsorAnnouncement = styled.h3`
  font-size: 1.5em;
  font-family: museo_sans500_Italic, sans-serif;
  color: #367db7;
`

const EventDetailLabel = styled.label`
  font-weight: bold;
  color: #111;
  margin: 0;
  padding: 0;
`

const EventDetail = styled.p`
  margin: 0;
  padding-left: 1.5rem;
  line-height: 100%;
`
const SausageIcon = () => (
  <svg
    width="19px"
    height="13px"
    viewBox="0 0 19 13"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      stroke="none"
      stroke-width="1"
      fill="none"
      fill-rule="evenodd"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <g transform="translate(1.000000, 1.000000)" stroke="#000000">
        <path
          d="M16.416,5.364 C16.379,8.125 14.111,10.334 11.349,10.297 L5.516,10.219 C2.755,10.182 0.546,7.914 0.583,5.152 C0.62,2.391 2.888,0.182 5.65,0.219 L11.483,0.297 C14.245,0.334 16.453,2.603 16.416,5.364 Z"
          stroke-width="2"
        />
        <path d="M8.5,0.219 L8.5,4.841" id="Shape" />
        <path d="M5.418,0.635 L5.418,3.363" id="Shape" />
        <path d="M11.574,0.635 L11.574,3.363" id="Shape" />
      </g>
    </g>
  </svg>
)

class Home extends Component {
  render({ isExpandedMobileNav, hideIcon, event, loadingEvent }) {
    const eventDate = event.datetime
      ? format(event.datetime, 'MMMM Do, YYYY, HH:mm')
      : ''
    return (
      <Wrapper>
        <TopSection isExpandedMobileNav={isExpandedMobileNav}>
          <FireyTitle
            isExpandedMobileNav={isExpandedMobileNav}
            hideIcon={hideIcon}
          />
          <Seperator />
          <Title>Our Next Meetup</Title>
          {loadingEvent ? (
            <InnerWrapper>
              <Spinner />
            </InnerWrapper>
          ) : (
            <div>
              <SponsorAnnouncement>
                Sponsored by {event.sponsor}
              </SponsorAnnouncement>
              <EventInfoWrapper>
                <EventDetailLabel>
                  <SausageIcon /> Details
                </EventDetailLabel>
                <EventDetail>{event.details}</EventDetail>
                <EventDetailLabel>
                  <SausageIcon /> When
                </EventDetailLabel>
                <EventDetail>{eventDate}</EventDetail>
                <EventDetailLabel>
                  <SausageIcon /> Where
                </EventDetailLabel>
                <EventDetail>{event.location}</EventDetail>
                <EventDetailLabel>
                  <SausageIcon /> Contact
                </EventDetailLabel>
                <EventDetail>{event.contact}</EventDetail>
              </EventInfoWrapper>
            </div>
          )}
          <InnerWrapper marginTop={60}>
            <ButtonLink href="/registration">Register</ButtonLink>
          </InnerWrapper>
          <Seperator />
          <MailingListForm />
        </TopSection>
        <EventSection>
          <TwitterTimeline />
        </EventSection>
        <Footer />
      </Wrapper>
    )
  }
}

export default connect(state => ({
  isExpandedMobileNav: pathOr(false, ['ui', 'showMobileNav'], state),
  hideIcon: pathEq(['ui', 'isScrolled'], true, state)
}))(Home)
