import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { LoginHelper } from '../helpers/loginHelper'
import { AssertionHelper } from '../helpers/assertionHelper'
import { LOGIN_DATA } from '../data/testData'

test.describe('Chức năng Đăng nhập', () => {
    let loginHelper: LoginHelper;
    let assert: AssertionHelper;

    test.beforeEach(async ({ page }) => {
        const homePage = new HomePage(page);
        loginHelper = new LoginHelper(page);
        assert = new AssertionHelper(page);
        await homePage.goto();
    });

    test('TC04_Đăng nhập thành công', async ({ page }) => {
        await loginHelper.login(LOGIN_DATA.valid.email, LOGIN_DATA.valid.password);

        // Đợi Modal đóng lại hoàn toàn (Hidden)
        const loginModal = page.locator("input[placeholder*='tài khoản']");
        await expect(loginModal).toBeHidden({ timeout: 15000 });

        // Kiểm tra xem Avatar người dùng có hiện ra không (để biết đã vào trong)
        await expect(page.locator("img.h-10").first()).toBeVisible();
    });

    test('TC05_Đăng nhập thất bại - Sai mật khẩu', async () => {
        await loginHelper.login(LOGIN_DATA.valid.email, LOGIN_DATA.invalid.wrongPass);
        await assert.expectErrorMessage('Email hoặc mật khẩu không đúng');
    });

    test('TC06_Đăng nhập thất bại - Email chưa đăng ký', async () => {
        await loginHelper.login(LOGIN_DATA.invalid.wrongEmail, LOGIN_DATA.valid.password);
        await assert.expectErrorMessage('Email hoặc mật khẩu không đúng');
    });

    test('TC_Edge_Đăng nhập - Bỏ trống thông tin', async () => {
        await loginHelper.login('', '');
        await assert.expectValidationError();
    });
});