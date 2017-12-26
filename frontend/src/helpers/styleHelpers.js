import rem from 'polished/lib/helpers/rem'
import { css } from 'styled-components'

export const toRem = size => rem(size, '18px')

export const phone = inner => css`
  @media (max-width: ${650 / 18}em) {
    ${inner};
  }
`

export const tablet = inner => css`
  @media (max-width: ${1000 / 18}em) {
    ${inner};
  }
`

export const desktop = inner => css`
  @media (min-width: ${1000 / 18}em) {
    ${inner};
  }
`
