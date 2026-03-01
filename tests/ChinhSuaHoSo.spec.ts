import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { ChinhSuaHoSoPage } from '../pages/ChinhSuaHoSoPage'

test.describe('Chỉnh sửa hồ sơ', () => {
    test("Chỉnh sửa hồ sơ thành công", async ({ page }) => {
        const homePage = new HomePage(page)
        const chinhSuaPage = new ChinhSuaHoSoPage(page)

        // b1: truy cập trang web
        await homePage.goto()

        // b2: click vào user menu
        await homePage.clickUserMenu()

        // b3: click nút Đăng nhập
        await homePage.clickDangNhapButton()

        // b4: điền email đăng nhập
        const emailLoginInput = page.locator("input[placeholder='Vui lòng nhập tài khoản']")
        await emailLoginInput.waitFor({ state: 'visible', timeout: 6000 })
        await emailLoginInput.fill("tnguyen22@gmail.com")

        // b5: điền password
        const passInput = page.locator("input[placeholder='Vui lòng nhập mật khẩu']")
        await passInput.fill("123")
        await page.waitForTimeout(1000)

        // b6: click nút Đăng nhập trong modal
        await page.locator("button:has-text('Đăng nhập')").last().click()
        await page.waitForTimeout(3000)

        // b7: click vào user menu sau khi đăng nhập
        await chinhSuaPage.clickUserMenu()

        // b8: click vào Dashboard
        await chinhSuaPage.clickDashboard()

        // b9: kiểm tra đang ở trang Dashboard
        await chinhSuaPage.waitForDashboard()

        // b10: click vào link Chỉnh sửa hồ sơ
        await chinhSuaPage.clickChinhSuaHoSo()

        // b11: điền email
        await chinhSuaPage.fillEmail("tnguyen22@gmail.com")

        // b12: điền họ tên
        await chinhSuaPage.fillHoTen("Nguyên")

        // b13: điền số điện thoại
        await chinhSuaPage.fillSoDienThoai("0123453525")

        // b14: điền ngày sinh
        await chinhSuaPage.fillNgaySinh("28/07/2004")

        // b15: chọn giới tính
        await chinhSuaPage.selectGioiTinh("Nữ")

        // b16: click nút Cập nhật
        await chinhSuaPage.clickCapNhat()

        // b17: kiểm tra thông báo cập nhật thành công
        const thongBao = page.locator(".ant-message-notice-content")
        await expect(thongBao).toBeVisible({ timeout: 5000 })
        await expect(thongBao).toContainText("thành công")

        expect(true).toBeTruthy()
    })
})