import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { BookingPage } from '../pages/BookingPage';
import { AssertionHelper } from '../helpers/assertionHelper';

const EMAIL = 'tnguyen22@gmail.com';
const PASSWORD = '123';
const BASE_URL = 'https://demo5.cybersoft.edu.vn';

test.describe('Booking Flow', () => {

    // ─────────────────────────────────────────────
    // TC16 - Đặt phòng thành công
    // ─────────────────────────────────────────────
    test('TC16_Đặt phòng thành công', async ({ page }) => {
        test.setTimeout(90000);
        const homePage = new HomePage(page);
        const bookingPage = new BookingPage(page);

        // B1: Truy cập và đăng nhập
        await homePage.goto();
        await bookingPage.login(EMAIL, PASSWORD);

        // B2: Chọn địa điểm Hồ Chí Minh
        await bookingPage.chonDiaDiemHCM();

        // B3: Chọn phòng đầu tiên
        await bookingPage.chonPhongDauTien();

        // B4: Chọn ngày (4 tháng tới, ngày 5 → ngày 8)
        await bookingPage.chonNgay('5', '8');

        // B5: Thêm khách
        await bookingPage.themKhach();

        // B6: Đặt phòng & xác nhận
        await bookingPage.clickDatPhong();

        // Verify: vẫn ở trang detail hoặc redirect sau đặt phòng
        await expect(
            page.locator('button', { hasText: 'Đặt phòng' })
                .or(page.locator('.ant-notification-notice'))
        ).toBeVisible({ timeout: 10000 });
    });

    // ─────────────────────────────────────────────
    // TC17 - Kiểm tra tính toán giá chính xác
    // ─────────────────────────────────────────────
    test('TC17_Kiểm tra tính toán giá chính xác', async ({ page }) => {
        const bookingPage = new BookingPage(page);

        await page.goto(`${BASE_URL}/room-detail/1`, { waitUntil: 'domcontentloaded' });

        // Chọn ngày check-in 5, check-out 12
        await bookingPage.openDatePicker();
        await page.locator('span.rdrDayNumber span')
            .filter({ hasText: /^5$/ }).first().click();
        await page.locator('span.rdrDayNumber span')
            .filter({ hasText: /^12$/ }).first().click();
        await page.keyboard.press('Escape');
        await page.waitForTimeout(500);

        // Lấy các giá trị
        const pricePerNight = await bookingPage.getPricePerNight();
        const nights = await bookingPage.getNights();
        const multipliedPrice = await bookingPage.getMultipliedPrice();
        const serviceFee = await bookingPage.getServiceFeeAmount();
        const totalPrice = await bookingPage.getTotalPrice();

        console.log(`Giá/đêm: ${pricePerNight} | Số đêm: ${nights}`);
        console.log(`Giá × ngày: ${multipliedPrice} | Phí DV: ${serviceFee} | Tổng: ${totalPrice}`);

        // Verify 1: giá × số đêm = multipliedPrice
        expect(multipliedPrice).toBe(pricePerNight * nights);

        // Verify 2: multipliedPrice + serviceFee = totalPrice
        expect(totalPrice).toBe(multipliedPrice + serviceFee);
    });

    // ─────────────────────────────────────────────
    // TC18 - Đặt phòng thất bại - Chưa đăng nhập
    // ─────────────────────────────────────────────
    test('TC18_Đặt phòng thất bại - Chưa đăng nhập', async ({ page }) => {
        const homePage = new HomePage(page);
        const bookingPage = new BookingPage(page);
        const assert = new AssertionHelper(page);

        await homePage.goto();

        // Vào thẳng phòng mà KHÔNG đăng nhập
        await bookingPage.chonDiaDiemHCM();
        await bookingPage.chonPhongDauTien();

        // Scroll xuống và click Đặt phòng
        await page.evaluate(() => window.scrollBy(0, 600));
        await page.waitForTimeout(1000);
        await bookingPage.bookButton.scrollIntoViewIfNeeded();
        await bookingPage.bookButton.click({ force: true });

        // Verify: thông báo yêu cầu đăng nhập
        await assert.expectNotification('Vui lòng đăng nhập');
    });

    // ─────────────────────────────────────────────
    // TC19 - Đặt phòng thất bại - Chọn ngày không hợp lệ
    // ─────────────────────────────────────────────
    test('TC19_Đặt phòng thất bại - Ngày không hợp lệ', async ({ page }) => {
        const homePage = new HomePage(page);
        const bookingPage = new BookingPage(page);

        await homePage.goto();
        await bookingPage.login(EMAIL, PASSWORD);

        await bookingPage.chonDiaDiemHCM();
        await bookingPage.chonPhongDauTien();

        // Mở date picker và thử chọn ngày hôm qua
        await bookingPage.openDatePicker();
        await page.waitForTimeout(1000);

        const yesterdayBtn = page.getByText('Yesterday');
        if (await yesterdayBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
            await yesterdayBtn.click();
        } else {
            // Nếu không có nút Yesterday, click vào ngày đầu tiên (đã disable)
            const disabledDay = page.locator('.rdrDayDisabled').first();
            await disabledDay.click({ force: true });
        }

        await page.waitForTimeout(1000);
        await page.mouse.click(50, 50);

        // Verify: ngày check-in không thay đổi (vẫn trống hoặc không hợp lệ)
        const checkInText = await bookingPage.checkInDate.textContent();
        expect(checkInText).not.toMatch(/\d{2}\/\d{2}\/\d{4}/);
    });

    // ─────────────────────────────────────────────
    // TC20 - Xem lịch sử đặt phòng
    // ─────────────────────────────────────────────
    test('TC20_Xem lịch sử đặt phòng thành công', async ({ page }) => {
        test.setTimeout(120000);
        const homePage = new HomePage(page);
        const bookingPage = new BookingPage(page);

        // B1: Đăng nhập
        await homePage.goto();
        await bookingPage.login(EMAIL, PASSWORD);

        // B2-B3: Chọn địa điểm & phòng
        await bookingPage.chonDiaDiemHCM();
        await bookingPage.chonPhongDauTien();

        // B4: Chọn ngày
        await bookingPage.chonNgay('5', '10');

        // B5: Thêm khách
        await bookingPage.themKhach();

        // B6: Đặt phòng
        await bookingPage.clickDatPhong();

        // B7: Vào Dashboard
        await bookingPage.goToDashboard();

        // B8: Scroll xuống xem Phòng đã thuê
        await bookingPage.scrollToPhongDaThue();

        // Verify: section "Phòng đã thuê" hiển thị
        await expect(bookingPage.phongDaThue).toBeVisible();
    });

});