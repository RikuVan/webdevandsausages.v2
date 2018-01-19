import { h, Component } from 'preact'
import { track } from '../preact-smitty'
import R from '../helpers'

class ScrollWatcher extends Component {
  onScroll = e => {
    const isScrolled = (window.pageYOffset || document.body.scrollTop) > 0
    if (isScrolled !== this.props.isScrolled) {
      this.props.actions.setIsScrolled(isScrolled)
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
      passive: true
    })
  }

  render({ children }) {
    return <scroll-watch->{children}</scroll-watch->
  }
}

export default track(
  'ui/IS_SCROLLED',
  'isScrolled',
  state => R.pathOr(false, ['ui', 'isScrolled'], state),
  (state, props, type, payload) =>
    R.pathOr(null, ['ui', 'isScrolled'], state) !== payload
)(ScrollWatcher)
