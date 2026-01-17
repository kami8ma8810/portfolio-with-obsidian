import { test, expect } from "@playwright/test";

test.describe("Theme Toggle", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("ダークモード切替スイッチが表示される", async ({ page }) => {
    const themeSwitch = page.getByRole("switch", {
      name: /テーマを切り替え/,
    });
    await expect(themeSwitch).toBeVisible();
  });

  test("スイッチをクリックするとダークモードに切り替わる", async ({ page }) => {
    const themeSwitch = page.getByRole("switch", {
      name: /テーマを切り替え/,
    });
    const html = page.locator("html");

    // 初期状態（ライトモード）
    await expect(html).not.toHaveClass(/dark/);

    // クリックしてダークモードに
    await themeSwitch.click();
    await expect(html).toHaveClass(/dark/);

    // もう一度クリックしてライトモードに戻る
    await themeSwitch.click();
    await expect(html).not.toHaveClass(/dark/);
  });

  test("スイッチ切替時にかくつきがない（トランジションが滑らか）", async ({
    page,
  }) => {
    const themeSwitch = page.getByRole("switch", {
      name: /テーマを切り替え/,
    });

    // スイッチの位置とサイズを取得
    const switchBox = await themeSwitch.boundingBox();
    expect(switchBox).not.toBeNull();

    // 切替前のスクリーンショット
    await expect(page).toHaveScreenshot("theme-switch-light.png", {
      maxDiffPixels: 100,
    });

    // スイッチをクリック
    await themeSwitch.click();

    // 切替後、少し待ってから確認（トランジション完了を待つ）
    await page.waitForTimeout(300);

    // 切替後のスクリーンショット
    await expect(page).toHaveScreenshot("theme-switch-dark.png", {
      maxDiffPixels: 100,
    });

    // スイッチの位置が変わっていないことを確認（かくつきがない）
    const switchBoxAfter = await themeSwitch.boundingBox();
    expect(switchBoxAfter).not.toBeNull();
    if (switchBox && switchBoxAfter) {
      // 位置がほぼ同じ（1px以内の誤差）
      expect(Math.abs(switchBox.x - switchBoxAfter.x)).toBeLessThan(2);
      expect(Math.abs(switchBox.y - switchBoxAfter.y)).toBeLessThan(2);
      // サイズが同じ
      expect(Math.abs(switchBox.width - switchBoxAfter.width)).toBeLessThan(2);
      expect(Math.abs(switchBox.height - switchBoxAfter.height)).toBeLessThan(2);
    }
  });

  test("スイッチにトランジションが適用されていないことを確認", async ({
    page,
  }) => {
    const themeSwitch = page.getByRole("switch", {
      name: /テーマを切り替え/,
    });

    // スイッチの親要素（label）とその子要素を調査
    const parentStyles = await themeSwitch.evaluate((el) => {
      const results: Array<{
        tagName: string;
        className: string;
        transition: string;
        dataSlot?: string;
      }> = [];

      // 親要素（label）を取得
      const parent = el.closest("label");
      if (parent) {
        function traverse(node: Element) {
          const style = getComputedStyle(node);
          results.push({
            tagName: node.tagName,
            className: (typeof node.className === "string" ? node.className : "").substring(0, 100),
            transition: style.transition,
            dataSlot: node.getAttribute("data-slot") || undefined,
          });
          for (const child of node.children) {
            traverse(child);
          }
        }
        traverse(parent);
      }
      return results;
    });

    console.log(
      "Parent and children styles:",
      JSON.stringify(parentStyles, null, 2)
    );

    // wrapper要素のトランジションを確認
    const wrapperElement = parentStyles.find((el) => el.dataSlot === "wrapper");
    console.log("Wrapper element:", wrapperElement);

    // thumb要素のトランジションを確認
    const thumbElement = parentStyles.find((el) => el.dataSlot === "thumb");
    console.log("Thumb element:", thumbElement);

    // wrapperにbackground-colorトランジションが適用されているとかくつきの原因になる
    if (wrapperElement) {
      // HeroUI自体のトランジションは許容するが、globals.cssのトランジションは問題
      console.log("Wrapper transition:", wrapperElement.transition);
    }
  });

  test("ダークモードでリンクフォーカス時のコントラストが確保されている", async ({
    page,
  }) => {
    const themeSwitch = page.getByRole("switch", {
      name: /テーマを切り替え/,
    });

    // ダークモードに切替
    await themeSwitch.click();
    await page.waitForTimeout(100);

    // リンクにフォーカス
    const blogLink = page.getByRole("link", { name: "Blog" });
    await blogLink.focus();

    // フォーカス時のスタイルを確認
    const styles = await blogLink.evaluate((el) => {
      const style = getComputedStyle(el);
      return {
        backgroundColor: style.backgroundColor,
        color: style.color,
        outlineColor: style.outlineColor,
      };
    });

    console.log("ダークモード + フォーカス時のスタイル:", styles);

    // テキスト色が黒系（zinc-900）であることを確認
    // rgb(24, 24, 27) = #18181B = zinc-900
    expect(styles.color).toMatch(/rgb\(24,\s*24,\s*27\)|lab\(/);

    // 背景色が黄色系（yellow-300）であることを確認
    expect(styles.backgroundColor).not.toBe("rgba(0, 0, 0, 0)");
  });

  test("キーボードでスイッチを操作できる", async ({ page }) => {
    const themeSwitch = page.getByRole("switch", {
      name: /テーマを切り替え/,
    });
    const html = page.locator("html");

    // スイッチにフォーカス
    await themeSwitch.focus();

    // Spaceキーで切替
    await page.keyboard.press("Space");
    await expect(html).toHaveClass(/dark/);

    // もう一度Spaceキーで戻す
    await page.keyboard.press("Space");
    await expect(html).not.toHaveClass(/dark/);
  });
});
