import { h } from 'preact'
import styled from 'styled-components'
import YouTube from 'react-youtube'
import darken from 'polished/lib/color/darken'

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

const EventPanelTitle = styled.div`
  margin: 0;
  padding: 0;
  color: ${darken(0.1, theme.primaryOrange)};
  line-height: 120%;
`

const MeetupDetails = styled.small`
  padding: 0;
  line-height: 100%;
  color: ${theme.subduedTexTColor};
`

const Panel = styled(Cell)`
  text-align: left;
  padding-left: 10px;
  padding-bottom: 0;
  margin-bottom: 0;
  & > span > iframe {
    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.20);
  };
  line-height: 110%;
`

const StyledLink = styled.a`
  padding-bottom: 1px;
  text-decoration: none;
  &:hover {
    background: lightgrey;
  }
`

const VideoInfo = styled.div`
  width: 320px;
  padding: 2px;
`

const YOUTUBE_OPTS = { height: '180', width: '320' }

const EventPanel = ({ youtubeId, title, titleLink, details, startsFrom }) => {
  const speakersAndMeetup = details.split('-')
  const start = startsFrom ? `#t=${startsFrom}` : ''
  return (
    <Panel>
      {youtubeId && <YouTube videoId={youtubeId} opts={YOUTUBE_OPTS} />}
      <VideoInfo>
      {title && !titleLink && <EventPanelTitle>{title}</EventPanelTitle>}
      {title &&
      titleLink && (
        <StyledLink href={`${titleLink}${start}`}>
          <EventPanelTitle>{title}</EventPanelTitle>
        </StyledLink>
      )}
      <MeetupDetails>{speakersAndMeetup[1]}</MeetupDetails>
      </VideoInfo>
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
