import {h, Component} from 'preact'
import styled, {css, keyframes} from 'styled-components'
import transparentize from 'polished/lib/color/transparentize'

import { phone, tablet } from '../helpers/styleHelpers'
import {connect} from '../preact-smitty'
import R from '../helpers'
import Button from './Button'

const showAlert = keyframes`
   0% {
    transform: scale(1);
  }
  1% {
    transform: scale(0.5);
  }

  45% {
    transform: scale(1.05);
  }

  80% {
    transform: scale(0.95);
  }

  100% {
    transform: scale(1);
  }
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 0; /* Remove gap between inline-block elements */
  overflow-y: auto;
  ${({theme}) =>
    css`
      background-color: ${transparentize(0.5, theme.primaryBlue)};
    `};
  z-index: 10000;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s;
  &::before {
    content: ' ';
    display: inline-block;
    vertical-align: middle; /* vertical alignment of the inline element */
    height: 100%;
  }
  ${({show}) =>
    show &&
    css`
      opacity: 1;
      pointer-events: auto;
    `};
`

const Footer = styled.div`
  text-align: right;
  padding-top: 13px;
  margin-top: 13px;
  padding: 13px 16px;
  border-radius: inherit;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  margin: 5px;
  display: inline-block;
  position: relative;
`

const Popup = styled.div`
  opacity: 1;
  width: 600px;
   ${tablet(css`
     width: 450px;
  `)};
   ${phone(css`
    width: 350px;
  `)};
  pointer-events: auto;
  background-color: white;
  text-align: center;
  border-radius: 5px;
  position: static;
  margin: 20px auto;
  display: inline-block;
  vertical-align: middle;
  transform: scale(1);
  transform-origin: 50% 50%;
  z-index: 10001;
  transition: transform 0.3s, opacity 0.2s;
  animation: ${showAlert} 0.3s;
  border-radius: 3px;
`

const Content = styled.div`
  padding: 0 20px;
  margin-top: 20px;
  font-size: initial;
  &:last-child {
    margin-bottom: 20px;
  }
`

const Text = styled.div`
  font-size: 1.2rem;
  position: relative;
  float: none;
  line-height: normal;
  vertical-align: top;
  text-align: left;
  display: inline-block;
  margin: 0;
  padding: 0 10px;
  color: #333;
  max-width: calc(100% - 20px);
  overflow-wrap: break-word;
  box-sizing: border-box;
  &:first-child {
    margin-top: 45px;
  }
  &:last-child {
    margin-bottom: 45px;
  }
`

const Title = styled.div`
  font-size: 1.5rem;
  ${({theme}) =>
    css`
      color: ${theme.primaryOrange};
    `};
  font-weight: 600;
  text-transform: none;
  position: relative;
  display: block;
  padding: 13px 16px;
  line-height: normal;
  text-align: center;
  margin-bottom: 0px;
  &:first-child {
    margin-top: 26px;
  }
  &:not(:first-child) {
    padding-bottom: 0;
  }
  &:not(:last-child) {
    margin-bottom: 13px;
  }
`

class PopupNotification extends Component {
  closePopup = () => {
    const {key, onClose, actions} = this.props
    actions.closePopupNotification({key})
    onClose && onClose()
  }

  componentWillReceiveProps({show}) {
    const {show: wasShowing} = this.props
    if (show) {
      document.addEventListener('click', this.handleOutsideClick, false)
    } else if (wasShowing && !show) {
      document.removeEventListener('click', this.handleOutsideClick, false)
    }
  }

  handleOutsideClick = ({target}) => {
    // ignore clicks on the component itself
    const clickedId = R.pathOr('', ['classList', 'value'], target)
    const popupId = R.pathOr('', ['base', 'className'], this.node)

    if (clickedId === popupId) {
      return
    }

    this.closePopup()
  }

  render({type, title, show, text}) {
    return (
      <Overlay show={show} tabIndex={-1}>
        {show && (
          <Popup
            ref={node => {
              this.node = node
            }}
            type={type}
          >
            <Title>{title || type}</Title>
            <Content>
              <Text>{text}</Text>
            </Content>
            <Footer>
              <Button onClick={this.closePopup} />
            </Footer>
          </Popup>
        )}
      </Overlay>
    )
  }
}

const mapStateToProps = (state, key) => ({show: !R.path(['popup', key], state)})

export default connect(mapStateToProps)(PopupNotification)
