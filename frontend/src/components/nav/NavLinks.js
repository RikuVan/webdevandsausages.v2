import { h, Component } from 'preact'
import styled from 'styled-components'
import { Link } from 'preact-router/match'
import { toRem } from '../../helpers/styleHelpers'

import { theme } from '../../style/theme'

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  margin-left: 40px;
`

const NavLink = styled(Link)`
  flex: 0 0 auto;
  display: inline-block;
  line-height: ${toRem(theme.navHeight)};
  align-text: center;
  font-weight: 400;
  text-decoration: none;
  transition: opacity 0.2s, transform 0.2s;
  cursor: pointer;
  &:hover,
  &:focus {
    opacity: 0.8;
  }
  &:active {
    transform: scale(0.95);
    opacity: 0.6;
  }
  color: ${props => (props.showMobileNav ? '#5b5b5b' : '#fff')};
`

export const NavSeparator = styled.span`
  flex: 0 0 auto;
  width: ${toRem(5)};
  height: ${toRem(5)};
  margin: 0 ${toRem(15)};
  border-radius: 50%;
  background: black;
  opacity: 0.35;
`

const NavLinks = ({ showMobileNav }) => (
  <Wrapper>
    <NavLink activeClassName="active" href="/" showMobileNav>
      HOME
    </NavLink>
    <NavSeparator />
    <NavLink activeClassName="active" href="/about" showMobileNav>
      ABOUT
    </NavLink>
    <NavSeparator />
    <NavLink activeClassName="active" href="/" showMobileNav>
      REGISTRATION
    </NavLink>
  </Wrapper>
)

export default NavLinks
