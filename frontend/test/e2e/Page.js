import { Selector, t, ClientFunction } from 'testcafe'

const getWindowLocation = ClientFunction(() => window.location)

export default class Page {
  getUrl = async () => await getWindowLocation()
  hasPageTitle = async text =>
    await t.expect(Selector('H1').innerText).contains(text)
}
