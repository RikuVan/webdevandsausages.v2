import { h } from 'preact'
import styled, { css, keyframes } from 'styled-components'

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const StyledSpinner = styled.div`
  position: relative;
  margin: 5px 2px 0 3px;
  border: 4px solid #367db7;
  border-top-color: rgba(0, 0, 0, 0);
  border-left-color: rgba(0, 0, 0, 0);
  width: 40px;
  height: 40px;
  opacity: 0.8;
  border-radius: 50%;
  animation: ${rotate360} 0.7s infinite linear;
  ${p =>
    p.small &&
    css`
      width: 20px;
      height: 20px;
    `};
`

const Spinner = ({ small }) => (
  <StyledSpinner className="spinner" small={small} />
)

export default Spinner
