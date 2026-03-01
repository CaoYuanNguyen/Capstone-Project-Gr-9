import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { LichSuDatPhongPage } from '../pages/LichSuDatPhongPage'

test.describe('Lịch sử đặt phòng', () => {
    test("Xem lịch sử đặt phòng thành công", async ({ page }) => {
        test.setTimeout(90000)
        const homePage = new HomePage(page)
        const lichSuPage = new LichSuDatPhongPage(page)

        // b1: truy cập trang web
        await homePage.goto()
        await page.waitForTimeout(1500)

        // b2: click vào user menu
        await homePage.clickUserMenu()

        // b3: click nút Đăng nhập
        await homePage.clickDangNhapButton()

        // b4: điền email
        const emailInput = page.locator("input[placeholder='Vui lòng nhập tài khoản']")
        await emailInput.waitFor({ state: 'visible', timeout: 6000 })
        await emailInput.fill("tnguyen22@gmail.com")
        await page.waitForTimeout(1000)

        // b5: điền password
        const passInput = page.locator("input[placeholder='Vui lòng nhập mật khẩu']")
        await passInput.fill("123")
        await page.waitForTimeout(1500)

        // b6: click nút Đăng nhập trong modal
        await page.locator("button:has-text('Đăng nhập')").last().click()
        await page.waitForTimeout(1800)

        // b7: chọn địa điểm Hồ Chí Minh
        await lichSuPage.chonDiaDiem()

        // b8: scroll xuống và chọn phòng đầu tiên
        await lichSuPage.chonPhong()

        // b9: chọn ngày check-in và check-out
        await lichSuPage.chonNgay()

        // b10: thêm khách
        await lichSuPage.themKhach()

        // b11: click nút Đặt phòng
        await lichSuPage.clickDatPhong()

        // b12: click vào user menu sau khi đặt phòng xong
        await lichSuPage.clickUserMenu()

        // b13: click vào Dashboard
        await lichSuPage.clickDashboard()

        // b14: kiểm tra đang ở trang Dashboard
        await lichSuPage.waitForDashboard()

        // b15: scroll xuống xem phần Phòng đã thuê
        await lichSuPage.scrollToPhongDaThue()

        // b16: kiểm tra section Phòng đã thuê hiển thị
        await expect(lichSuPage.phongDaThue).toBeVisible()

        expect(true).toBeTruthy()
    })
})