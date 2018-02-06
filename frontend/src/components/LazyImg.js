import { h } from 'preact'
import styled, { css, keyframes } from 'styled-components'
import Observer from 'react-intersection-observer'

const Loading = keyframes`
0% {
  background-position: -1200px 0;
}

100% {
  background-position: 1200px 0;
}
`

const Placeholder = styled.div`
  ${({ height, width }) => css`
    height: ${height}px;
    width: ${height}px;
  `};
  animation: ${Loading} 3s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  background: #f6f7f8;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.02) 10%,
    rgba(0, 0, 0, 0.05) 30%,
    rgba(0, 0, 0, 0.02) 50%
  );
  background-size: 1200px 20px;
  border-radius: 3px;
`

const renderImg = (inView, src, alt, ...rest) =>
  inView ? <img src={src} alt={alt} /> : <Placeholder {...rest} />

const LazyImg = ({ src, height = '250', width = '250', alt = 'image' }) => (
  <Observer triggerOnce>
    {inView => renderImg(inView, src, alt, height, width)}
  </Observer>
)

export default LazyImg