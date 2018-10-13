import { h } from 'preact'
import styled, { css, keyframes } from 'styled-components'
import times from 'ramda/src/times'
import identity from 'ramda/src/identity'

//*~*~*~*   WRAPPER   *~*~*~*//

const Wrapper = styled.div`
  * {
    box-sizing: content-box;
  }
  position: fixed;
  width: 100%;
  z-index: 20;
  height: 100%;
  pointer-events: none;
`
//*~*~*~*   WEB ANIMATIONS  *~*~*~*//

const webSway = keyframes`
  0% {
    margin-left: 0px;
    animation-timing-function: ease-in-out;
  }
  25% {
    margin-left: 0.3vw;
    animation-timing-function: ease-in-out;
  }
  50% {
    margin-left: -0.4vw;
  animation-timing-function: ease-in-out;
}
75% {
  margin-left: 0.30vw;
  animation-timing-function: ease-in-out;
}
100% {
  marign-left: 0vw;
  animation-timing-function: ease-in-out;
}
`

const webSwayRight = keyframes`
  0% {
    margin-left: 0px;
    animation-timing-function: ease-in-out;
  }
  25% {
    margin-right: -0.3vw;
    animation-timing-function: ease-in-out;
  }
  50% {
    margin-right: 0.3vw;
    animation-timing-function: ease-in-out;
  }
  75% {
    margin-right: -0.32vw;
    animation-timing-function: ease-in-out;
  }
  100% {
    marign-left: 0vw;
    animation-timing-function: ease-in-out;
  }
`

const webSwaySlower = keyframes`
  0% {
    margin-left: 0px;
    animation-timing-function: ease-in-out;
  }
  25% {
    margin-left: 0.1vw;
    animation-timing-function: ease-in-out;
  }
  50% {
    margin-left: -0.14vw;
    animation-timing-function: ease-in-out;
}
75% {
  margin-left: 0.20vw;
  animation-timing-function: ease-in-out;
}
100% {
  marign-left: 0vw;
  animation-timing-function: ease-in-out;
}
`

const webSwayRightSlower = keyframes`
  0% {
    margin-left: 0px;
    animation-timing-function: ease-in-out;
  }
  25% {
    margin-right: -0.1vw;
    animation-timing-function: ease-in-out;
  }
  50% {
    margin-right: 0.2vw;
    animation-timing-function: ease-in-out;
  }
  75% {
    margin-right: -0.1vw;
    animation-timing-function: ease-in-out;
  }
  100% {
    marign-left: 0vw;
    animation-timing-function: ease-in-out;
  }
`

//*~*~*~*   WEB   *~*~*~*//

const SpiderWeb = styled.div`
  .string__left,
  .string__right {
    width: 60vw;
    height: 20vw;
    border-top: 3px solid white;
    border-radius: 100%;
    display: block;
    position: absolute;
    top: 0vw;
  }
  .string__left {
    left: -10vw;
    animation: ${webSway} 5s infinite;
  }
  .string__right {
    right: -10vw;
    animation: ${webSwayRight} 5s infinite;
  }
  .string__right.bottom,
  .string__left.bottom {
    top: 4vw;
  }
  .string__right.top,
  .string__left.top {
    top: -4vw;
  }
  .string__right.tipy_top,
  .string__left.tipy_top {
    top: -8vw;
  }
  .string__left.tipy_top,
  .string__left.top {
    animation: ${webSwaySlower} 5s infinite;
  }
  .string__right.tipy_top,
  .string__right.top {
    animation: ${webSwayRightSlower} 5s infinite;
  }
`
//*~*~*~*   HAIR & LEGS HELPERS   *~*~*~*//

const hairs = times(identity, 50)
const legs = ['first', 'second', 'third', 'fourth']

function createHair() {
  const hairStyles = hairs.reduce((styles, i) => {
    styles += `
       .hair__${i} {
          z-index: ${i};
          transform: rotate(${i * 3.664}deg);
      }
     `
    return styles
  }, '')
  return css`
    ${hairStyles};
  `
}

