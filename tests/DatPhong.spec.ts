import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { DatPhongPage } from '../pages/DatPhongPage'
import { AssertionHelper } from '../helpers/assertionHelper'

test.describe('Đặt phòng', () => {

    test('TC18_Đặt phòng thất bại - Chưa đăng nhập', async ({ page }) => {
        const homePage    = new HomePage(page)
        const datPhongPage = new DatPhongPage(page)
        const assert       = new AssertionHelper(page)

        await homePage.goto()
        await datPhongPage.clickDiaDiem()
        await datPhongPage.clickPhongDauTien()
        await datPhongPage.waitForChiTiet()
        await datPhongPage.scrollToDatePhong()
        await datPhongPage.clickDatPhong()

        await assert.expectNotification('Vui lòng đăng nhập')
    })
})