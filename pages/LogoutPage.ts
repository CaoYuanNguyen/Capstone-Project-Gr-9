import { Page, Locator } from '@playwright/test';

export class LogoutPage {
    private page: Page;

    avatarBtn: Locator;
    signOutBtn: Locator;
    defaultAvatar: Locator;

    constructor(page: Page) {
        this.page = page;
        this.avatarBtn = page.locator('button:has(img.h-10)').first();
        this.signOutBtn = page.locator('#user-dropdown button.text-red-800');
        this.defaultAvatar = page.locator('button#user-menu-button img.w-10');
    }

    async openDropdown() {
        await this.avatarBtn.waitFor({ state: 'visible' });
        await this.avatarBtn.click();
    }

    async signOut() {
        await this.openDropdown();
        await this.signOutBtn.waitFor({ state: 'visible', timeout: 5000 });
        await this.signOutBtn.click();
    }
}