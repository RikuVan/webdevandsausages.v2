import { h, Component } from 'preact'
import styled, { css, keyframes } from 'styled-components'

import { tablet, phone } from '../../helpers/styleHelpers'

const GrillImg = styled.img`
  position: absolute;
  width: 200px;
  height: 120px;
  margin: auto;
  top: 130px;
  right: 10px;
  left: 0;
  opacity: 1;
  ${p =>
    p.hide &&
    css`
      display: none;
    `} ${tablet(
      p =>
        p.isExpandedMobileNav &&
        css`
          top: 175px;
        `
    )};
  ${phone(
    p =>
      p.isExpandedMobileNav &&
      css`
        top: 195px;
      `
  )};
`
const fireAnimation = keyframes`
    0% {
      text-shadow: none;
    }
    15% {
      text-shadow: 0 0 10px #fefcc9, 5px -5px 30px #feec85, -7px -7px 20px #ffae34,
			10px -10px 20px #ec760c, -10px -20px 20px #cd4606, 0 -40px 40px #973716,
			10px -30px 40px #451b0e;
    }
    30% {
      text-shadow: -5 -5 5px #fefcc9, 10px -8px 30px #feec85, -10px -15px 20px #ffae34,
    8px -15px 20px #ec760c, -20px -30px 20px #cd4606, 20 -40px 30px #973716,
    10px -30px 40px #451b0e;
    }
    45% {
			text-shadow: 0 0 10px #fefcc9, 5px -5px 30px #feec85, -7px -7px 20px #ffae34,
    15px -20px 20px #ec760c, -10px -30px 20px #cd4606, 0 -30px 40px #973716,
    10px -30px 40px #451b0e;
		}
		65% {
			text-shadow: 0 0 10px #fefcc9, 5px -5px 30px #feec85, -7px -7px 20px #ffae34,
    10px -10px 20px #ec760c, -5px -20px 20px #cd4606, 0 -40px 40px #973716,
    10px -30px 40px #451b0e;
		}
		80% {
			text-shadow: 0 0 5px #fefcc9, 2px -2px 30px #feec85, -3px -3px 20px #ffae34,
    5px -5px 20px #ec760c, -5px -10px 20px #cd4606, 0 -20px 40px #973716,
    5px -15px 40px #451b0e;
		}
		100% {
			text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #fefcc9,
			0 0 70px #fefcc9, 0 0 80px #fefcc9, 0 0 100px #fefcc9, 0 0 150px #fefcc9;
		}
	`

const WDSTitle = styled.h1`
  font-family: zingrustdemo-base, sans-serif;
  margin-top: 100px;
  font-size: 4rem;
  color: #367db7;
  z-index: 1;
  ${tablet(
    css`
      font-size: 3rem;
    `
  )};
  ${phone(
    css`
      font-size: 2.5rem;
    `
  )};
  animation: ${fireAnimation} 2s cubic-bezier(0.7, 0.37, 0.93, 0.67);
`
const TagLine = styled.h3`
  color: #367db7;
  padding-top: 2rem;
  font-family: museo_sans500_Italic, sans-serif;
  font-size: 1.5rem;
`

const FireyTitle = ({ isExpandedMobileNav, hideIcon }) => (
  <firey-title->
    <WDSTitle>WEB DEV & SAUSAGES</WDSTitle>
    <GrillImg
      src="../../assets/grill.svg"
      isExpandedMobileNav={isExpandedMobileNav}
      hide={hideIcon}
    />
    <TagLine>Feeding hungry devs with ideas and sausages since 2016</TagLine>
  </firey-title->
)

export default FireyTitle
