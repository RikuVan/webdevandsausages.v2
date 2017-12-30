import { h } from 'preact'
import styled, { css } from 'styled-components'
import { connect } from '../../preact-smitty'

import { Link } from 'preact-router/match'
import MobileNavbar from './MobileNavbar'
import { toRem, tablet } from '../../helpers/styleHelpers'
import NavLinks from './NavLinks'
import SocialLinks from './SocialLinks'
import Logo from './Logo'
import { pathEq } from 'ramda'

import { theme } from '../../style/theme'

const Wrapper = styled.nav`
  position: fixed;
  left: 0;
  box-sizing: border-box;
  z-index: 3;
  width: 100%;
  height: ${toRem(theme.navHeight)};
  font-weight: 500;
  background: ${props =>
    props.transparent ? 'transparent' : `${theme.primaryBlue}`};
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  transition: background 300ms ease-out;
  color: white;
`

const NormalNavbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 25px;
  ${tablet(css`
    display: none;
  `)};
`

const StartWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 80px;
  margin-bottom: ${toRem(10)};
`

const EndWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: ${toRem(10)};
`

const NavTitleLink = styled(Link)`
  font-family: museo_sans500_Italic, sans-serif;
  font-size: 18px;
  line-height: ${toRem(theme.navHeight)};
  align-text: center;
  font-weight: 400;
  color: ${theme.subduedTexTColor};
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
    <MobileNavbar isScrolled={transparent} />
  </Wrapper>
)

export default connect(state => ({
  transparent: pathEq(['ui', 'isScrolled'], false, state)
}))(Navbar)
