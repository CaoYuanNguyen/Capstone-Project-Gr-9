import {Page, Locator} from '@playwright/test';
import { highlightAndScreenshot } from '../utils/screenshot';

export class LoginPage {
    // Locator
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    // function: login, validate
    constructor (page: Page) {
        this.page = page;
        this.usernameInput = page.locator('input[name="user-name"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.loginButton = page.locator('input[type="submit"]');
        this.errorMessage = page.locator('.error-message-container.error');
    }   
    async login(username: string, password: string){
        await this.page.goto('https://www.saucedemo.com');
        await this.usernameInput.fill(username);
        await highlightAndScreenshot(this.page, this.usernameInput, "LoginTest", "fill_username")
        await this.passwordInput.fill(password);
        await highlightAndScreenshot(this.page, this.passwordInput, "LoginTest", "fill_password")
        await highlightAndScreenshot(this.page, this.loginButton, "LoginTest", "Click_Button")
        await this.loginButton.click();
    }
}