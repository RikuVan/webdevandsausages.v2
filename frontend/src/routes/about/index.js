import { h } from 'preact'
import styled, { css } from 'styled-components'
import { connect } from '../../preact-smitty'
import R from '../../helpers'
import lighten from 'polished/lib/color/lighten'

import speakers from '../../../../speakers.json'

import { toRem, tablet, phone } from '../../helpers/styleHelpers'
import PageWrapper from '../../components/PageWrapper'
import Footer from '../../components/Footer'
import PageTitle from '../../components/PageTitle'
import Separator from '../../components/Separator'
import { Grid, Cell } from '../../components/layout'
import Section from '../../components/Section'

const Heading = styled.h2`
  color: #fff;
  font-size: 2.5rem;
  font-weight: 700;
  margin: 4rem 0 2rem;
  opacity: 0.8;
  ${({ color, theme }) =>
    color &&
    css`
      color: ${theme[color]};
    `};
  ${({ small }) =>
    small &&
    css`
      font-size: 1.8rem};
    `};
  ${tablet(`font-size: 2rem`)};
  ${phone(`font-size: 1.5rem`)};
`

const TagLine = styled.h3`
  font-size: 1.5rem;
  color: #fff;
  ${tablet(`font-size: 1.2rem`)};
  ${phone(`font-size: 1rem`)};
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
  padding-bottom: 3rem;
  width: 50%;
  margin: auto;
`

//TODO: refactor into resuable version - similar ones in other pages
const PresentersSection = styled.section`
  width: 100%;
  background: white;
  margin: 0;
  padding: 1rem 0 3rem;
  margin-top: ${toRem(100)};
  box-shadow: inset 0 2px 20px rgba(0, 0, 0, 0.17);
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

const Speaker = styled(Cell)`
  ${({ theme }) =>
    css`
      color: ${theme.secondaryBlue};
    `} font-size: 20px;
`

const Hashtag = styled.span`
  ${({ theme }) =>
    css`
      color: ${lighten(0.1, theme.primaryOrange)};
    `};
  :before: '#';
  opacity: 1;
`

const About = ({ isExpandedMobileNav }) => (
  <PageWrapper>
    <Section isExpandedMobileNav={isExpandedMobileNav}>
      <PageTitle>About Us</PageTitle>
      <TagLine>Feeding hungry devs with ideas and sausages since 2016</TagLine>
      <Separator />
      <MissionStatement>
        Web Dev &amp; Sausages is based in <Hashtag>#Tampere, Finland</Hashtag>{' '}
        and organized for those interested in{' '}
        <Hashtag>#web-based technologies</Hashtag> and{' '}
        <Hashtag>#programming in various languages</Hashtag> or just hungry for
        sausages. Professionals, students, and hobbyists are welcome. Our
        mission is to create memorable, <Hashtag>#high-quality events</Hashtag>{' '}
        with diverse speakers. Our events include contests,{' '}
        <Hashtag>#hackathons</Hashtag>, games, music and whatever else we can
        dream up. The one consistent element is <Hashtag>#good food</Hashtag>{' '}
        and company. We are a volunteer organization that depends on companies
        to sponsor our events. Sponsors not only support the rich{' '}
        <Hashtag>#community</Hashtag> of developers to share their{' '}
        <Hashtag>#innovative ideas</Hashtag> but also gain recognition and a
        chance to recruit top talent.
      </MissionStatement>
      <PresentersSection>
        <Heading color="primaryOrange" small>
          Speakers
        </Heading>
        <Article>
          <Grid columns="repeat(auto-fit,minmax(220px,1fr))">
            {speakers.names.map(name => (
              <Speaker>{name}</Speaker>
            ))}
          </Grid>
        </Article>
      </PresentersSection>
      <Heading small>Former Sponsors</Heading>
      <Article>
        <a href="https://futurice.com">
          <SponsorLogo src="../../assets/futurice-logo.svg" />
        </a>
        <a href="https://gofore.com">
          <SponsorLogo src="../../assets/gofore-logo.svg" />
        </a>
        <a href="https://wapice.com">
          <SponsorLogo src="../../assets/wapice-logo.svg" />
        </a>
        <a href="https://vincit.com">
          <SponsorLogo src="../../assets/vincit-logo.svg" />
        </a>
        <a href="https://www.solita.fi">
          <SponsorLogo src="../../assets/solita-logo-white.svg" />
        </a>
        <a href="https://www.happy-or-not.com">
          <SponsorLogo src="../../assets/happyornot.svg" />
        </a>
      </Article>
    </Section>
    <Footer color="primaryOrange" />
  </PageWrapper>
)

export default connect(state => ({
  isExpandedMobileNav: R.pathOr(false, ['ui', 'showMobileNav'], state)
}))(About)
