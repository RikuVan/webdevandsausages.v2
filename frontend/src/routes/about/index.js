import { h } from 'preact'
import styled, { css } from 'styled-components'
import { connect } from '../../preact-smitty'
import { pathOr } from 'ramda'
import lighten from 'polished/lib/color/lighten'

import speakers from '../../../../speakers.json'

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
  width: 100%;
`

const Heading = styled.h2`
  text-transform: uppercase;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 4rem 0 2rem;
  opacity: 0.8;
`

const MissionStatement = styled.div`
  diplay: flex;
  flex-direction: row;
  margin: auto;
  width: 80%;
  line-height: 150%;
  font-size: 20px;
`

const Article = styled.article`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  padding: 0 1rem;
  margin-bottom: 2rem;
`

const SponsorLogo = styled.img`
  position: relative;
  height: ${p => p.height || '2rem'};
  margin: 1rem;
  bottom: ${p => p.bottom || 0};
  opacity: 0.8;
  filter: brightness(0) invert(1);
  transition: opacity 125ms ease-in-out;
  &:hover {
    opacity: 1;
  }
`

const Speaker = styled.span`
  position: relative;
  font-size: 20px;
  margin: 0.2rem 1rem;
  opacity: 0.8;
  filter: brightness(0) invert(1);
  transition: opacity 125ms ease-in-out;
  &:hover {
    opacity: 1;
  }
`

const Hashtag = styled.span`
  ${({ theme }) =>
    css`
      color: ${lighten(0.1, theme.iconsColor)};
    `};
  :before: '#';
  opacity: 1;
`

const About = ({ isExpandedMobileNav }) => (
  <PageWrapper>
    <Section isExpandedMobileNav={isExpandedMobileNav}>
      <Heading>Our Mission</Heading>
      <MissionStatement>
        Web Dev &amp; Sausages is a <Hashtag>#meetup</Hashtag> based in Tampere,
        Finland and organized by web developers for our peers interested in{' '}
        <Hashtag>#web-based technologies</Hashtag> and{' '}
        <Hashtag>#programming in various languages</Hashtag>. Professionals,
        students, and hobbyists are welcome. Our mission is to create memorable,{' '}
        <Hashtag>#high-quality events</Hashtag> with diverse speakers. Our
        events may also include contests, hackathons, games, music and whatever
        else we can dream up. The one cosistent element is{' '}
        <Hashtag>#good food</Hashtag> and company. We are a volunteer
        organization that depends on companies to sponsor our events. Sponsors
        not only support the rich <Hashtag>#community</Hashtag> of developers to
        share their <Hashtag>#innovative ideas</Hashtag> but also gain
        recognition and a chance to recruit top talent.
      </MissionStatement>
      <Heading>Former Presenters</Heading>
      <Article>{speakers.names.map(name => <Speaker>{name}</Speaker>)}</Article>
      <Heading>Former Sponsors</Heading>
      <Article>
        <SponsorLogo src="../../assets/futurice-logo.svg" />
        <SponsorLogo src="../../assets/gofore-logo.svg" />
        <SponsorLogo src="../../assets/wapice-logo.svg" />
        <SponsorLogo src="../../assets/vincit-logo.svg" />
      </Article>
    </Section>
    <Footer color="primaryOrange" />
  </PageWrapper>
)

export default connect(state => ({
  isExpandedMobileNav: pathOr(false, ['ui', 'showMobileNav'], state)
}))(About)
