import { h } from 'preact'
import styled, { css } from 'styled-components'

import { phone, tablet } from '../../helpers/styleHelpers'
import { Grid, Cell } from '../../components/layout'
import LazyImg from '../../components/LazyImg'
import SectionTitle from '../../components/SectionTitle'

const Wrapper = styled.div`
  min-height: 20vh;
  width: 80%;
  background: #fff;
  margin-bottom: 4rem;
`

export const MerchandiseWrapper = styled.article`
  text-align: left;
  margin: auto;
  padding-top: 1rem;
  width: 60%;
  @media (max-width: ${1600 / 18}em) {
    width: 70%;
  }
  ${tablet(css`
    width: 80%;
  `)};
  ${phone(css`
    width: 90%;
  `)};
  ${({ theme }) =>
    css`
      color: ${theme.primaryOrange};
    `};
`

const ImgCell = styled(Cell)`
  padding-bottom: 0;
  margin-bottom: 0;
`

const MERCH = ['stickers', 'hat', 'cup', 'shirt', 'pipo', 'mugs', 'beer']

const Merchandise = () => (
  <Wrapper>
    <SectionTitle paddingBottom={40}>Goodies</SectionTitle>
    <Grid columns="repeat(auto-fit,minmax(350px,1fr))">
      {MERCH.map(item => (
        <ImgCell>
          <LazyImg
            src={`../../../assets/merchandise/${item}.jpg`}
            alt={item}
            height={item === 'beer' && 250}
          />
        </ImgCell>
      ))}
    </Grid>
  </Wrapper>
)

export default Merchandise
