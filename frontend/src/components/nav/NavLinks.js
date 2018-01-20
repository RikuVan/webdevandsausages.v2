import { h } from 'preact'
import styled, { css } from 'styled-components'
import { Link } from 'preact-router/match'
import { toRem } from '../../helpers/styleHelpers'
import darken from 'polished/lib/color/darken'

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  margin-left: 40px;
`

const NavLink = styled(Link)`
  flex: 0 0 auto;
  display: inline-block;
  ${({ theme }) =>
    css`
      line-height: ${toRem(theme.navHeight)};
    `};
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
  color: ${p => darken(0.1, p.theme.iconsColor)};
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
    <NavLink id="home" activeClassName="active" href="/" showMobileNav>
      HOME
    </NavLink>
    <NavSeparator />
    <NavLink id="about" activeClassName="active" href="/about" showMobileNav>
      ABOUT
    </NavLink>
    <NavSeparator />
    <NavLink
      id="registration"
      activeClassName="active"
      href="/registration"
      showMobileNav
    >
      REGISTRATION
    </NavLink>
  </Wrapper>
)

export default NavLinks
