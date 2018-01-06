import { h } from 'preact'
import styled from 'styled-components'
import darken from 'polished/lib/color/darken'

import events from '../../../../events.json'
import { theme } from '../../style/theme'
import { Grid, Cell } from '../../components/layout'

const Wrapper = styled.div`
  min-height: 20vh;
  width: 100%;
  background: #fff;
`

const EventTitle = styled.h1`
  font-size: 2.5rem;
  color: #f7b733;
  font-weight: 700;
  padding: 2rem 0;
`

const EventPanelTitle = styled.div`
  margin: 0;
  padding: 5px 0 0;
  color: ${darken(0.1, theme.primaryOrange)};
  line-height: 120%;
  text-align: center;
`

const MeetupDetails = styled.small`
  padding: 0;
  line-height: 100%;
  color: ${theme.subduedTexTColor};
  padding: 0 0 3px;
`

const Panel = styled(Cell)`
  padding-left: 10px;
  padding-bottom: 0;
  margin-bottom: 0;
  & > a > img {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
  line-height: 110%;
`

const StyledLink = styled.a`
  padding-bottom: 1px;
  text-decoration: none;
  &:hover {
    background: lightgrey;
  }
  padding: 3px 0 0;
`

const EventPanel = ({ youtubeId, title, titleLink, details, startsFrom }) => {
  const speakersAndMeetup = details.split('-')
  const start = startsFrom ? `#t=${startsFrom}` : ''
  return (
    <Panel middle>
      <a
        href={`https://youtu.be/${youtubeId}?list=PLzTZiC7Lgr5PXKGvz8Y9xPTrLRYI5dVhx`}
      >
        <img
          src={`https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`}
          alt="Youtube video"
        />
      </a>{' '}
      {title && !titleLink && <EventPanelTitle>{title}</EventPanelTitle>}
      {title &&
        titleLink && (
          <StyledLink href={`${titleLink}${start}`}>
            <EventPanelTitle>{title}</EventPanelTitle>
          </StyledLink>
        )}
      <MeetupDetails>{speakersAndMeetup[1]}</MeetupDetails>
    </Panel>
  )
}

const PreviousEvents = () => (
  <Wrapper>
    <EventTitle>Previous Events</EventTitle>
    <Grid columns="repeat(auto-fit,minmax(330px,1fr))">
      {events.talks.map(t => (
        <EventPanel
          title={t.title}
          titleLink={t.titleLink}
          details={t.details}
          youtubeId={t.youtubeId}
          startsFrom={t.startsFrom}
        />
      ))}
    </Grid>
  </Wrapper>
)

export default PreviousEvents
