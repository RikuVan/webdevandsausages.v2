import { h } from 'preact'
import styled, { css } from 'styled-components'
import darken from 'polished/lib/color/darken'
import lighten from 'polished/lib/color/lighten'

import { toRem } from '../../helpers/styleHelpers'
import { theme } from '../../style/theme'

//import SausageIcon from '../../components/SausageIcon'

const EventWrapper = styled.article`
  font-size: ${toRem(20)};
  text-align: left;
  margin: auto;
  width: 50%;
  color: ${darken(0.2, theme.iconsColor)};
`

const SponsorAnnouncement = styled.h3`
  font-size: 1.5em;
  font-family: museo_sans500_Italic, sans-serif;
  ${({ theme }) =>
    css`
      color: ${lighten(0.8, theme.iconsColor)};
    `};
`

const EventDetailLabel = styled.label`
  text-transform: uppercase;
  color: #fff;
  margin: 0;
  padding: 0;
`

const EventDetail = styled.p`
  margin: 0;
  padding-left: 1.5rem;
  line-height: 100%;
  ${({ theme }) =>
    css`
      color: ${darken(0.1, theme.secondaryBlue)};
    `};
`

const CurrentEvent = ({ event, eventDate }) => (
  <div>
    <SponsorAnnouncement>Sponsored by {event.sponsor}</SponsorAnnouncement>
    <EventWrapper>
      <EventDetailLabel># Details</EventDetailLabel>
      <EventDetail>{event.details}</EventDetail>
      <EventDetailLabel># When</EventDetailLabel>
      <EventDetail>{eventDate}</EventDetail>
      <EventDetailLabel># Where</EventDetailLabel>
      <EventDetail>{event.location}</EventDetail>
      <EventDetailLabel># Contact</EventDetailLabel>
      <EventDetail>{event.contact}</EventDetail>
    </EventWrapper>
  </div>
)

export default CurrentEvent
