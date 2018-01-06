import { h } from 'preact'
import styled, { css } from 'styled-components'

import { toRem, tablet, phone } from '../../helpers/styleHelpers'
import PageWrapper from '../../components/PageWrapper'
import Footer from '../../components/Footer'

const Section = styled.div`
  ${({ theme }) =>
    css`
      padding: ${toRem(theme.navHeight)} ${toRem(theme.pagePadding)} 50vh;
    `};
  ${({ isExpandedMobileNav, theme }) =>
    isExpandedMobileNav &&
    tablet(css`
      padding-top: ${toRem(theme.navHeight * 1.8)};
    `)} ${({ isExpandedMobileNav, theme }) =>
      isExpandedMobileNav &&
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
  height: 100%;
  width: 100%;
`

const Title = styled.h1`
  color: #fff;
  font-size: 2rem;
  font-weight: 600;
  margin: 4rem 0 2rem;
  opacity: 0.8;
`

const NotFound = ({ isExpandedMobileNav }) => (
  <PageWrapper>
    <Section isExpandedMobileNav={isExpandedMobileNav}>
      <Title>404</Title>
      <h2>Sorry no page here</h2>
    </Section>
    <Footer color="primaryOrange" />
  </PageWrapper>
)

export default NotFound
