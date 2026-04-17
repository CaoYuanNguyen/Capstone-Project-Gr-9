import { Page, Locator, expect } from '@playwright/test';

export class RegisterModal {
    readonly page: Page;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly phoneInput: Locator;
    readonly birthdayInput: Locator;
    readonly genderSelect: Locator;
    readonly submitButton: Locator;
    readonly modal: Locator;

    constructor(page: Page) {
        this.page = page;
        this.modal = page.locator(".ant-modal-content");
        this.nameInput = page.locator("input#name").or(page.getByRole("textbox", { name: "name" }));
        this.emailInput = page.locator("input#email").or(page.getByRole("textbox", { name: "email" }));
        this.passwordInput = page.locator("input#password").or(page.getByRole("textbox", { name: "password" }));
        this.phoneInput = page.locator("input#phone").or(page.getByRole("textbox", { name: "phone" }));
        this.birthdayInput = page.locator("input#birthday").or(page.getByRole("textbox", { name: "birthday" }));
        this.genderSelect = page.locator("div.ant-select[name='gender']");
        this.submitButton = page.locator(".ant-modal-content button[type='submit']")
            .or(page.locator(".ant-modal-content button:has-text('Đăng ký')"));
    }

    async waitForModal(timeout: number = 60000): Promise<void> {
        await this.modal.waitFor({ state: 'visible', timeout });
    }

    async fillName(name: string): Promise<void> {
        await this.nameInput.fill(name);
        // Thay vì wait timeout, ta có thể dùng assertion ngầm để đảm bảo dữ liệu đã vào
        await expect(this.nameInput).toHaveValue(name);
    }

    async fillEmail(email: string): Promise<void> {
        await this.emailInput.fill(email);
    }

    async fillPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }

    async fillPhone(phone: string): Promise<void> {
        await this.phoneInput.fill(phone);
    }

    async fillBirthday(dateStr: string = "28/07/2000"): Promise<void> {
        await this.birthdayInput.click();
        // Nhập ngày bằng bàn phím
        await this.page.keyboard.type(dateStr);
        await this.page.keyboard.press("Enter");
        // Đợi cho đến khi picker biến mất hoặc giá trị đã được cập nhật
        await expect(this.birthdayInput).toHaveValue(dateStr);
    }

    async selectGender(): Promise<void> {
        await this.genderSelect.click();
        // Đợi menu dropdown xuất hiện thay vì đợi 500ms
        const genderOption = this.page.locator(".ant-select-item").first();
        await genderOption.waitFor({ state: 'visible' });
        await genderOption.click();
    }

    async clickSubmit(): Promise<void> {
        // Đảm bảo nút có thể click được
        await expect(this.submitButton).toBeEnabled();
        await this.submitButton.click();
    }
}