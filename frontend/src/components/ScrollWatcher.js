import { h, Component } from 'preact'
import store from '../store'
import { connect } from '../preact-smitty'
import { path } from 'ramda'

class ScrollWatcher extends Component {
  onScroll = () => {
    const isScrolled = (window.pageYOffset || document.body.scrollTop) > 0
    if (isScrolled !== this.props.isScrolled) {
      console.log('changed', isScrolled)
      store.actions.setIsScrolled(isScrolled)
    }
  }

  componentDidMount() {
    // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Improving_scrolling_performance_with_passive_listeners
    window.addEventListener('scroll', this.onScroll, {
      capture: true,
      passive: true
    })
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, {
      capture: true,
      passsive: true
    })
  }

  render({ children }) {
    return <scroll-watch->{children}</scroll-watch->
  }
}

export default connect(state => ({
  isScrolled: path(['ui', 'isScrolled'], state)
}))(ScrollWatcher)
