import { test, expect } from '@playwright/test'
import { describe } from 'node:test'
import { HomePage } from '../pages/HomePage'
import { RegisterModal } from '../pages/RegisterModal' 

test.describe('Đăng Ký', () => {
    test("Đăng ký tài khoản mới", async ({page}) => {
        // Khởi tạo object HomePage
        const homePage = new HomePage(page);
        const registerModal = new RegisterModal(page)

        // b1: truy cập trang web
        await homePage.goto()

        // b2: click vào user menu
        await homePage.clickUserMenu()

        // b3: click vào nút đăng ký
        await homePage.clickDangKyButton()

        // b4: doi modal xuat hien
        await registerModal.waitForModal()

        // b5: dien ten
        await registerModal.fillName("Nguyen ne")

        // b6: dien email
        await registerModal.fillEmail("thaonguyen25@gmail.com")

        // b7: dien password
        await registerModal.fillPassword("12345678")

        // b8: dien so dien thoai
        await registerModal.fillPhone("0125672368")

        // b9: chon ngay sinh
        await registerModal.fillBirthday(28)

        // b10: chon gioi tinh
        await registerModal.selectGender()

        // b11: click nút đăng ký
        await registerModal.clickSubmit()

        expect(true).toBeTruthy()
    })
})