import { h } from 'preact'
import styled, { keyframes, css } from 'styled-components'
import darken from 'polished/lib/color/darken'
import { connect } from '../preact-smitty'
import { pathOr } from 'ramda'
import Svg from './Svg'

const scaleIn = keyframes`
  100% {
    transform: scale(1);
		opacity: 0.8;
  }
`

const expand = keyframes`
50% {
  width: 350px;
  border-radius: 6px;
}
100% {
  min-width: 300px;
  border-radius: 4px;
  box-shadow: 0px 1px 3px 0px rgba(0,0,0,.2),
              0px 1px 1px 0px rgba(0,0,0,.14),
              0px 3px 3px -1px rgba(0,0,0,.12);
  }
`
const fadeIn = keyframes`
  0% {
		opacity: 0;
	}
	100% {
		opacity: 0.8;
	}
`

const Wrapper = styled.div`
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  max-width: 400px;
  height: 50px;
  margin-top: 15px;
  margin-bottom: 15px;
  background: transparent;
  transform: scale(0);
  border-radius: 50%;
  color: #f5b53f;
  opacity: 0.8;
  overflow: hidden;
  font-weight: 500;
  animation: ${scaleIn} 0.3s ease-out forwards,
    ${expand} 0.35s 0.25s ease-out forwards;
  ${p => {
    console.log('here', p)
    switch (p.type) {
      case 'success': {
        return css`
          background: #a3f5fc;
          color: ${darken(0.6, '#a3f5fc')};
          border: 2px solid ${darken(0.4, '#a3f5fc')};
        `
      }
      case 'error': {
        return css`
          background: #ee725a;
          color: ${darken(0.6, '#ee725a')};
          border: 2px solid ${darken(0.4, '#ee725a')};
        `
      }
      default: {
        return css`
          background: #f5b53f;
          color: ${darken(0.5, '#f5b53f')};
          border: 2px solid ${darken(0.4, '#f5b53f')};
        `
      }
    }
  }};
`
const NotificationText = styled.div`
  display: flex;
  align-items: center;
  padding: 0;
  font-size: 16px;
  animation: ${fadeIn} 0.65s ease-in forwards;
`
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 16px;
`

const AlertIcon = (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="feather feather-alert-circle"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="17" x2="12" y2="16" />
  </Svg>
)

const CheckIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="feather feather-check"
    background="white"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const InfoIcon = (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="feather feather-info"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="9" x2="12" y2="8" />
  </Svg>
)

const iconMap = {
  success: CheckIcon,
  error: AlertIcon,
  info: InfoIcon
}

const Notification = ({
  type = 'info',
  defaultMessage = 'no message provided',
  message,
  id,
  visible
}) => {
  if (!visible) return null
  const text = message || defaultMessage
  return (
    <Wrapper type={type}>
      <IconWrapper>{iconMap[type] || ''}</IconWrapper>
      <NotificationText>{text}</NotificationText>
    </Wrapper>
  )
}

const mapStateToProps = (state, { id }) => ({
  visible: pathOr(false, ['notifications', id], state)
})

export default connect(mapStateToProps)(Notification)
