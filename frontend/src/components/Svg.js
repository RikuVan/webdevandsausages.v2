import { h } from 'preact'
import styled, { css } from 'styled-components'

const Svg = styled.svg`
  svg {
    display: inline-block;
    path {
      fill: currentColor;
    }
  }
  ${({ color, width, height }) =>
    color &&
    css`
      color: ${color};
    `};
  ${({ width, height }) =>
    width &&
    height &&
    css`
      width: ${width};
      height: ${height};
    `};
`

export default Svg
