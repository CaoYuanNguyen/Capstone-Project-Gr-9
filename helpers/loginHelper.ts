import { Page } from '@playwright/test'

export class LoginHelper {
    readonly page: Page
    constructor(page: Page) { this.page = page }

    async login(email: string, password: string): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded');

        // 1. CLICK BUTTON MỞ MENU
        const avatarBtn = this.page.locator('button:has(img.h-10)').first();
        await avatarBtn.waitFor({ state: 'visible' });
        await avatarBtn.click();

        // 2. CLICK "Đăng nhập" TRONG DROPDOWN
        const menuLogin = this.page
            .locator('#user-dropdown button')
            .getByText('Đăng nhập');
        await menuLogin.waitFor({ state: 'visible', timeout: 5000 });
        await menuLogin.click();

        // 3. ĐIỀN THÔNG TIN
        const emailInput = this.page.getByPlaceholder('Vui lòng nhập tài khoản');
        await emailInput.waitFor({ state: 'visible' });
        await emailInput.fill(email);

        const passInput = this.page.getByPlaceholder('Vui lòng nhập mật khẩu');
        await passInput.fill(password);

        // 4. SUBMIT
        await passInput.press('Enter');
    }
}