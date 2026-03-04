import { test } from '@playwright/test';
import { RoomPage } from '../pages/RoomPage';
import { HomePage } from '../pages/HomePage';

test.describe('TC15 - Kiểm tra thông tin lọc giá', () => {
  let roomPage: RoomPage;
  let homePage: HomePage;
  test.beforeEach(async ({ page }) => {
    roomPage = new RoomPage(page);
    homePage = new HomePage(page);
    await homePage.goto();
    await homePage.clickHoChiMinhRoom();
    await page.waitForLoadState('networkidle');
  });
  test('Test nhấn vào nút sort theo giá', async () => {
  await roomPage.clickPriceButton();
  await roomPage.verifyPriceFilterVisible();
}); 
});