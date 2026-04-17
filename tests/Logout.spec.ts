import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LogoutHelper } from '../helpers/logoutHelper';
import { LogoutPage } from '../pages/LogoutPage';
import { LOGIN_DATA } from '../data/testData';

test.describe('Chức năng Đăng xuất', () => {
    let logoutHelper: LogoutHelper;
    let logoutPage: LogoutPage;

    test.beforeEach(async ({ page }) => {
        const homePage = new HomePage(page);
        logoutHelper = new LogoutHelper(page);
        logoutPage = new LogoutPage(page);
        await homePage.goto();
    });

    test('TC07_Đăng xuất thành công', async ({ page }) => {
        // Login trước (tái sử dụng TC04)
        await logoutHelper.loginThenLogout(
            LOGIN_DATA.valid.email,
            LOGIN_DATA.valid.password
        );

        // Kiểm tra redirect về trang chủ
        await expect(page).toHaveURL(/.*\//);

        // Kiểm tra avatar đổi lại thành icon mặc định (không có tên user)
        const userNameSpan = page.locator('button#user-menu-button span.uppercase');
        await expect(userNameSpan).toBeHidden({ timeout: 10000 });
    });
});