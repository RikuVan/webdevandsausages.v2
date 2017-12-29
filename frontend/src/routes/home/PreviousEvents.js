import { h, Component } from 'preact'
import styled, { css } from 'styled-components'
import YouTube from 'react-youtube'

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

const EventPanel = ({
  youtubeId,
  speakers,
  title,
  titleLink,
  links,
  details
}) => {
  const speakersAndMeetup = details.split('-')
  return (
    <Cell>
      {title && !titleLink && <EventPanelTitle>{title}</EventPanelTitle>}
      {title &&
        titleLink && (
          <a href={titleLink}>
            <EventPanelTitle>{title}</EventPanelTitle>
          </a>
        )}
      <MeetupDetails>{speakersAndMeetup[0]}</MeetupDetails>
      <MeetupDetails>{speakersAndMeetup[1]}</MeetupDetails>
      {youtubeId && <YouTube videoId={youtubeId} opts={YOUTUBE_OPTS} />}
      {links &&
        links.length &&
        links.map(l => (
          <a href={l.href} key={href}>
            {l.title}
          </a>
        ))}
    </Cell>
  )
}

const PreviousEvents = () => {
  return (
    <Wrapper>
      <EventTitle>Previous Events</EventTitle>
      <Grid columns="repeat(auto-fit,minmax(330px,1fr))">
        <EventPanel
          youtubeId="pPxpUJyg1ss"
          title="The Micro-Christmas Hackathon"
          titleLink="https://battle3.site/"
          details="Leo Melin, Richard Van Camp, Teemu Erkkola - Vol. 4, Wapice, 2017-08-17"
        />
        <EventPanel
          youtubeId="1n4BbAfbt5w"
          title="WB&S Coders' quiz"
          details="Richard Van Camp, Mikko Matilainen & Leo Melin - Vol. 4, Wapice, 2017-08-17"
        />
        <EventPanel
          youtubeId="i78KpYX9ooc"
          title="Why some API's suck"
          details="Viljami Kuosmanen - Vol. 4, Wapice, 2017-08-17"
        />
        <EventPanel
          youtubeId="4YKilvpDOFI"
          title="Uh...Yeah...Let's talk about Polymer, then..."
          details="Fabiano Brito & André Valgrande - Vol. 4, Wapice, 2017-08-17"
        />
        <EventPanel
          youtubeId="QOz3mdlSr5k"
          title="One microservice success story"
          details="Jaakko Takaluoma - Vol. 4, Wapice, 2017-08-17"
        />
        <EventPanel
          youtubeId="JXKIaZRJAS0"
          title="The Web Assembly Challenge"
          details="Teemu Erkkola, Jaakko Huuso, & Rick VC - Vol. 3, Vincit, 2017-01-11"
        />
        <EventPanel
          youtubeId="JXKIaZRJAS0"
          title="Skip the backend completely using Nginx + embedded Luo"
          details="Onni Hakala - Vol. 3, Vincit, 2017-01-11"
        />
        <EventPanel
          youtubeId="dlJLDoJ0OqQ"
          title="Web Audio"
          details="Tero Parviainen - Vol 1., Gofore, 2016-08-18"
        />

        <EventPanel
          youtubeId="iu0w96wKJEk"
          title="CSS Modules"
          details="Riku Ruovila - Vol 1., Gofore, 2016-08-18"
        />
        <EventPanel
          youtubeId="nEn5k_HXeNc"
          title="React API design: Case Rectabular"
          details="Juho Vepsäläinen - Vol 1., Gofore, 2016-08-18"
        />
        <EventPanel
          youtubeId="R_Ac8l4BifI"
          title="A sneak peek at WebAssembly"
          details="Leo Melin - Vol 1., Gofore, 2016-08-18"
        />
      </Grid>
    </Wrapper>
  )
}

export default PreviousEvents
