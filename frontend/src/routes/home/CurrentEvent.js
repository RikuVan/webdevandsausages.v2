import { h } from 'preact'
import styled from 'styled-components'
import darken from 'polished/lib/color/darken'

import { toRem } from '../../helpers/styleHelpers'
import { theme } from '../../style/theme'

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
