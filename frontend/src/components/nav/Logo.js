import { h } from 'preact'
import styled, { css } from 'styled-components'
import { Link } from 'preact-router/match'
import { toRem } from '../../helpers/styleHelpers'

const MainLogo = styled.img`
  position: absolute;
  left: 0;
  width: ${toRem(115)};
  height: ${toRem(115)};
  top: ${toRem(-10)};
  z-index: 80;
`
const Logo = () => (
  <Link href="/">
    <MainLogo
      className="logo bounceDown"
      src="../../assets/logo.svg"
      alt="Web Dev &amp; Sausages"
    />
  </Link>
)

export default Logo
