import { h } from 'preact'
import styled, { css } from 'styled-components'

import { toRem } from '../../helpers/styleHelpers'
import PageWrapper from '../../components/PageWrapper'

const Section = styled.div`
  ${({ theme }) =>
    css`
      padding: ${toRem(theme.navHeight)} ${toRem(theme.pagePadding)} 100%;
    `};
  ${p =>
    p.isExpandedMobileNav &&
    tablet(css`
      padding-top: ${toRem(theme.navHeight * 1.8)};
    `)} ${p =>
      p.isExpandedMobileNav &&
      phone(css`
        padding-top: ${toRem(theme.navHeight * 2.2)};
      `)};
  ${({ theme }) =>
    css`
      background: linear-gradient(
        15deg,
        ${theme.primaryOrange},
        ${theme.primaryBlue}
      );
    `};
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.17);
  width: 100%;
`

const About = () => {
  return (
    <PageWrapper>
      <Section>
        <h1>hi</h1>
      </Section>
    </PageWrapper>
  )
}

export default About
