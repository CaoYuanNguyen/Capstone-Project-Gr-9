import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { DatPhongPage } from '../pages/DatPhongPage'

test.describe('Đặt phòng', () => {
    test("Đặt phòng thất bại - Chưa đăng nhập", async ({ page }) => {
        const homePage = new HomePage(page)
        const datPhongPage = new DatPhongPage(page)

        // b1: truy cập trang web
        await homePage.goto()

        // b2: scroll xuống và click vào địa điểm Nha Trang
        await datPhongPage.clickDiaDiem()

        // b3: scroll xuống và click vào phòng đầu tiên
        await datPhongPage.clickPhongDauTien()

        // b4: kiểm tra chuyển sang trang chi tiết phòng
        await datPhongPage.waitForChiTiet()

        // b5: scroll xuống để thấy nút Đặt phòng
        await datPhongPage.scrollToDatePhong()

        // b6: click nút Đặt phòng (chưa đăng nhập)
        await datPhongPage.clickDatPhong()

        // b7: kiểm tra thông báo "Vui lòng đăng nhập để tiếp tục đặt phòng"
        const thongBao = page.locator(".ant-notification-notice-message")
                    .or(page.locator(".ant-notification-notice-description"))
    })
})