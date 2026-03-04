import { Page, Locator } from '@playwright/test'

export async function highlightAndScreenshot(
    page: Page,
    locator: Locator,
    name: string
): Promise<void> {
    await locator.scrollIntoViewIfNeeded()
    await locator.evaluate((el: HTMLElement) => {
        el.style.border = '4px solid red'
        el.style.backgroundColor = 'yellow'
    })
    await page.waitForTimeout(400)
    await locator.evaluate((el: HTMLElement) => {
        el.style.border = ''
        el.style.backgroundColor = ''
    })
}