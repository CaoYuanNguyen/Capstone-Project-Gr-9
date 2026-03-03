import { Page, Locator } from '@playwright/test'

/**
 * BasePage: chứa các method dùng chung cho tất cả Page class
 * Các page class khác extend từ đây thay vì copy code
 */
export class BasePage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async highlight(locator: Locator): Promise<void> {
        await locator.scrollIntoViewIfNeeded()
        await locator.evaluate((el: HTMLElement) => {
            el.style.border = '4px solid red'
            el.style.backgroundColor = 'yellow'
        })
        await this.page.waitForTimeout(400)
        await locator.evaluate((el: HTMLElement) => {
            el.style.border = ''
            el.style.backgroundColor = ''
        })
    }

 
    async waitForNetworkIdle(): Promise<void> {
        await this.page.waitForLoadState('networkidle')
    }
}