//*~*~*~*   SPIDER ANIMATIONS & HELPERS   *~*~*~*//

const spiderDropBody = keyframes`
  0% {
  }
  39% {
    height: 11.5vw;
    width: 9.5vw;
  }
  40% {
    height: 8.5vw;
    width: 11vw;

  }
  41% {
    height: 12vw;
    width: 9vw;
  }
  60% {
    height: 10vw;
    width: 10vw;
  }  
`

const spiderSway = keyframes`
  0% {
    transform: rotate(0.75deg);
    animation-timing-function: ease-in-out;
  }
  25% {
    transform: rotate(-1.3deg);
    animation-timing-function: ease-in-out;
  }
  50% {
    transform: rotate(1.8deg);
    animation-timing-function: ease-in-out;
  }
  75% {
    transform: rotate(-1.2deg);
    animation-timing-function: ease-in-out;
  }
  100% {
    transform: rotate(0.75deg);
    animation-timing-function: ease-in-out;
  }
`

const HEIGHT_FACTOR = 1.5

function getHeight(height, factor = HEIGHT_FACTOR) {
  return css`
    height: ${height * factor}vw;
  `
}

const spiderDrop = keyframes`
  0% {
    animation-timing-function: cubic-bezier(0.18, 0.79, 0.62, 1);
    height: 0px;
  }
  40% {
    animation-timing-function: cubic-bezier(0.18, 0.79, 0.62, 1);
    ${getHeight(23)};
  }
  60% {
    animation-timing-function: cubic-bezier(0.45, -0.04, 0.94, 0.46);
    ${getHeight(17)};
  }
  75% {
    animation-timing-function: cubic-bezier(0.18, 0.79, 0.62, 1);
    ${getHeight(21)};
  }
  90% {
    animation-timing-function: cubic-bezier(0.45, -0.04, 0.94, 0.46);
     ${getHeight(19.5)};
  }
  95% {
    animation-timing-function: cubic-bezier(0.18, 0.79, 0.62, 1);
    ${getHeight(20.3)};
  }
  100% {
    animation-timing-function: cubic-bezier(0.45, -0.04, 0.94, 0.46);
     ${getHeight(20)};
  }
`

//*~*~*~*   SPIDER LEG HELPERS  *~*~*~*//

function animateLeg(from, to) {
  return keyframes`
    0% {
      transform: rotate(${from}deg);
    }
    50% {
      transform: rotate(${to}deg);
    }
    100% {
      transform: rotate(${from}deg);
    }
  `
}

const leg_right_fourth = animateLeg(30, 31)

const leg_right_fourth_bottom = animateLeg(-110, -112)

const leg_right_third = animateLeg(-10, -9)

const leg_right_third_bottom = animateLeg(-110, -102)

const leg_right_second = animateLeg(-30, -28)

const leg_right_second_bottom = animateLeg(-110, -113)

const leg_right_first = animateLeg(-35, -33)

const leg_right_first_bottom = animateLeg(-115, -114)

const leg_left_fourth = animateLeg(135, 138)

const leg_left_fourth_bottom = animateLeg(110, 112)

const leg_left_third = animateLeg(190, 192)

const leg_left_third_bottom = animateLeg(100, 102)

const leg_left_second = animateLeg(215, 218)

const leg_left_second_bottom = animateLeg(109, 112)

const leg_left_first = animateLeg(215, 212)

const leg_left_first_bottom = animateLeg(115, 114)

const left = 'left'
const right = 'right'

function createBaseLeg(top, side, degree, origin) {
  const d = `${degree}deg`
  return css`
    position: absolute;
    z-index: 50;
    top: ${top}vw;
    ${origin}: ${side}vw;
    transform-origin: left;
    transform: rotate(${d});
  `
}

