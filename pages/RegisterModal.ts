import {Page, Locator} from '@playwright/test';

export class RegisterModal {
    readonly page: Page;

    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly phoneInput: Locator;
    readonly birthdayInput: Locator;
    readonly genderSelect: Locator;
    readonly submitButton: Locator;
    readonly closeButton: Locator;
    readonly modal: Locator;

    constructor(page: Page) {
        this.page = page;
        this.modal = page.locator(".ant-modal-content")
    
        // <input name="name" 
        // placeholder="Điền tên vào đây..." 
        // id="name" 
        // class="ant-input css-zl9ks2 ant-input-outlined p-2" 
        // type="text" 
        // value="" 
        // fdprocessedid="rm8b7q">

        this.nameInput = page.locator("input#name").or(page.getByRole("textbox", {name:"name"}))
        this.emailInput = page.locator("input#email").or(page.getByRole("textbox", {name:"email"}))
        this.passwordInput = page.locator("input#password").or(page.getByRole("textbox", {name:"password"}))
        this.phoneInput = page.locator("input#phone").or(page.getByRole("textbox", {name:"phone"}))
        this.birthdayInput = page.locator("input#birthday").or(page.getByRole("textbox", {name:"birthday"}))
        this.genderSelect = page.locator("div.ant-select[name = 'gender']")
        this.submitButton = page.locator(".ant-modal-content button[type='submit']")
                    .or(page.locator(".ant-modal-content button:has-text('Đăng ký')"))
    }

    // B4: doi modal xuat hien
    async waitForModal(timeout: number = 60000) : Promise<void> {
        await this.modal.waitFor({state: 'visible', timeout})
    }

    // B5: Dien ten
    async fillName (name: string) : Promise<void> {
        await this.nameInput.fill(name);
        await this.page.waitForTimeout(2000);
    }

    // B6: Dien email
    async fillEmail (email: string) : Promise<void> {
        await this.emailInput.fill(email);
        await this.page.waitForTimeout(1000);
    }

    // B7: dien password
    async fillPassword (password: string) : Promise<void> {
        await this.passwordInput.fill(password);
        await this.page.waitForTimeout(1000);
    }

    // B8: dien so dien thoai
    async fillPhone (phone: string) : Promise<void> {
        await this.phoneInput.fill(phone);
        await this.page.waitForTimeout(1000);
    }

    // B9: Chon ngay sinh
    async fillBirthday(day: number = 28): Promise<void> {
        // Click vào input để mở date picker
        await this.birthdayInput.click();
        await this.page.waitForTimeout(500);

        // Dùng keyboard để nhập ngày (bypass readonly)
        await this.page.keyboard.type("28/07/2000");
        await this.page.waitForTimeout(500);

        // Nhấn Enter hoặc Escape để đóng picker
        await this.page.keyboard.press("Enter");
        await this.page.waitForTimeout(1000);
    }

    // B10: Chon gioi tinh
    async selectGender () : Promise<void> {
        await this.genderSelect.click();
        await this.page.waitForTimeout(500);

        const genderOptions = this.page.locator(".ant-select-item")
        await genderOptions.nth(0).click()
        await this.page.waitForTimeout(1000)
    }

    // B11: Click nút Đăng ký
    async clickSubmit(): Promise<void> {
        await this.submitButton.waitFor({state: 'visible', timeout: 5000});
        await this.submitButton.click();
        await this.page.waitForTimeout(2000);
    }

}