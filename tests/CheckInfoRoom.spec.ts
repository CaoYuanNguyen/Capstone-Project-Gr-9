import { test } from '@playwright/test';
import { RoomPage } from '../pages/RoomPage';
import { HomePage } from '../pages/HomePage';

test.describe('TC13 - Kiểm tra thông tin phòng hiển thị đầy đủ', () => {
  let roomPage: RoomPage;
  let homePage: HomePage;
  test.beforeEach(async ({ page }) => {
    roomPage = new RoomPage(page);
    homePage = new HomePage(page);
    await homePage.goto();
    await homePage.clickHoChiMinhRoom();
    await roomPage.clickFirstCard();
    await page.waitForLoadState('networkidle');
  });

  test('TC13: Tất cả thông tin phòng hiển thị đầy đủ', async () => {
    await roomPage.verifyRoomDetailVisible();
    await roomPage.verifyTitleNotEmpty();
    await roomPage.verifyImageLoaded();
    await roomPage.verifyPriceNotEmpty();
    await roomPage.verifyNoInvalidValues();
  });
});