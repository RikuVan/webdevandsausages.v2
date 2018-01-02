import { h } from 'preact'
import styled, { css } from 'styled-components'

const StyledFooter = styled.footer`
  ${({ theme, color }) =>
    css`
      background: ${theme[color]};
    `};
  min-height: 10vh;
  width: 100%;
`
//#52bdf6

const Footer = ({ color = 'primaryBlue' }) => <StyledFooter color={color} />

export default Footer
