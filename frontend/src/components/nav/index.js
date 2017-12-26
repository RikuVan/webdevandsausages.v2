import { h, Component } from 'preact'
import styled, { css } from 'styled-components'

import { Link } from 'preact-router/match'
import MobileNavbar from './MobileNavbar'
import { toRem, tablet } from '../../helpers/styleHelpers'
import NavLinks from './NavLinks'
import SocialLinks from './SocialLinks'
import Logo from './Logo'

export const NAV_HEIGHT = 66
export const NAV_COLOR = '#52bdf6'

const Wrapper = styled.nav`
  position: fixed;
  left: 0;
  box-sizing: border-box;
  z-index: 3;
  width: 100%;
  height: ${toRem(NAV_HEIGHT)};
  font-weight: 500;
  background: ${props => (props.transparent ? 'transparent' : `${NAV_COLOR}`)};
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  transition: background 300ms ease-out;
  color: white;
`

const NormalNavbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  ${tablet(css`
    display: none;
  `)};
`

const StartWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 80px;
`

const EndWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const NavTitleLink = styled(Link)`
  font-size: 18px;
  line-height: ${toRem(NAV_HEIGHT)};
  align-text: center;
  font-weight: 400;
  color: #fff;
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
`

const Navbar = ({ transparent }) => (
  <Wrapper transparent={transparent}>
    <NormalNavbar>
      <StartWrapper>
        <Logo />
        <NavTitleLink href="/">Web Dev &amp; Sausages</NavTitleLink>
        <NavLinks />
      </StartWrapper>

      <EndWrapper>
        <SocialLinks />
      </EndWrapper>
    </NormalNavbar>
    <MobileNavbar />
  </Wrapper>
)

export default Navbar
