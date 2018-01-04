import { h } from 'preact'
import styled, { css } from 'styled-components'
import { Link } from 'preact-router/match'

import Spinner from './Spinner'
import { theme } from '../style/theme'
import darken from 'polished/lib/color/darken'
import opacify from 'polished/lib/color/opacify'
import lighten from 'polished/lib/color/lighten'
import transparentize from 'polished/lib/color/transparentize'

const StyledButton = styled.button`
  display: inline-block;
  zoom: 1;
  line-height: normal;
  white-space: nowrap;
  vertical-align: middle;
  text-align: center;
  cursor: pointer;
  -webkit-user-drag: none;
  user-select: none;
  box-sizing: border-box;
  background: transparent;
  border-radius: 2px;
  border: 2px solid #fff;
  height: 52px;
  font-size: 1.7em;
  font-weight: 470;
  color: #fff;
  outline: none;
  padding: 2px 17px 4px 17px;
  margin: 0 4px;
  box-shadow: none;
  &:hover,
  &:disabled {
    background: ${transparentize(0.5, theme.primaryBlue)};
  }
  &:disabled {
    background: ${opacify(0.1, theme.subduedTexTColor)};
    cursor: not-allowed;
  }

  ${props =>
    props.primary &&
    css`
      border: 2px solid ${theme.secondaryBlue};
      background: ${transparentize(0.8, theme.secondaryBlue)};
      color: ${theme.secondaryBlue};
      &:hover {
        background: ${transparentize(0.7, theme.secondaryBlue)};
        color: ${theme.secondaryBlue};
      }
      &:disabled {
        background: ${transparentize(0.6, theme.secondaryBlue)};
        color: ${transparentize(0.3, theme.secondaryBlue)};
        cursor: not-allowed;
      }
    `};
  ${props =>
    props.valid &&
    css`
      background: ${theme.secondaryBlue};
      color: #fff;
      &:hover {
        background: ${opacify(0.1, theme.secondaryBlue)};
        color: #fff;
      }
    `};
  ${props =>
    props.transparent &&
    css`
      background: transparent;
      border-color: ${theme.secondaryBlue};
      color: ${theme.secondaryBlue};
      &:disabled,
      &:hover {
        border-color: ${lighten(0.1, theme.secondaryBlue)};
        color: ${lighten(0.1, theme.secondaryBlue)};
        background: transparent;
      }
    `};
  ${props =>
    props.light &&
    css`
      background: transparent;
      border-color: ${theme.iconsColor};
      color: ${theme.iconsColor};
      &:disabled,
      &:hover {
        border-color: ${lighten(0.1, theme.iconsColor)};
        color: ${lighten(0.1, theme.iconsColor)};
        background: transparent;
      }
    `};
  ${props =>
    props.transparent &&
    props.valid &&
    css`
      &:hover {
        background: transparent;
      }
    `};
  ${props =>
    props.minWidth &&
    css`
      min-width: ${props.minWidth}px;
    `};
`

const Button = ({
  type = 'button',
  id,
  loading,
  primary,
  children,
  whiteSpinner,
  ...rest
}) => (
  <StyledButton type={type} id={id} primary={primary} {...rest}>
    {!loading && children}
    {loading && <Spinner small whiteSpinner={whiteSpinner} />}
  </StyledButton>
)

export const ButtonLink = ({
  type = 'button',
  id,
  loading,
  primary,
  children,
  href,
  ...rest
}) => (
  <Link href={href}>
    <StyledButton type={type} id={id} primary={primary} {...rest}>
      {!loading && children}
      {loading && <Spinner small />}
    </StyledButton>
  </Link>
)

export default Button
