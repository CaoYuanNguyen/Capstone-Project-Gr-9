import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { FilterPage } from '../pages/FilterPage'

test.describe('Filter theo khoảng giá', () => {

    test('TC11_Kiểm tra chức năng filter theo khoảng giá', async ({ page }) => {
        const homePage  = new HomePage(page)
        const filterPage = new FilterPage(page)

        await homePage.goto()
        await filterPage.scrollToFilter()
        await filterPage.clickGia()

        // Dùng locator cụ thể hơn thay vì .dropdown chung chung
        const giaPanel = page.locator("[class*='price']")
            .or(page.locator("[class*='filter-panel']"))
            .or(page.locator(".ant-dropdown"))
            .or(page.locator("[class*='Popover'], [class*='popup']"))

        await expect(giaPanel.first()).toBeVisible({ timeout: 5000 })
    })
})