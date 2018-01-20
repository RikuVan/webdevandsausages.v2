import Page from './Page'
import { Selector } from 'testcafe'

const ROOT_URL = 'http://localhost:8080/'

const page = new Page()

fixture`Route tests`.page`${ROOT_URL}`

test('All routes render correct pages', async t => {
  await t.navigateTo(ROOT_URL).expect(Selector('svg#wds-logo'))
  await t.expect(Selector('div#current-event-console'))
  await t.click('button#register-link-button')
  await page.hasPageTitle('REGISTRATION')
  await t.click('#cancel')
  const url = await page.getUrl()
  await t.expect(url.search).contains('?tab=cancel')
  await t.click('#verify')
  const url2 = await page.getUrl()
  await t.expect(url2.search).contains('?tab=verify')
  await t.click(Selector('#about'))
  await page.hasPageTitle('ABOUT US')
})