function createTopLeg(width) {
  return css`
    width: ${width}vw;
    height: 0.25vw;
    background: black;
    position: relative;
  `
}

function createBtmLeg(right, top, width, deg) {
  const d = `${deg}deg`
  return css`
    position: absolute;
    right: ${right}10%;
    top: ${top}vw;
    width: ${width}vw;
    height: 0.25vw;
    background: black;
    transform: rotate(${d});
    transform-origin: right;
    border-radius: 50%;
  `
}

//*~*~*~*   SPIDER CONTAINER   *~*~*~*//

const SpiderContainer = styled.div.attrs({
  style: ({ height }) => ({
    height: `${height * HEIGHT_FACTOR}vw`
  })
})`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  animation: ${spiderDrop} 1.15s 1, ${spiderSway} 5s infinite;
  transform: rotate(0.75deg);
  transform-origin: top;
  &.small {
    &.right {
      height: ${5 * 1.5}vw;
      right: 21vw;
      left: inherit;
      animation: ${spiderSway} 8s infinite;
    }
    height: ${10 * 1.5}vw;
    position: absolute;
    left: 13vw;
    top: 0vw;
    animation: ${spiderSway} 10s infinite 1s;
    .spider {
      width: 1.5vw;
      height: 1.5vw;
      animation: none;
      .spider-hair {
        display: none;
      }
    }
    &:after {
      width: 0.15vw;
    }
    .eye {
      width: 0.65vw;
      height: 0.65vw;
      &__iris {
        width: 0.25vw;
        height: 0.25vw;
      }
    }
  }
  &:after {
    height: 100%;
    width: 0.3vw;
    background: #fff;
    content: '';
    display: block;
    position: absolute;
    z-index: -1;
  }
`

//*~*~*~*   SPIDER   *~*~*~*//

const Spider = styled.div`
  background: black;
  border-radius: 50%;
  width: 10vw;
  height: 10vw;
  animation: ${spiderDropBody} 1.15s;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .spider-hair {
    width: 10vw;
    display: block;
    padding: 0 0.45vw;
    height: 0.175vw;
    background: black;
    position: absolute;
  }
  ${createHair()};
  .leg__left--first {
    animation: ${leg_left_first} 2s infinite;
    ${createBaseLeg(1.5, 1, 215, left)};
    .leg__top {
      ${createTopLeg(3)};
    }
    .leg__bottom {
      animation: ${leg_left_first_bottom} 2s infinite 0.5s;
      ${createBtmLeg(0.1, -0.1, 5, 115)};
    }
  }

  .leg__left--second {
    animation: ${leg_left_second} 2s infinite;
    ${createBaseLeg(4, 1, 215, left)};
    .leg__top {
      ${createTopLeg(3.2)};
    }
    .leg__bottom {
      animation: ${leg_left_second_bottom} 2s infinite 0.5s;
      ${createBtmLeg(0.1, -0.1, 5.2, 110)};
    }
  }

  .leg__left--third {
    animation: ${leg_left_third} 2s infinite;
    ${createBaseLeg(5, 0.5, 190, left)};
    .leg__top {
      ${createTopLeg(3.2)};
    }
    .leg__bottom {
      animation: ${leg_left_third_bottom} 1.5s infinite 0.25s;
      ${createBtmLeg(0.1, -0.1, 5.2, 100)};
    }
  }

  .leg__left--fourth {
    animation: ${leg_left_fourth} 2s infinite;
    ${createBaseLeg(7, 0.5, 130, left)};
    .leg__top {
      ${createTopLeg(3.2)};
    }
    .leg__bottom {
      animation: ${leg_left_fourth_bottom} 2s infinite 0.5s;
      ${createBtmLeg(0.1, -0.1, 5.2, 110)};
    }
  }

  .leg__right--first {
    animation: ${leg_right_first} 1.5s infinite;
    ${createBaseLeg(1.5, -2, -35, right)};
    .leg__top {
      ${createTopLeg(3)};
    }
    .leg__bottom {
      animation: ${leg_right_first_bottom} 1.5s infinite 0.5s;
      ${createBtmLeg(0.1, -0.1, 5, -115)};
    }
  }

  .leg__right--second {
    animation: ${leg_right_second} 2s infinite;
    ${createBaseLeg(3.5, -2.5, -25, right)};
    .leg__top {
      ${createTopLeg(3.2)};
    }
    .leg__bottom {
      animation: ${leg_right_second_bottom} 2s infinite 0.5;
      ${createBtmLeg(0.1, -0.1, 5.2, -110)};
    }
  }

  .leg__right--third {
    animation: ${leg_right_third} 1s infinite;
    ${createBaseLeg(5.2, -3, -10, right)};
    .leg__top {
      ${createTopLeg(3.2)};
    }
    .leg__bottom {
      animation: ${leg_right_third_bottom} 1s infinite 0.5;
      ${createBtmLeg(0.1, -0.1, 5.2, -100)};
    }
  }

  .leg__right--fourth {
    animation: ${leg_right_fourth} 2s infinite;
    ${createBaseLeg(7.2, -2.5, 30, right)};
    .leg__top {
      ${createTopLeg(3.2)};
    }
    .leg__bottom {
      ${createBtmLeg(0.1, -0.1, 5.2, -110)};
      animation: ${leg_right_fourth_bottom} 2s infinite 0.5s;
    }
  }
`

