// // import {Page, Locator} from '@playwright/test'

// // export class HomePage {
// //     readonly page: Page;

// //     readonly userMenuButton: Locator;
// //     readonly dangNhapButton: Locator;
// //     readonly dangKyButton: Locator;

// //     constructor(page: Page) {
// //         this.page = page;
// //         // <button class=" text-sm bg-main  rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 font-bold duration-300 hover:scale-105 hover:bg-white hover:text-white"><img class="h-10" src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"></button>
// //         this.userMenuButton = page.locator("button:has(img[src*='6596121.png'])") 
// //                                 .or(page.locator("button.bg-main.rounded-full:has(img)"))
    
// //         // <li><button class="block text-center px-5 w-full rounded py-2 text-sm text-gray-700 hover:bg-gray-300 ">Đăng ký</button></li>
// //         this.dangKyButton = page.getByRole("button", {name:"Đăng ký"})
// //                         .or(page.locator("li button:has-text('Đăng ký')"));

// //         this.dangNhapButton = page.getByRole("button", {name:"Đăng nhập"})
// //                         .or(page.locator("li button:has-text('Đăng nhập')"));
// //     }

// //     // b1: truy cap trang web
// //     async goto (timeout: number = 15000): Promise <void> {
// //         await this.page.goto('https://demo5.cybersoft.edu.vn/', {timeout, waitUntil: 'domcontentloaded'})
// //     }

// //     // b2: click vao user menu
// //     async clickUserMenu(): Promise<void> {
// //         await this.userMenuButton.waitFor({state:'visible', timeout: 6000})
// //         await this.userMenuButton.click();
// //         await this.page.waitForTimeout(500);
// //     }

// //     // b3.1: click vào nút đăng ký
// //     async clickDangKyButton(): Promise<void> {
// //         await this.dangKyButton.waitFor({state: 'visible', timeout: 6000})
// //         await this.dangKyButton.click();

// //         await this.page.waitForTimeout(2000);
// //     }

// //     // b3.2: click vào nút đăng nhập
// //     async clickDangNhapButton(): Promise<void> {
// //         await this.dangNhapButton.waitFor({state: 'visible', timeout: 6000})
// //         await this.dangNhapButton.click();
// //     }
// // }

// import { Page, Locator } from '@playwright/test'

// export class HomePage {
//     readonly page: Page

//     // GR-9
//     readonly userMenuButton: Locator
//     readonly dangNhapButton: Locator
//     readonly dangKyButton: Locator

//     // Partner
//     readonly locationField: Locator
//     readonly hcmOption: Locator
//     readonly searchButton: Locator
//     readonly guestField: Locator
//     readonly plusGuestButton: Locator

//     constructor(page: Page) {
//         this.page = page

//         this.userMenuButton = page.locator("button:has(img[src*='6596121.png'])")
//                                 .or(page.locator("button.bg-main.rounded-full:has(img)"))

//         this.dangKyButton = page.getByRole('button', { name: 'Đăng ký' })
//                                 .or(page.locator("li button:has-text('Đăng ký')"))

//         this.dangNhapButton = page.getByRole('button', { name: 'Đăng nhập' })
//                                 .or(page.locator("li button:has-text('Đăng nhập')"))

//         this.locationField   = page.locator("//p[text()='Địa điểm']/parent::div")
//         this.hcmOption       = page.locator("//p[text()='Hồ Chí Minh']/parent::div")
//         this.searchButton    = page.locator("[aria-label='search']")
//         this.guestField      = page.locator("text=Thêm khách")
//         this.plusGuestButton = page.locator("text=+")
//     }

//     async goto(timeout: number = 15000): Promise<void> {
//         await this.page.goto('https://demo5.cybersoft.edu.vn/', { timeout, waitUntil: 'domcontentloaded' })
//     }

//     async clickUserMenu(): Promise<void> {
//         await this.userMenuButton.waitFor({ state: 'visible', timeout: 6000 })
//         await this.userMenuButton.click()
//         await this.page.waitForTimeout(500)
//     }

//     async clickDangKyButton(): Promise<void> {
//         await this.dangKyButton.waitFor({ state: 'visible', timeout: 6000 })
//         await this.dangKyButton.click()
//         await this.page.waitForTimeout(2000)
//     }

//     async clickDangNhapButton(): Promise<void> {
//         await this.dangNhapButton.waitFor({ state: 'visible', timeout: 6000 })
//         await this.dangNhapButton.click()
//     }

//     async selectHCM(): Promise<void> {
//         await this.locationField.click()
//         await this.hcmOption.click()
//     }

//     async addGuest(): Promise<void> {
//         await this.guestField.click()
//         await this.plusGuestButton.click()
//     }

//     async search(): Promise<void> {
//         await this.searchButton.click()
//     }
// }

import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly hoChiMinhLink: Locator;
  readonly userMenuButton: Locator;
  readonly dangNhapButton: Locator;
  readonly dangKyButton: Locator;
  readonly signOutButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // User menu button (fallback nhiều selector)
    this.userMenuButton = page
      .locator("button:has(img[src*='6596121.png'])")
      .or(page.locator("button.bg-main.rounded-full:has(img)"));

    // Buttons
    this.dangKyButton = page
      .getByRole("button", { name: "Đăng ký" })
      .or(page.locator("li button:has-text('Đăng ký')"));

    this.dangNhapButton = page
      .getByRole("button", { name: "Đăng nhập" })
      .or(page.locator("li button:has-text('Đăng nhập')"));

    // Link Hồ Chí Minh (kết hợp cả 2 cách)
    this.hoChiMinhLink = page
      .locator('a[href="/rooms/ho-chi-minh"]')
      .or(page.locator("text=/Hồ Chí Minh|Ho Chi Minh/i"));

    // Sign out
    this.signOutButton = page.getByRole('button', { name: 'Sign out' });
  }

  // Truy cập trang
  async goto(timeout: number = 15000): Promise<void> {
    await this.page.goto('https://demo5.cybersoft.edu.vn/', {
      timeout,
      waitUntil: 'domcontentloaded',
    });
  }

  // Click user menu
  async clickUserMenu(): Promise<void> {
    await this.userMenuButton.waitFor({ state: 'visible', timeout: 6000 });
    await this.userMenuButton.click();
  }

  // Click đăng ký
  async clickDangKyButton(): Promise<void> {
    await this.dangKyButton.waitFor({ state: 'visible', timeout: 6000 });
    await this.dangKyButton.click();
  }

  // Click đăng nhập
  async clickDangNhapButton(): Promise<void> {
    await this.dangNhapButton.waitFor({ state: 'visible', timeout: 6000 });
    await this.dangNhapButton.click();
  }

  // Click Hồ Chí Minh room
  async clickHoChiMinhRoom(): Promise<void> {
    const location = this.hoChiMinhLink.first();

    await expect(location).toBeVisible();
    await location.click();

    await this.page.waitForSelector("a[href*='room-detail']", {
      state: 'visible',
      timeout: 15000,
    });
  }

  // Đăng xuất
  async signOut(): Promise<void> {
    await this.clickUserMenu();
    await this.signOutButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.signOutButton.click();
  }
}