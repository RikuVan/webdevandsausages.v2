import { h } from 'preact'
import styled, { css } from 'styled-components'

import { toRem, tablet, phone } from '../helpers/styleHelpers'

const Section = styled.div`
  ${({ theme }) =>
    css`
      padding: ${toRem(theme.navHeight)} 0 20vh;
    `};
  ${({ isExpandedMobileNav, theme }) =>
    isExpandedMobileNav &&
    tablet(css`
      padding-top: ${toRem(theme.navHeight * 1.8)};
    `)};
  ${({ isExpandedMobileNav, theme }) =>
    isExpandedMobileNav &&
    phone(css`
      padding-top: ${toRem(theme.navHeight * 2.5)};
    `)};
  ${({ theme }) =>
    css`
      background: linear-gradient(
        0deg,
        ${theme.primaryOrange},
        ${theme.primaryBlue}
      );
    `};
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.17);
  width: 100%;
`
export default Section
