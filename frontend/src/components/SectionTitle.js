import { h } from 'preact'
import styled, { css } from 'styled-components'

import { toRem } from '../helpers/styleHelpers'

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  ${({ theme }) =>
    css`
      color: ${theme.primaryOrange};
    `};
  font-weight: 700;
  ${({ paddingTop = 0, paddingBottom = 0 }) =>
    css`
      padding: ${toRem(paddingTop)} 0 ${toRem(paddingBottom)};
    `};
`
export default SectionTitle
