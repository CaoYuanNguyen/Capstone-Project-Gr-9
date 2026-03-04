import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { RegisterModal } from '../pages/RegisterModal'
import { AssertionHelper } from '../helpers/assertionHelper'
import { REGISTER_DATA } from '../data/testData'

test.describe('Đăng Ký', () => {

    test('TC01_Đăng ký tài khoản mới thành công', async ({ page }) => {
        const homePage     = new HomePage(page)
        const registerModal = new RegisterModal(page)
        const assert        = new AssertionHelper(page)
        const d = REGISTER_DATA.valid

        await homePage.goto()
        await homePage.clickUserMenu()
        await homePage.clickDangKyButton()
        await registerModal.waitForModal()
        await registerModal.fillName(d.name)
        await registerModal.fillEmail(d.email)
        await registerModal.fillPassword(d.password)
        await registerModal.fillPhone(d.phone)
        await registerModal.fillBirthday(28)
        await registerModal.selectGender()
        await registerModal.clickSubmit()

        await assert.expectSuccessMessage()
    })

    test('TC02_Đăng ký thất bại - Email đã tồn tại', async ({ page }) => {
        const homePage     = new HomePage(page)
        const registerModal = new RegisterModal(page)
        const assert        = new AssertionHelper(page)
        const d = REGISTER_DATA.duplicateEmail

        await homePage.goto()
        await homePage.clickUserMenu()
        await homePage.clickDangKyButton()
        await registerModal.waitForModal()
        await registerModal.fillName(d.name)
        await registerModal.fillEmail(d.email)
        await registerModal.fillPassword(d.password)
        await registerModal.fillPhone(d.phone)
        await registerModal.fillBirthday(28)
        await registerModal.selectGender()
        await registerModal.clickSubmit()

        await assert.expectErrorMessage('tồn tại')
    })

    test('TC03_Đăng ký thất bại - Password không đủ mạnh', async ({ page }) => {
        const homePage     = new HomePage(page)
        const registerModal = new RegisterModal(page)
        const assert        = new AssertionHelper(page)
        const d = REGISTER_DATA.weakPassword

        await homePage.goto()
        await homePage.clickUserMenu()
        await homePage.clickDangKyButton()
        await registerModal.waitForModal()
        await registerModal.fillName(d.name)
        await registerModal.fillEmail(d.email)
        await registerModal.fillPassword(d.password)
        await registerModal.fillPhone(d.phone)
        await registerModal.fillBirthday(28)
        await registerModal.selectGender()
        await registerModal.clickSubmit()

        await assert.expectValidationError()
    })

    test('TC_Edge_Đăng ký - Bỏ trống tất cả fields', async ({ page }) => {
        const homePage     = new HomePage(page)
        const registerModal = new RegisterModal(page)
        const assert        = new AssertionHelper(page)

        await homePage.goto()
        await homePage.clickUserMenu()
        await homePage.clickDangKyButton()
        await registerModal.waitForModal()
        await registerModal.clickSubmit()

        await assert.expectValidationError()
    })

    test('TC_Edge_Đăng ký - Email sai format', async ({ page }) => {
        const homePage     = new HomePage(page)
        const registerModal = new RegisterModal(page)
        const assert        = new AssertionHelper(page)

        await homePage.goto()
        await homePage.clickUserMenu()
        await homePage.clickDangKyButton()
        await registerModal.waitForModal()
        await registerModal.fillName('Test User')
        await registerModal.fillEmail('emailsaiformat')
        await registerModal.fillPassword('12345678')
        await registerModal.fillPhone('0123456789')
        await registerModal.fillBirthday(28)
        await registerModal.selectGender()
        await registerModal.clickSubmit()

        await assert.expectValidationError()
    })

    test('TC_Edge_Đăng ký - Số điện thoại chứa chữ', async ({ page }) => {
        const homePage     = new HomePage(page)
        const registerModal = new RegisterModal(page)
        const assert        = new AssertionHelper(page)

        await homePage.goto()
        await homePage.clickUserMenu()
        await homePage.clickDangKyButton()
        await registerModal.waitForModal()
        await registerModal.fillName('Test User')
        await registerModal.fillEmail('testedge@gmail.com')
        await registerModal.fillPassword('12345678')
        await registerModal.fillPhone('abcdefghij')
        await registerModal.fillBirthday(28)
        await registerModal.selectGender()
        await registerModal.clickSubmit()

        await assert.expectValidationError()
    })
})