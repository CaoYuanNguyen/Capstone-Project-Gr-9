import { test, expect, Page, Locator } from '@playwright/test'
import { HomePage } from '../pages/HomePage'

// highlight
async function highlight(page: Page, locator: Locator) {
  await locator.waitFor({ state: 'visible', timeout: 15000 })

  await locator.evaluate((el: HTMLElement) => {
    el.style.border = "4px solid red"
    el.style.backgroundColor = "yellow"
    el.style.transform = "scale(1.05)"
    el.style.transition = "all 0.3s ease"
  })

  await page.waitForTimeout(400)
}

// scroll 
async function slowScrollToReview(page: Page) {
  const target = page.locator("textarea").first()

  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(500)

  for (let i = 0; i < 25; i++) {
    if (await target.isVisible().catch(() => false)) {
      const box = await target.boundingBox()
      if (box && box.y < 800) break
    }

    await page.mouse.wheel(0, 250)
    await page.waitForTimeout(200)
  }
}

test.describe('TC17 - Gửi đánh giá', () => {

  test('TC17: submit review successfully', async ({ page }) => {

    const homePage = new HomePage(page)

    // B1: MỞ TRANG
    await homePage.goto()
    await page.waitForLoadState('domcontentloaded')

    // B2: LOGIN
    const avatar = page.locator("img.h-10")
    await highlight(page, avatar)
    await avatar.click()

    const loginBtn = page.getByText("Đăng nhập").first()
    await highlight(page, loginBtn)
    await loginBtn.click()

    const email = page.getByPlaceholder("Vui lòng nhập tài khoản")
    await highlight(page, email)
    await email.fill("testlog123@gmail.com")

    const password = page.getByPlaceholder("Vui lòng nhập mật khẩu")
    await highlight(page, password)
    await password.fill("123456789")

    const submitLogin = page.getByRole("button", { name: "Đăng nhập" }).last()
    await highlight(page, submitLogin)
    await submitLogin.click()

    await expect(page.locator("img.h-10")).toBeVisible()
    await page.waitForTimeout(1000)

    // B3: CHỌN HỒ CHÍ MINH
    const city = page.locator("text=Hồ Chí Minh").first()
    await highlight(page, city)
    await city.click()

    // B4: VÀO PHÒNG
    const room = page.locator("a[href*='room-detail']").first()
    await room.waitFor({ state: 'visible', timeout: 15000 })

    await highlight(page, room)
    await room.click()

    await page.waitForURL(/room-detail/)
    await page.waitForLoadState('domcontentloaded')

    // B5: SCROLL TỪ TRÊN XUỐNG REVIEW
    await slowScrollToReview(page)

    // B6: NHẬP REVIEW
    const reviews = [
      "Phòng rộng rãi, view đẹp, nhân viên hỗ trợ nhiệt tình!",
      "Không gian thoáng mát, rất đáng trải nghiệm!",
      "Dịch vụ ổn, phòng sạch sẽ và tiện nghi!",
      "Rất hài lòng, sẽ quay lại lần sau!"
    ]

    const reviewText = reviews[Math.floor(Math.random() * reviews.length)]

    const reviewInput = page.locator("textarea").first()
    await highlight(page, reviewInput)
    await reviewInput.fill(reviewText)

    // B7: GỬI ĐÁNH GIÁ
    const submitBtn = page.getByRole('button', { name: 'Đánh giá' })
    await highlight(page, submitBtn)
    await submitBtn.click()

    // B8: VERIFY
    await expect(reviewInput).toBeVisible()
    await expect(page.locator("pre").first()).toBeVisible({ timeout: 15000 })
  })

})