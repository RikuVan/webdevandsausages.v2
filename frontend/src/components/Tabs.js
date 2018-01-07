import { h } from 'preact'
import styled, { css } from 'styled-components'

import opacify from 'polished/lib/color/opacify'
import transparentize from 'polished/lib/color/transparentize'
import lighten from 'polished/lib/color/lighten'

import { theme } from '../style/theme'
import { toRem, tablet, phone } from '../helpers/styleHelpers'

export const Tabs = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 50%;
  margin: auto;
  padding-top: 3rem;
  ${tablet(css`
    width: 80%;
    margin-top: ${toRem(150)};
  `)};
  ${phone(css`
    width: 100%;
    margin-top: ${toRem(150)};
  `)};
  ${({ width }) =>
    width &&
    css`
      width: ${width};
    `};
`

export const Tab = styled.div`
  flex-grow: 1;
  max-height: ${toRem(100)};
  min-width: ${toRem(250)};
  display: inline-block;
  padding: 10px;
  vertical-align: top;
  background: transparent;
  cursor: hand;
  cursor: pointer;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border-bottom: 1px solid ${opacify(0.3, theme.primaryOrange)};
  font-size: ${toRem(24)};
  color: ${transparentize(0.1, theme.secondaryBlue)};
  &:hover {
    background: ${transparentize(0.6, theme.primaryOrange)};
  }
  ${p =>
    p.active &&
    css`
    background: #fff;
    color: ${theme.secondaryBlue};
    border: 1px solid ${opacify(0.3, theme.primaryOrange)};
    border-top: 5px solid ${theme.primaryOrange};
    border-bottom: none;
    &:hover {
      color: ${lighten(0.2, theme.secondaryBlue)};
      background: #fff;
  `};
`
