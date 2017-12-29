import { h } from 'preact'
import { Timeline } from 'react-twitter-widgets'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding-top: 50px;
  margin: 20px;
`

const TwitterTimeline = () => (
  <Wrapper>
    <Timeline
      dataSource={{
        sourceType: 'profile',
        screenName: 'webdevnsausages'
      }}
      options={{
        username: 'webdevnsausages',
        height: '600',
        width: '800'
      }}
    />
  </Wrapper>
)

export default TwitterTimeline
