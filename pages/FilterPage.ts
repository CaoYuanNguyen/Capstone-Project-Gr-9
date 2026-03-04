import { Page, Locator } from '@playwright/test'

export class FilterPage {
    readonly page: Page
    readonly giaButton: Locator
    readonly giaPanel: Locator

    constructor(page: Page) {
        this.page = page

        // Button "Giá" trên thanh bộ lọc
        this.giaButton = page.getByRole("button", {name: "Giá"})
                            .or(page.locator("button:has-text('Giá')"))

        // Panel lọc giá xuất hiện sau khi click
        this.giaPanel = page.locator("[class*='price'], [class*='filter'], .dropdown")
    }

    // scroll xuống để thấy thanh bộ lọc
    async scrollToFilter(): Promise<void> {
    await this.page.evaluate(() => window.scrollBy(0, 100)) 
    await this.page.waitForTimeout(3000)
}

    // click vào button Giá
    async clickGia(): Promise<void> {
        await this.giaButton.waitFor({state: 'visible', timeout: 6000})
        await this.giaButton.click()
        await this.page.waitForTimeout(1000)
    }


}