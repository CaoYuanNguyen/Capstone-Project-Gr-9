import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { ChinhSuaHoSoPage } from '../pages/ChinhSuaHoSoPage'
import { LoginHelper } from '../helpers/loginHelper'
import { AssertionHelper } from '../helpers/assertionHelper'
import { LOGIN_DATA, CHINH_SUA_DATA } from '../data/testData'

test.describe('Chỉnh sửa hồ sơ', () => {

    test('TC23_Cập nhật thông tin cá nhân thành công', async ({ page }) => {
        const homePage    = new HomePage(page)
        const chinhSuaPage = new ChinhSuaHoSoPage(page)
        const loginHelper  = new LoginHelper(page)
        const assert       = new AssertionHelper(page)

        await homePage.goto()
        await loginHelper.login(LOGIN_DATA.valid.email, LOGIN_DATA.valid.password)

        await chinhSuaPage.clickUserMenu()
        await chinhSuaPage.clickDashboard()
        await chinhSuaPage.waitForDashboard()
        await chinhSuaPage.clickChinhSuaHoSo()

        await chinhSuaPage.fillEmail(CHINH_SUA_DATA.valid.email)
        await chinhSuaPage.fillHoTen(CHINH_SUA_DATA.valid.hoTen)
        await chinhSuaPage.fillSoDienThoai(CHINH_SUA_DATA.valid.phone)
        await chinhSuaPage.fillNgaySinh(CHINH_SUA_DATA.valid.birthday)
        await chinhSuaPage.selectGioiTinh(CHINH_SUA_DATA.valid.gender)
        await chinhSuaPage.clickCapNhat()

        await assert.expectSuccessMessage('thành công')
    })
})