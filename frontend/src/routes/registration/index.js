import { h } from 'preact'
import styled, { css } from 'styled-components'
import { pathOr } from 'ramda'
import { connect } from '../../preact-smitty'
import opacify from 'polished/lib/color/opacify'
import transparentize from 'polished/lib/color/transparentize'
import format from 'date-fns/format'

import { theme } from '../../style/theme'
import { toRem, tablet, phone } from '../../helpers/styleHelpers'
import store from '../../store'

import PageWrapper from '../../components/PageWrapper'
import RegistrationForm from './RegistrationForm'

const TopSection = styled.div`
  padding: ${toRem(theme.navHeight)} ${toRem(theme.pagePadding)} 100%;
  ${p =>
    p.isExpandedMobileNav &&
    tablet(css`
      padding-top: ${toRem(theme.navHeight * 1.8)};
    `)} ${p =>
      p.isExpandedMobileNav &&
      phone(css`
        padding-top: ${toRem(theme.navHeight * 2.2)};
      `)};
  background: linear-gradient(15deg, ${theme.primaryOrange}, ${'#52bdf6'});
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.17);
  width: 100%;
`

const TabsContainer = styled.section`
  width: 70%;
  margin: auto;
  margin-top: ${toRem(100)};
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.17);
  ${tablet(css`
    width: 80%;
    margin-top: ${toRem(150)};
  `)};
  ${phone(css`
    width: 100%;
    margin-top: ${toRem(150)};
  `)};
`

const Tabs = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

const Tab = styled.div`
  flex-grow: 1;
  max-height: ${toRem(100)};
  min-width: ${toRem(250)};
  display: inline-block;
  padding: 10px;
  vertical-align: top;
  background: transparent;
  cursor: hand;
  cursor: pointer;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid ${opacify(0.1, theme.secondaryBlue)};
  font-size: ${toRem(24)};
  color: ${theme.secondaryBlue};
  &:hover {
    background: ${transparentize(0.5, '#52bdf6')};
    border-top: 5px solid ${theme.secondaryBlue};
  }
  ${p =>
    p.active &&
    css`
      background: ${transparentize(0.4, theme.primaryOrange)};
      color: ${theme.secondaryBlue};
      border-top: 5px solid ${theme.secondaryBlue};
      border-bottom: none;
      &:hover {
        background: ${transparentize(0.3, theme.primaryOrange)};
        border-top: 5px solid ${theme.secondaryBlue};
    `};
`

const Panel = styled.div`
  min-height: 200px;
  background: ${transparentize(0.4, theme.primaryOrange)};
  display: none;
  align-items: start;
  padding: ${toRem(20)};
  ${p =>
    p.active &&
    css`
      display: flex;
      flex-direction: column;
    `};
`

const Footer = styled.article`
  background: ${theme.primaryOrange};
  min-height: 10vh;
  width: 100%;
`

const handleClick = tab => e => {
  e.preventDefault()
  store.actions.changeTab(tab)
}
const Registration = ({
  isExpandedMobileNav,
  hideIcon,
  event,
  loadingEvent,
  isEventOpen,
  currentTab
}) => (
  <PageWrapper>
    <TopSection>
      <TabsContainer>
        <Tabs>
          <Tab
            active={currentTab === 'registration'}
            onClick={handleClick('registration')}
          >
            Registration
          </Tab>
          <Tab
            active={currentTab === 'cancellation'}
            onClick={handleClick('cancellation')}
          >
            Cancellation
          </Tab>
          <Tab
            active={currentTab === 'verification'}
            onClick={handleClick('verification')}
          >
            Verification
          </Tab>
        </Tabs>
        <Panel active={currentTab === 'registration'}>
          <RegistrationForm
            eventDate={
              event.datetime ? format(event.datetime, 'MMMM Do, YYYY') : ''
            }
            eventId={event.id}
          />
        </Panel>
        <Panel active={currentTab === 'cancellation'}>Tab 2</Panel>
        <Panel active={currentTab === 'verification'}>Tab 3</Panel>
      </TabsContainer>
    </TopSection>
    <Footer />
  </PageWrapper>
)

export default connect(state => ({
  currentTab: pathOr('registration', ['ui', 'currentTab'], state)
}))(Registration)
