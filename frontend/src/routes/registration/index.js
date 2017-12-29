import { h, Component } from 'preact'

export default class About extends Component {
  // update the current time
  updateTime = () => {
    this.setState({ time: Date.now() })
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 })
  }

  // gets called when this route is navigated to
  componentDidMount() {
    // start a timer for the clock:
    this.timer = setInterval(this.updateTime, 1000)
  }

  // gets called just before navigating away from the route
  componentWillUnmount() {
    clearInterval(this.timer)
  }

  // Note: `user` comes from the URL, courtesy of our router
  render({ event }) {
    return (
      <div>
        <h1>Registration:</h1>
        <pre>{JSON.stringify(event, null, 2)}</pre>
      </div>
    )
  }
}
