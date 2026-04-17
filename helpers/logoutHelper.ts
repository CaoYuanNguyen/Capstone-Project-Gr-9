import { Page } from '@playwright/test';
import { LoginHelper } from './loginHelper';
import { LogoutPage } from '../pages/LogoutPage';

export class LogoutHelper {
    readonly page: Page;
    private loginHelper: LoginHelper;
    private logoutPage: LogoutPage;

    constructor(page: Page) {
        this.page = page;
        this.loginHelper = new LoginHelper(page);
        this.logoutPage = new LogoutPage(page);
    }

    async loginThenLogout(email: string, password: string): Promise<void> {
        // Tái sử dụng login từ TC04
        await this.loginHelper.login(email, password);

        // Đợi login xong (modal đóng)
        await this.page.waitForSelector("input[placeholder*='tài khoản']", {
            state: 'hidden',
            timeout: 15000
        });

        // Thực hiện logout
        await this.logoutPage.signOut();
    }
}