const blink = keyframes`
  0% {
    top: -3.1vw;
    animation-timing-function: linear;
  }
  3.5% {
    top: -3.1vw;
    animation-timing-function: linear;
  }
  4% {
    top: 0vw;
    animation-timing-function: linear;
  }
  5% {
    top: 0vw;
    animation-timing-function: linear;
  }
  6% {
    top: -3.1vw;
    animation-timing-function: linear;
  }
  70.5% {
    top: -3.1vw;
    animation-timing-function: linear;
  }
  71% {
    top: 0vw;
    animation-timing-function: linear;
  }
  72% {
    top: 0vw;
    animation-timing-function: linear;
  }
  72.9% {
    top: -3.1vw;
    animation-timing-function: linear;
  }
`

//*~*~*~*   EYE ANIMATIONS  *~*~*~*//

const blinkBottom = keyframes`
  0% {
    top: 2.5vw;
    animation-timing-function: linear;
  }
  3.5% {
    top: 2.5vw;
    animation-timing-function: linear;
  }
  4% {
    top: 1vw;
    animation-timing-function: linear;
  }
  5% {
    top: 1vw;
    animation-timing-function: linear;
  }
  6% {
    top: 2.5vw;
    animation-timing-function: linear;
  }
  70.5% {
    top: 2.5vw;
    animation-timing-function: linear;
  }
  71% {
    top: 1vw;
    animation-timing-function: linear;
  }
  72% {
    top: 1vw;
    animation-timing-function: linear;
  }
  72.9% {
    top: 2.5vw;
    animation-timing-function: linear;
  }
`

const irisMove = keyframes`
  0% {
    margin-left: 0.39vw;
    margin-top: 0.39vw;
    animation-timing-function: linear;
  }
  3% {
    margin-left: - 0.5vw;
    margin-top: -0.5vw;
    animation-timing-function: linear;
  }
  4% {
    margin-left: - 0.5vw;
    margin-top: -0.5vw;
    animation-timing-function: linear;
  }
  45% {
    margin-left: - 0.51vw;
    margin-top: -0.51vw;
    animation-timing-function: linear;
  }
  47% {
    margin-left: - 0.72vw;
    margin-top: 0.21vw;
    animation-timing-function: linear;
  }
  50% {
    margin-left: - 0.77vw;
    margin-top: 0.21vw;
    animation-timing-function: linear;
  }
  70% {
    margin-left: - 0.77vw;
    margin - top: 0.21vw;
    animation-timing-function: linear;
  }
  73% {
    margin-left: 0.36vw;
    margin-top: 0.31vw;
    animation-timing-function: linear;
  }
  96% {
    margin-left: 0.36vw;
    margin-top: 0.36vw;
    animation-timing-function: linear;
  }
  100% {
    margin-left: 0.39vw;
    margin-top: 0.39vw;
    animation-timing-function: linear;
  }
`

