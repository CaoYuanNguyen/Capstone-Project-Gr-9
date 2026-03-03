import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { LoginHelper } from '../helpers/loginHelper'
import { LOGIN_DATA } from '../data/testData'

test.describe('Đăng nhập', () => {

  test('TC04_Đăng nhập thành công', async ({ page }) => {
        const homePage = new HomePage(page)
        const loginHelper = new LoginHelper(page)

        await homePage.goto()
        await loginHelper.login(LOGIN_DATA.valid.email, LOGIN_DATA.valid.password)

        
        await expect(page.locator("img.h-10")).toBeVisible({ timeout: 5000 })
        await expect(
            page.locator("input[placeholder='Vui lòng nhập tài khoản']")
      ).toHaveCount(0)
  })
})