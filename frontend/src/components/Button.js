import { h } from 'preact'
import styled, { css } from 'styled-components'

const StyledButton = styled.button`
  border-radius: 3px;
  padding: 0.25em 1em;
  margin: 0 1em;
  background: transparent;
  color: palevioletred;
  border: 2px solid palevioletred;

  ${props =>
    props.primary &&
    css`
      background: palevioletred;
      color: white;
    `};
`
// TODO add spinner
const Button = ({ loading, primary, onClick, rest }) => {
  return (
    <StyledButton type="button" id="name" primary {...rest}>
      {children}
      {loading && 'loading'}
    </StyledButton>
  )
}

export default Button
