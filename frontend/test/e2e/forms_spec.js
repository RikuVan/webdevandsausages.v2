import Page from './Page'
import { Selector } from 'testcafe'

const ROOT_URL = 'http://localhost:8080/'

const page = new Page()

fixture`Form tests`.page`${ROOT_URL}`

const fillRegistrationForm = page.findFieldAndFill('registration')
const fillVerificationForm = page.findFieldAndFill('verification')
const fillCancellationForm = page.findFieldAndFill('cancellation')

test('Register', async t => {
  await t.navigateTo(`${ROOT_URL}/registration?tab=register`)
  await fillRegistrationForm('email', 'richard.vancamp@gmail.com')
  await fillRegistrationForm('affiliation', 'Some company')
  await fillRegistrationForm('firstName', 'Riku')
  await fillRegistrationForm('lastName', 'Very Corny')
  await page.submitFor('registration')
  const popup = await page.selectElementById('popup-success')
  await t.expect(popup).ok()
  const closeBtn = await page.selectElementById('popup-btn-success')
  await t.click(closeBtn)
  await t.expect(Selector('svg#wds-logo'))
})

test('Verify', async t => {
  await t.navigateTo(`${ROOT_URL}/registration?tab=verify`)
  // Expect error for wrong token
  await fillVerificationForm('email', 'richard.vancamp@gmail.com')
  await fillVerificationForm('verificationToken', 'wrong-token')
  await page.submitFor('verification')
  const errorPopup = await page.selectElementById('popup-error')
  await t.expect(errorPopup).ok()
  const closeErrorBtn = await await page.selectElementById('popup-btn-error')
  await t.click(closeErrorBtn)
  // With Correct token
  await fillVerificationForm('email', 'richard.vancamp@gmail.com')
  await fillVerificationForm('verificationToken', 'wds-test')
  await page.submitFor('verification')
  const successPopup = await page.selectElementById('popup-success')
  await t.expect(successPopup).ok()
  const closeSuccessBtn = await page.selectElementById('popup-btn-success')
  await t.click(closeSuccessBtn)
  await t.expect(Selector('svg#wds-logo'))
})

test('Cancel', async t => {
  await t.navigateTo(`${ROOT_URL}/registration?tab=cancel`)
  await fillCancellationForm('email', 'richard.vancamp@gmail.com')
  await fillCancellationForm('verificationToken', 'wds-test')
  await page.submitFor('cancellation')
  const popup = await page.selectElementById('popup-success')
  await t.expect(popup).ok()
  const closeBtn = await page.selectElementById('popup-btn-success')
  await t.click(closeBtn)
  await t.expect(Selector('svg#wds-logo'))
})
