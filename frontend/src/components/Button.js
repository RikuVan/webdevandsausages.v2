import { h } from 'preact'
import styled, { css } from 'styled-components'
import { Link } from 'preact-router/match'

import Spinner from './Spinner'
import { theme } from '../style/theme'
import darken from 'polished/lib/color/darken'
import opacify from 'polished/lib/color/opacify'
import lighten from 'polished/lib/color/lighten'

import { toRem } from '../helpers/styleHelpers'

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
  border: 3px solid ${theme.secondaryBlue};
  height: 52px;
  font-size: 1.7em;
  font-weight: 470;
  color: ${theme.secondaryBlue};
  background: ${darken(-0.1, '#f5b53f')};
  outline: none;
  padding: 2px 17px 4px 17px;
  margin: 0 4px;
  box-shadow: none;
  &:hover,
  &:disabled {
    background: ${darken(0.1, '#f5b53f')};
  }
  &:disabled {
    background: ${opacify(0.1, theme.subduedTexTColor)};
    cursor: not-allowed;
  }

  ${props =>
    props.primary &&
    css`
      border: none;
      background: ${theme.secondaryBlue};
      color: #fff;
      &:hover {
        background: ${theme.secondaryBlue};
        color: #fff;
      }
      &:disabled {
        background: ${theme.secondaryBlue};
        color: lightgrey;
        cursor: not-allowed;
      }
    `};
  ${props =>
    props.valid &&
    css`
      background: ${theme.primaryBlack};
      color: ${theme.secondaryBlue};
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
        background: ${theme.primaryOrange};
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
}) => {
  return (
    <StyledButton type={type} id={id} primary={primary} {...rest}>
      {!loading && children}
      {loading && <Spinner small whiteSpinner={whiteSpinner} />}
    </StyledButton>
  )
}

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
