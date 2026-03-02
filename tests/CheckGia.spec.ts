// tests/TC17.spec.ts
import { test, expect } from '@playwright/test';
import { RoomPage } from '../pages/RoomPage';

test('TC17 – Validate tính toán giá chính xác', async ({ page }) => {
  const roomPage = new RoomPage(page);

  await page.goto('https://demo5.cybersoft.edu.vn/room-detail/1', {
    waitUntil: 'domcontentloaded',
  });

  // ── B1: Chọn ngày (check-in ngày 5, check-out ngày 12) ──
  await roomPage.selectDates('5', '12');

  // ── B2: Lấy các giá trị ──
  const pricePerNight = await roomPage.getPricePerNight();
  const nights = await roomPage.getNights();
  const multipliedPrice = await roomPage.getMultipliedPrice();
  const serviceFee = await roomPage.getServiceFee();
  const totalPrice = await roomPage.getTotalPrice();

  console.log(`Giá/đêm: ${pricePerNight}, Số đêm: ${nights}`);
  console.log(`Giá × ngày: ${multipliedPrice}, Phí DV: ${serviceFee}, Tổng: ${totalPrice}`);

  // ── Verify 1: giá phòng × số ngày = multipliedPrice ──
  expect(multipliedPrice).toBe(pricePerNight * nights);

  // ── Verify 2: multipliedPrice + serviceFee = totalPrice ──
  expect(totalPrice).toBe(multipliedPrice + serviceFee);
});