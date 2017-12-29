import { h } from 'preact'
import styled from 'styled-components'
import YouTube from 'react-youtube'

import events from '../../../../events.json'
import { theme } from '../../style/theme'
import { Grid, Cell } from '../../components/layout'

const Wrapper = styled.div`
  padding-top: 30px;
  minheight: 20vh;
  width: 100%;
`

const EventTitle = styled.h1`
  font-size: 2.5rem;
  color: #f7b733;
  font-weight: 700;
`

const EventPanelTitle = styled.h4`
  margin: 0;
  padding: 0;
  color: ${theme.subduedTexTColor};
  line-height: 100%;
`

const MeetupDetails = styled.div`
  margin: 10px 10px;
  padding: 0;
  line-height: 100%;
  color: ${theme.subduedTexTColor};
`

const YOUTUBE_OPTS = { height: '180', width: '320' }

const EventPanel = ({ youtubeId, title, titleLink, details, startsFrom }) => {
  const speakersAndMeetup = details.split('-')
  const start = startsFrom ? `#t=${startsFrom}` : ''
  return (
    <Cell>
      {title && !titleLink && <EventPanelTitle>{title}</EventPanelTitle>}
      {title &&
        titleLink && (
          <a href={`${titleLink}${start}`}>
            <EventPanelTitle>{title}</EventPanelTitle>
          </a>
        )}
      <MeetupDetails>{speakersAndMeetup[0]}</MeetupDetails>
      <MeetupDetails>{speakersAndMeetup[1]}</MeetupDetails>
      {youtubeId && <YouTube videoId={youtubeId} opts={YOUTUBE_OPTS} />}
    </Cell>
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
