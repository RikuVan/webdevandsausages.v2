import { h } from 'preact'
import styled from 'styled-components'
import { Link } from 'preact-router/match'
import lighten from 'polished/lib/color/lighten'

const InlineLink = styled(Link)`
  transition: opacity 0.2s, transform 0.2s;
  cursor: pointer;
  &:hover,
  &:focus {
    opacity: 0.8;
  }
  &:active {
    transform: scale(0.95);
    opacity: 0.6;
  }
  color: ${p => lighten(0.2, p.theme.primaryOrange)};
`

export default InlineLink
