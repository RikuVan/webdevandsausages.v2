import { h, Component } from 'preact'
import styled, { css } from 'styled-components'
import darken from 'polished/lib/color/darken'

import { connect } from '../../preact-smitty'
import { pathOr } from 'ramda'
import { toRem, tablet, phone } from '../../helpers/styleHelpers'
import NavLinks, { NavSeparator } from './NavLinks'
import SocialLinks from './SocialLinks'
import Logo from './Logo'
import store from '../../store'
import Svg from '../Svg'

import { theme } from '../../style/theme'

const MenuIcon = () => (
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
    class="feather feather-menu"
  >
    <title>menu</title>
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </Svg>
)

const Wrapper = styled.div`
  display: none;

  ${tablet(css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: ${toRem(theme.navHeight)};
  `)};
`

const SecondaryMenu = styled.div`
  position: absolute;
  top: ${toRem(theme.navHeight)};
  left: 0;
  right: 0;
  ${tablet(
    p =>
      p.open
        ? css`
            height: ${toRem(theme.navHeight)};
          `
        : css`
            height: 0;
          `
  )} ${phone(
      p =>
        p.open
          ? css`
              height: ${toRem(theme.navHeight * 1.8)};
              flex-direction: column;
            `
          : css`
              height: 0;
            `
    )} display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${toRem(20)};
  transition: height 0.1s;
  user-select: none;
  -webkit-overflow-scrolling: touch;
  overflow-x: scroll;
  overflow-y: hidden;
  ${p =>
    p.isScrolled
      ? css`
          background: #52bdf6;
        `
      : css`
          background: #f7b733;
        `};
  color: #868686;
  ${p =>
    p.open &&
    css`
      border-top: 1px solid ${darken(0.2, '#d3d3d3')};
      border-bottom: 1px solid ${darken(0.2, '#d3d3d3')};
    `};
`

const MenuIconWrapper = styled.div`
  transition: transform 0.1s;
  ${p =>
    p.rotate &&
    css`
      transform-origin: 50% 55%;
      transform: rotate(90deg);
    `};
`

export const resetInput = css`
  background: none;
  outline: none;
  border: none;
`

export const NavButton = styled.button`
  ${resetInput} flex: 0 0 auto;
  min-width: ${theme.navHeight};
  height: ${theme.navHeight};
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  padding: ${toRem(18)} ${toRem(26)};
  color: ${theme.subduedTexTColor};
  ${p =>
    p.active &&
    css`
      background: rgba(0, 0, 0, 0.07);
    `} &:focus {
    border: ${toRem(2)} solid currentColor;
    border-radius: ${toRem(2)};
  }
`

class MobileNavbar extends Component {
  toggleNav = () => {
    store.actions.toggleMobileNav()
  }
  render({ showMobileNav, isScrolled }) {
    return (
      <Wrapper>
        <Logo />

        <NavButton onClick={this.toggleNav} active={showMobileNav}>
          <MenuIconWrapper rotate={showMobileNav}>
            <MenuIcon />
          </MenuIconWrapper>
        </NavButton>

        <SecondaryMenu open={showMobileNav} isScrolled={isScrolled}>
          <NavLinks />
          <NavSeparator />
          <SocialLinks />
        </SecondaryMenu>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  showMobileNav: pathOr(false, ['ui', 'showMobileNav'], state)
})

export default connect(mapStateToProps)(MobileNavbar)
