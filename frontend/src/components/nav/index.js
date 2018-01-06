import { h } from 'preact'
import styled, { css } from 'styled-components'
import { connect } from '../../preact-smitty'
import darken from 'polished/lib/color/darken'

import { Link } from 'preact-router/match'
import MobileNavbar from './MobileNavbar'
import { toRem, tablet } from '../../helpers/styleHelpers'
import NavLinks from './NavLinks'
import SocialLinks from './SocialLinks'
import Logo from './Logo'
import R from '../../helpers'

const Wrapper = styled.nav`
  position: fixed;
  left: 0;
  box-sizing: border-box;
  z-index: 3;
  width: 100%;
  font-weight: 500;
  ${({ theme, transparent, reverse }) =>
    css`
      background: ${transparent
        ? 'transparent'
        : `${reverse ? theme.primaryOrange : theme.primaryBlue}`};
      box-shadow: ${!transparent ? '0 0 5px rgba(0, 0, 0, 0.5)' : 'none'};
    `};
  transition: background 300ms ease-out;
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
`

const EndWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const NavTitleLink = styled(Link)`
  font-family: museo_sans500_Italic, sans-serif;
  font-size: 18px;
  ${({ theme }) =>
    css`
      line-height: ${toRem(theme.navHeight)};
    `};
  align-text: center;
  font-weight: 400;
  ${({ theme }) =>
    css`
      color: ${darken(0.1, theme.iconsColor)};
    `};
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

const Navbar = ({ transparent, reverseTheme }) => (
  <Wrapper transparent={transparent} reverse={reverseTheme}>
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
  transparent: R.pathEq(['ui', 'isScrolled'], false, state),
  reverseTheme: R.pathEq(['ui', 'theme'], 'reverse', state)
}))(Navbar)
