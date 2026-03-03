import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { UploadAvatarPage } from '../pages/UploadAvatarPage'
import { LoginHelper } from '../helpers/loginHelper'
import { LOGIN_DATA } from '../data/testData'

test.describe('Upload Avatar', () => {
    test("Upload avatar thành công", async ({ page }) => {
        const homePage = new HomePage(page)
        const uploadPage = new UploadAvatarPage(page)

        // b1: truy cập trang web
        await homePage.goto()

        // // b2: click vào user menu
        // await homePage.clickUserMenu()

        // // b3: click nút Đăng nhập
        // await homePage.clickDangNhapButton()

        // // b4: điền email đăng nhập
        // const emailLoginInput = page.locator("input[placeholder='Vui lòng nhập tài khoản']")
        // await emailLoginInput.waitFor({ state: 'visible', timeout: 6000 })
        // await emailLoginInput.fill("tnguyen22@gmail.com")

        // // b5: điền password
        // const passInput = page.locator("input[placeholder='Vui lòng nhập mật khẩu']")
        // await passInput.fill("123")
        // await page.waitForTimeout(1000)

        // // b6: click nút Đăng nhập trong modal
        // await page.locator("button:has-text('Đăng nhập')").last().click()
        // await page.waitForTimeout(3000)

        const loginHelper = new LoginHelper(page)
        await loginHelper.login(LOGIN_DATA.valid.email, LOGIN_DATA.valid.password)
        await page.waitForTimeout(1000)

        // b7: click vào user menu sau khi đăng nhập
        await uploadPage.clickUserMenu()

        // b8: click vào Dashboard
        await uploadPage.clickDashboard()

        // b9: kiểm tra đang ở trang Dashboard
        await uploadPage.waitForDashboard()

        // b10: click vào link Cập nhật ảnh
        await uploadPage.clickCapNhatAnh()

        // b11: chọn file ảnh từ máy tính
        await uploadPage.chooseFile("C:\\Users\\NGUYEN\\OneDrive\\Pictures\\Miu\\15e58ae66b57e409bd46.jpg")

        // b12: click nút Upload Avatar
        await uploadPage.clickUploadAvatar()

        // b13: kiểm tra thông báo upload thành công
        const thongBao = page.locator(".ant-message-notice-content")
        await expect(thongBao).toBeVisible({ timeout: 5000 })
        await expect(thongBao).toContainText("avatar")
    })
})