import { Page } from '@playwright/test';

export class RoomPage {
  constructor(private page: Page) {}

  //  SCROLL 
  async scrollXemChiTiet() {
    await this.page.waitForLoadState('domcontentloaded');

    await this.page.evaluate(async () => {
      const distance = 150; 
      const delay = 200;   

      await new Promise<void>((resolve) => {
        const timer = setInterval(() => {
          window.scrollBy(0, distance);

          const scrollTop = window.scrollY;
          const pageHeight = document.body.scrollHeight;
          const windowHeight = window.innerHeight;

          // nếu đã xuống cuối trang
          if (scrollTop + windowHeight >= pageHeight) {
            clearInterval(timer);
            resolve();
          }
        }, delay);
      });
    });

    await this.page.waitForTimeout(1200);
  }
}