import { h } from 'preact'
import styled, { css } from 'styled-components'

import { toRem, tablet, phone } from '../helpers/styleHelpers'

const PageTitle = styled.h1`
  margin-top: ${toRem(100)};
  font-size: 2rem;
  text-transform: uppercase;
  color: #fff;
  z-index: 1;
  ${tablet(
    css`
      font-size: 1.8rem;
    `
  )};
  ${phone(
    css`
      font-size: 1.2rem;
    `
  )};
`

export default PageTitle
