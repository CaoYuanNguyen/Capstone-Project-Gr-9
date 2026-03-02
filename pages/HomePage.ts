import {Page, Locator} from '@playwright/test'

export class HomePage {
    readonly page: Page;
    readonly hoChiMinhLink: Locator;
    readonly userMenuButton: Locator;
    readonly dangNhapButton: Locator;
    readonly dangKyButton: Locator;
    readonly signOutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        // <button class=" text-sm bg-main  rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 font-bold duration-300 hover:scale-105 hover:bg-white hover:text-white"><img class="h-10" src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"></button>
        this.userMenuButton = page.locator("button:has(img[src*='6596121.png'])") 
                                .or(page.locator("button.bg-main.rounded-full:has(img)"))
    
        // <li><button class="block text-center px-5 w-full rounded py-2 text-sm text-gray-700 hover:bg-gray-300 ">Đăng ký</button></li>
        this.dangKyButton = page.getByRole("button", {name:"Đăng ký"})
                        .or(page.locator("li button:has-text('Đăng ký')"));

        this.dangNhapButton = page.getByRole("button", {name:"Đăng nhập"})
                        .or(page.locator("li button:has-text('Đăng nhập')"));
        this.hoChiMinhLink = page.locator('a[href="/rooms/ho-chi-minh"]');
    

        // Nút đăng xuất trong dropdown
        this.signOutButton = page.getByRole('button', { name: 'Sign out' });

    }

    // b1: truy cap trang web
    async goto (timeout: number = 15000): Promise <void> {
        await this.page.goto('https://demo5.cybersoft.edu.vn/', {timeout, waitUntil: 'domcontentloaded'})
    }

    // b2: click vao user menu
    async clickUserMenu(): Promise<void> {
        await this.userMenuButton.waitFor({state:'visible', timeout: 6000})
        await this.userMenuButton.click();
        await this.page.waitForTimeout(500);
    }

    // b3.1: click vào nút đăng ký
    async clickDangKyButton(): Promise<void> {
        await this.dangKyButton.waitFor({state: 'visible', timeout: 6000})
        await this.dangKyButton.click();

        await this.page.waitForTimeout(2000);
    }

    // b3.2: click vào nút đăng nhập
    async clickDangNhapButton(): Promise<void> {
        await this.dangNhapButton.waitFor({state: 'visible', timeout: 6000})
        await this.dangNhapButton.click();
    }

    // click vào link Hồ Chí Minh
    async clickHoChiMinhRoom() {
        await this.hoChiMinhLink.click();
    }
    async signOut(): Promise<void> {
    await this.clickUserMenu();
    await this.signOutButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.signOutButton.click();
}

}