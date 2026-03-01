import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { RoomPage } from '../pages/RoomPage'

test.describe('Xem chi tiết phòng', () => {
    test("Xem chi tiết phòng thành công", async ({page}) => {
        const homePage = new HomePage(page)
        const roomPage = new RoomPage(page)

        // b1: truy cập trang web
        await homePage.goto()

        // b2: scroll xuống và click vào địa điểm Nha Trang
        await roomPage.clickDiaDiem()

        // b3: scroll xuống và click vào phòng đầu tiên trong danh sách
        await roomPage.clickPhongDauTien()

        // b4: kiểm tra chuyển sang trang chi tiết phòng
        await roomPage.waitForChiTiet()

        // b5: scroll xuống xem chi tiết phòng (mô tả, tiện ích, giá...)
        await roomPage.scrollXemChiTiet()

        // b6: kiểm tra URL chứa room-detail
        await expect(page).toHaveURL(/room-detail/)

        expect(true).toBeTruthy()
    })
})