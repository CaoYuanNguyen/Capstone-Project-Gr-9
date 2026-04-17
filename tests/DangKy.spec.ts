import { test } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { RegisterModal } from '../pages/RegisterModal'
import { AssertionHelper } from '../helpers/assertionHelper'
import { REGISTER_DATA } from '../data/testData'

test.describe('Đăng Ký', () => {
    let homePage: HomePage;
    let registerModal: RegisterModal;
    let assert: AssertionHelper;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        registerModal = new RegisterModal(page);
        assert = new AssertionHelper(page);
        await homePage.goto();
    });

    test('TC01_Đăng ký tài khoản mới thành công', async () => {
        const d = REGISTER_DATA.valid;

        await homePage.clickUserMenu();
        await homePage.clickDangKyButton();
        await registerModal.waitForModal();
        
        await registerModal.fillName(d.name);
        await registerModal.fillEmail(d.email);
        await registerModal.fillPassword(d.password);
        await registerModal.fillPhone(d.phone);
        await registerModal.fillBirthday(d.birthday); 
        await registerModal.selectGender();
        await registerModal.clickSubmit();

        await assert.expectSuccessMessage();
    });

    test('TC02_Đăng ký thất bại - Email đã tồn tại', async () => {
        const d = REGISTER_DATA.duplicateEmail;

        await homePage.clickUserMenu();
        await homePage.clickDangKyButton();
        await registerModal.waitForModal();
        
        await registerModal.fillName(d.name);
        await registerModal.fillEmail(d.email);
        await registerModal.fillPassword(d.password);
        await registerModal.fillPhone(d.phone);
        await registerModal.fillBirthday(); 
        await registerModal.selectGender();
        await registerModal.clickSubmit();

        await assert.expectErrorMessage('tồn tại');
    });

    test('TC03_Đăng ký thất bại - Password không đủ mạnh', async () => {
        const d = REGISTER_DATA.weakPassword;

        await homePage.clickUserMenu();
        await homePage.clickDangKyButton();
        await registerModal.waitForModal();
        
        await registerModal.fillName(d.name);
        await registerModal.fillEmail(d.email);
        await registerModal.fillPassword(d.password);
        await registerModal.fillPhone(d.phone);
        await registerModal.fillBirthday();
        await registerModal.selectGender();
        await registerModal.clickSubmit();

        await assert.expectValidationError();
    });

    test('TC_Edge_Đăng ký - Bỏ trống tất cả fields', async () => {
        await homePage.clickUserMenu();
        await homePage.clickDangKyButton();
        await registerModal.waitForModal();
        await registerModal.clickSubmit();

        await assert.expectValidationError();
    });

    test('TC_Edge_Đăng ký - Email sai format', async () => {
        await homePage.clickUserMenu();
        await homePage.clickDangKyButton();
        await registerModal.waitForModal();
        await registerModal.fillName('Test User');
        await registerModal.fillEmail('emailsaiformat');
        await registerModal.fillPassword('12345678');
        await registerModal.fillPhone('0123456789');
        await registerModal.fillBirthday();
        await registerModal.selectGender();
        await registerModal.clickSubmit();

        await assert.expectValidationError();
    });

    test('TC_Edge_Đăng ký - Số điện thoại chứa chữ', async () => {
        await homePage.clickUserMenu();
        await homePage.clickDangKyButton();
        await registerModal.waitForModal();
        await registerModal.fillName('Test User');
        await registerModal.fillEmail('testedge@gmail.com');
        await registerModal.fillPassword('12345678');
        await registerModal.fillPhone('abcdefghij');
        await registerModal.fillBirthday();
        await registerModal.selectGender();
        await registerModal.clickSubmit();

        await assert.expectValidationError();
    });
});