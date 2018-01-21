import { Selector, t, ClientFunction } from 'testcafe'

const getWindowLocation = ClientFunction(() => window.location)
const elementWithId = Selector(id => document.getElementById(id))
const visibleElementWithId = elementWithId.with({
  visibilityCheck: true
})

export default class Page {
  getUrl = async () => await getWindowLocation()

  hasPageTitle = async text =>
    await t.expect(Selector('H1').innerText).contains(text)

  findInputFor = async (id, name) =>
    await Selector(`form#${id}`)
      .find('input')
      .withAttribute('name', name)

  submitFor = async id =>
    await t
      .click(
        Selector(`form#${id}`)
          .find('button')
          .withAttribute('type', 'submit')
      )
      .wait(1000)

  selectElementById = async id => await visibleElementWithId(id)

  findFieldAndFill = formType => async (inputType, val) => {
    const field = await this.findInputFor(formType, inputType)
    await t.typeText(field, val)
  }
}