//*~*~*~*   SPIDER EYE   *~*~*~*//

const Eye = styled.div.attrs({ className: 'eye' })`
  border-radius: 100%;
  background: #ffffff;
  width: 2.5vw;
  height: 2.5vw;
  margin-left: 0.39vw;
  margin-top: 0.39vw;
  position: absolute;
  top: 5vw;
  z-index: 49;
  left: 2vw;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ right }) => {
    return (
      right &&
      css`
        right: 2vw;
        left: inherit;
      `
    )
  }};
  .eye__lid {
    background: black;
    height: 3.1vw;
    width: 3.1vw;
    position: absolute;
    border-radius: 100%;
    z-index: 999;
    top: -3.1vw;
  }
  .eye__lid-bottom {
    background: black;
    height: 1.3vw;
    width: 2.6vw;
    position: absolute;
    z-index: 999;
    top: 2.5vw;
  }
  .eye__iris {
    border-radius: 100%;
    background: black;
    width: 1.25vw;
    height: 1.25vw;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 0px;
    margin-top: 0px;
  }
  .eye__iris {
    animation: ${irisMove} 4s infinite alternate;
  }
  .eye__lid {
    animation: ${blink} 6.5s infinite;
    animation-delay: 2s;
  }
  .eye__lid-bottom {
    animation: ${blinkBottom} 6.5s infinite;
    animation-delay: 2s;
  }
  .eye__shine {
    border-radius: 100%;
    background: #fbfdf8;
    width: 0.25vw;
    height: 0.25vw;
    position: absolute;
    right: 0.15vw;
    top: 0.1vw;
    ${({ right }) => {
      return (
        right &&
        css`
          left: 0.15vw;
          right: inherit;
        `
      )
    }};
  }
`
const HEIGHT = 30
const OFFSET = 90

const getDivisor = num => {
  if (num > 800 && num < 900) {
    return 14
  }
  if (num > 900 && num < 1100) {
    return 15
  }
  if (num > 1100 && num < 1300) {
    return 16
  }
  if (num > 1300 && num < 1500) {
    return 16
  }
}

export const HalloweenHeader = () => (
  <Wrapper>
    <SpiderContainer height={HEIGHT}>
      <SpiderWeb>
        <div className="string__left tipy_top" />
        <div className="string__left top" />
        <div className="string__left" />
        <div className="string__left bottom" />
        <div className="string__right tipy_top" />
        <div className="string__right top" />
        <div className="string__right" />
        <div className="string__right bottom" />
      </SpiderWeb>
      <Spider>
        {hairs.map(n => (
          <div className={`spider-hair hair__${n}`} key={n} />
        ))}
        {legs.map(l => (
          <div className={`leg__right--${l}`}>
            <div className="leg__top" />
            <div className="leg__bottom" />
          </div>
        ))}
        {legs.map(l => (
          <div className={`leg__left--${l}`}>
            <div className="leg__top" />
            <div className="leg__bottom" />
          </div>
        ))}
        <Eye>
          <div className="eye__lid" />
          <div className="eye__lid-bottom" />
          <div className="eye__iris">
            <div className="eye__pupil" />
            <div className="eye__shine" />
          </div>
        </Eye>
        <Eye right>
          <div className="eye__lid" />
          <div className="eye__lid-bottom" />
          <div className="eye__iris">
            <div className="eye__pupil" />
            <div className="eye__shine" />
          </div>
        </Eye>
      </Spider>
    </SpiderContainer>
  </Wrapper>
)
