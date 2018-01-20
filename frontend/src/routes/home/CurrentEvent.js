import { h, Component } from 'preact'
import { route } from 'preact-router'
import styled, { css, keyframes } from 'styled-components'
import darken from 'polished/lib/color/darken'

import { toRem, phone, tablet } from '../../helpers/styleHelpers'
import { theme } from '../../style/theme'

const EventWrapper = styled.article`
  font-size: ${toRem(20)};
  text-align: left;
  margin: auto;
  padding-top: 1rem;
  width: 50%;
  ${tablet(css`
    width: 70%;
  `)};
  ${phone(css`
    width: 90%;
  `)};
  color: ${darken(0.2, theme.iconsColor)};
`

const SponsorAnnouncement = styled.h3`
  font-size: 1.5em;
  font-family: museo_sans500_Italic, sans-serif;
  ${({ theme }) =>
    css`
      color: ${theme.primaryOrange};
    `};
`

const EventDetailLabel = styled.label`
  font-size: 24px;
  color: #fff;
  margin: 0;
  padding: 0;
`

const EventDetail = styled.p`
  margin: 0;
  padding-left: 1.5rem;
  line-height: 100%;
  font-size: 24px;
  ${({ theme }) =>
    css`
      color: #cdee69;
    `};
`

const Screen = styled.div`
  display: flex;
  flex-direction: column;
  ${({ theme }) =>
    css`
      background: ${darken(0.1, theme.primaryBlue)};
    `};
  box-sizing: border-box;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  opacity: 0.8;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
`

const Menu = styled.div`
  max-width: 1000px;
  display: flex;
  opacity: 0.7;
  height: 25px;
  background-color: #bbb;
  margin: 0 auto;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
`

const FakeButton = styled.div`
  height: 10px;
  width: 10px;
  border-radius: 50%;
  border: 1px solid #000;
  position: relative;
  top: 6px;
  left: 6px;
  background-color: #ff3b47;
  border-color: #9d252b;
  display: inline-block;
`

const FakeMinimize = styled(FakeButton)`
  left: 11px;
  background-color: #ffc100;
  border-color: #9d802c;
`

const FakeZoom = styled(FakeButton)`
  left: 16px;
  background-color: #00d742;
  border-color: #049931;
`

const blink = keyframes`
  0% {
    opacity: 0;
  };
  40% {
    opacity: 0;
  };
  50% {
    opacity: 1;
  };
  90% {
    opacity: 1;
  };
  100% {
    opacity: 0;
  };
`

const Cursor = styled.input`
  font-size: 24px;
  color: #fff;
  animation: 1s ${blink} 1s infinite;
  background: transparent;
  border: none;
  border-shadow: none;
  outline: none;
  ::placeholder {
    color: #fff;
  }
`

const SponsorLogo = styled.img`
  width: ${toRem(400)};
  padding-bottom: 20px;
  opacity: 0.9;
  transition: opacity 125ms ease-in-out;
  &:hover {
    opacity: 1;
  }
`

class CurrentEvent extends Component {
  handleKeyPress = e => {
    if (e.key === 'Enter') route('/registration')
  }
  render({ event, eventDate }) {
    return (
      <div id="current-event-console">
        <SponsorAnnouncement>Sponsored by</SponsorAnnouncement>
        {event.sponsor && (
          <a href={event.sponsorWWWLink || null}>
            <SponsorLogo
              src={`../../../assets/${event.sponsor.toLowerCase()}-logo.svg`}
            />
          </a>
        )}
        <EventWrapper>
          <Menu>
            <FakeButton />
            <FakeMinimize />
            <FakeZoom />
          </Menu>
          <Screen>
            <EventDetailLabel>$ which</EventDetailLabel>
            <EventDetail>Volume {event.volume}</EventDetail>
            <EventDetailLabel>$ when</EventDetailLabel>
            <EventDetail>{eventDate}</EventDetail>
            <EventDetailLabel>$ what</EventDetailLabel>
            <EventDetail>{event.details}</EventDetail>
            <EventDetailLabel>$ where</EventDetailLabel>
            <EventDetail>{event.location}</EventDetail>
            <EventDetailLabel>$ who</EventDetailLabel>
            <EventDetail>{event.contact}</EventDetail>
            <EventDetailLabel>[?] coming</EventDetailLabel>
            <EventDetailLabel onKeyPress={this.handleKeyPress}>
              $ <Cursor placeholder="_" />
            </EventDetailLabel>
          </Screen>
        </EventWrapper>
      </div>
    )
  }
}

export default CurrentEvent
