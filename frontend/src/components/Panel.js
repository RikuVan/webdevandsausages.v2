import { h } from 'preact'
import styled, { css } from 'styled-components'

import { toRem, tablet, phone } from '../helpers/styleHelpers'

const Panel = styled.div`
  min-height: 200px;
  background: #fff;
  display: none;
  align-items: start;
  width: 50%;
  margin: auto;
  padding: ${toRem(20)};
  ${p =>
    p.active &&
    css`
      display: flex;
      flex-direction: column;
    `};
  ${tablet(css`
    width: 80%;
  `)};
  ${phone(css`
    width: 100%;
  `)};
`

export default Panel
