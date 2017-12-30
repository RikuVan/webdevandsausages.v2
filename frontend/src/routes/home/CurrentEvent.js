import { h } from 'preact'
import styled from 'styled-components'
import darken from 'polished/lib/color/darken'

import { toRem } from '../../helpers/styleHelpers'
import { theme } from '../../style/theme'

import SausageIcon from '../../components/SausageIcon'

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

const CurrentEvent = ({ event, eventDate }) => (
  <div>
    <SponsorAnnouncement>Sponsored by {event.sponsor}</SponsorAnnouncement>
    <EventWrapper>
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
    </EventWrapper>
  </div>
)

export default CurrentEvent
