import { h } from 'preact'
import styled, { css } from 'styled-components'
import Spinner from './Spinner'
import { theme } from '../style/theme'
import opacify from 'polished/lib/color/darken'

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
  background: ${theme.subduedTexTColor};
  border-radius: 2px;
  border: 0;
  height: 60px;
  font-size: 1.3em;
  font-weight: 400;
  outline: none;
  padding: 15px 20px 15px 20px;
  margin: 1px 3px;
  box-shadow: none;
  &:hover,
  &:disabled {
    background: ${opacify(0.1, theme.subduedTexTColor)};
    color: white;
  }
  &:disabled {
    background: ${opacify(0.1, theme.subduedTexTColor)};
    cursor: not-allowed;
  }

  ${props =>
    props.primary &&
    css`
      background: ${theme.secondaryBlue};
      color: #fff;
      &:hover {
        background: ${opacify(0.1, theme.secondaryBlue)};
        color: #fff;
      }
      &:disabled {
        background: ${opacify(0.1, theme.secondaryBlue)};
        color: lightgrey;
        cursor: not-allowed;
      }
    `};
  ${props =>
    props.valid &&
    css`
      background: ${theme.primaryBlack};
      color: #fff;
      &:hover {
        background: ${opacify(0.1, theme.secondaryBlue)};
        color: #fff;
      }
    `};
`

const Button = ({
  type = 'button',
  id,
  loading,
  primary,
  children,
  ...rest
}) => {
  return (
    <StyledButton type={type} id={id} primary={primary} {...rest}>
      {!loading && children}
      {loading && <Spinner small />}
    </StyledButton>
  )
}

export default Button
