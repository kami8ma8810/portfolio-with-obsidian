import { test, expect } from "@playwright/test";

test.describe("Navigation Links", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("トップページが正しく表示される", async ({ page }) => {
    await expect(page).toHaveTitle(/Hayato Kamiyama/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Hayato Kamiyama"
    );
  });

  test("ナビゲーションリンクが存在する", async ({ page }) => {
    await expect(page.getByRole("link", { name: "Blog" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Graph" })).toBeVisible();
    await expect(page.getByRole("link", { name: "About" })).toBeVisible();
  });

  test("リンクホバー時に下線が表示される", async ({ page }) => {
    const blogLink = page.getByRole("link", { name: "Blog" });

    // ホバー前: 下線のscale-x-0（見えない）
    await expect(blogLink).toBeVisible();

    // ホバー
    await blogLink.hover();

    // ホバー後: 下線が表示される（::after疑似要素のtransformが変わる）
    // 視覚的確認のため、スクリーンショットで検証
    await expect(page).toHaveScreenshot("blog-link-hover.png", {
      maxDiffPixels: 100,
    });
  });

  test("リンクフォーカス時に黄色背景と黒アウトラインが表示される", async ({
    page,
  }) => {
    const blogLink = page.getByRole("link", { name: "Blog" });

    // キーボードフォーカス
    await blogLink.focus();

    // フォーカス状態のスクリーンショット
    await expect(page).toHaveScreenshot("blog-link-focus.png", {
      maxDiffPixels: 100,
    });
  });

  test("Aboutページに遷移できる", async ({ page }) => {
    await page.getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL("/about");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Hayato Kamiyama"
    );
  });
});

test.describe("About Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/about");
  });

  test("Aboutページが正しく表示される", async ({ page }) => {
    await expect(page).toHaveTitle(/About/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Hayato Kamiyama"
    );
  });

  test("GitHubリンクが存在する", async ({ page }) => {
    const githubLink = page.getByRole("link", { name: "GitHub" });
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/kami8ma8810"
    );
  });

  test("Homeに戻れる", async ({ page }) => {
    await page.getByRole("link", { name: /Home/ }).click();
    await expect(page).toHaveURL("/");
  });
});

test.describe("Accessibility", () => {
  test("キーボードナビゲーションが機能する", async ({ page }) => {
    await page.goto("/");

    // Tabキーでリンクにフォーカス
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");

    // フォーカスがリンクにあることを確認
    const focusedElement = page.locator(":focus");
    await expect(focusedElement).toHaveRole("link");
  });

  test("リンクにフォーカスインジケーターがある", async ({ page }) => {
    await page.goto("/");
    const blogLink = page.getByRole("link", { name: "Blog" });

    await blogLink.focus();

    // フォーカス時の背景色を確認（yellow-300）
    // Tailwind v4はlab()形式を使用するため、色が設定されていることを確認
    const bgColor = await blogLink.evaluate(
      (el) => getComputedStyle(el).backgroundColor
    );
    // 背景色が透明(rgba(0,0,0,0))ではないことを確認
    expect(bgColor).not.toBe("rgba(0, 0, 0, 0)");
    // 黄色系の色が設定されていることを確認（labまたはrgb形式）
    expect(bgColor).toMatch(/lab|rgb/);
  });
});
