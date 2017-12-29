import { h } from 'preact'
import { Timeline } from 'react-twitter-widgets'

const TwitterTimeline = () => (
  <Timeline
    dataSource={{
      sourceType: 'profile',
      screenName: 'webdevnsausages'
    }}
    options={{
      username: 'webdevnsausages',
      height: '600',
      width: '400'
    }}
  />
)

export default TwitterTimeline
