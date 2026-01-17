/**
 * デザインシステム - カラー定義
 *
 * ## 設計原則
 *
 * デジタル庁デザインシステム（https://design.digital.go.jp/）を参考に、
 * アクセシビリティを重視した設計を採用。
 *
 * ### アクセシビリティ要件
 * - WCAG 2.1 AA準拠
 * - コントラスト比: 通常テキスト 4.5:1以上、大きいテキスト 3:1以上
 * - フォーカス状態の明確な視覚的表示
 * - 色だけに依存しない情報伝達
 *
 * ## カラーパレット
 *
 * 60-30-10 ルール（Monochrome + Yellow Pop）
 *
 * | 割合 | 役割 | 色 | Tailwind |
 * |------|------|-----|----------|
 * | 60%  | ベース（背景） | White | zinc-50 / zinc-950 |
 * | 30%  | セカンダリ（テキスト） | Black | zinc-900 / zinc-100 |
 * | 10%  | アクセント（CTA・フォーカス） | Yellow | yellow-400 / yellow-600 |
 *
 * @see https://design.digital.go.jp/
 * @see https://tailwindcss.com/docs/customizing-colors
 */

export const colors = {
  /**
   * プライマリカラー（黄色アクセント）
   * CTAボタン、フォーカス状態、ハイライトに使用
   */
  primary: {
    DEFAULT: "#FACC15", // yellow-400
    hover: "#EAB308", // yellow-500
    light: "#FEF08A", // yellow-200
    dark: "#CA8A04", // yellow-600
    focus: "#FDE047", // yellow-300（フォーカス背景）
  },

  /**
   * 背景色
   */
  background: {
    light: "#FAFAFA", // zinc-50
    dark: "#09090B", // zinc-950
  },

  /**
   * テキスト色
   */
  text: {
    primary: "#18181B", // zinc-900
    secondary: "#52525B", // zinc-600
    muted: "#A1A1AA", // zinc-400
    inverse: "#FAFAFA", // zinc-50
  },

  /**
   * ボーダー色
   */
  border: {
    light: "#E4E4E7", // zinc-200
    dark: "#27272A", // zinc-800
  },

  /**
   * フォーカス色
   * デジタル庁デザインシステム参考：黄色背景 + 黒アウトライン
   */
  focus: {
    background: "#FDE047", // yellow-300
    outline: "#18181B", // zinc-900
  },
} as const;

/**
 * Tailwind クラス名マッピング
 *
 * 実際にコンポーネントで使用するクラス名
 */
export const colorClasses = {
  /**
   * プライマリボタン
   * 黄色背景 + 黒テキスト（コントラスト比 11.57:1）
   */
  primaryButton: {
    base: "bg-yellow-400 text-zinc-900 hover:bg-yellow-500",
    dark: "dark:bg-yellow-400 dark:text-zinc-900 dark:hover:bg-yellow-500",
    focus:
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 focus-visible:outline-offset-2",
  },

  /**
   * セカンダリボタン（アウトライン）
   */
  secondaryButton: {
    base: "border-zinc-300 text-zinc-900 hover:bg-zinc-100",
    dark: "dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800",
    focus:
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 focus-visible:outline-offset-2",
  },

  /**
   * リンク
   *
   * デジタル庁デザインシステム参考:
   * - 通常: 下線なし
   * - ホバー: 下線追加（色は変えない）
   * - フォーカス: 黄色背景 + アウトライン（ライト:黒 / ダーク:白）
   *
   * 下線の変化により、色だけに依存しない情報伝達を実現（WCAG 1.4.1）
   *
   * 注意: ダークモードではアウトラインをzinc-100に変更
   * （zinc-900はzinc-950背景とのコントラスト比が1.12:1でFAIL）
   */
  link: {
    base: "text-zinc-600 transition-all hover:underline",
    dark: "dark:text-zinc-400",
    focus:
      "focus-visible:bg-yellow-300 focus-visible:text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:focus-visible:outline-zinc-100",
  },

  /**
   * 背景
   */
  background: {
    base: "bg-zinc-50",
    dark: "dark:bg-zinc-950",
  },

  /**
   * テキスト
   */
  text: {
    primary: "text-zinc-900 dark:text-zinc-100",
    secondary: "text-zinc-600 dark:text-zinc-400",
    muted: "text-zinc-500 dark:text-zinc-400",
  },

  /**
   * フォーカス状態
   *
   * デジタル庁デザインシステム参考:
   * - 黄色背景（yellow-300）
   * - アウトライン（ライト:黒zinc-900 / ダーク:白zinc-100）
   *
   * ダークモードではアウトラインを白に変更（コントラスト比確保のため）
   */
  focus: {
    visible:
      "focus-visible:bg-yellow-300 focus-visible:text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:focus-visible:outline-zinc-100",
  },
} as const;

/**
 * WCAG AA コントラスト比チェック結果
 *
 * ライトモード（背景: zinc-50）:
 * - zinc-900: 16.97:1 ✅
 * - zinc-600: 7.41:1 ✅
 * - zinc-500: 4.63:1 ✅
 *
 * ダークモード（背景: zinc-950）:
 * - zinc-100: 18.10:1 ✅
 * - zinc-400: 7.76:1 ✅
 *
 * 黄色ボタン（背景: yellow-400）:
 * - zinc-900（黒テキスト）: 11.57:1 ✅
 *
 * @see scripts/check-contrast.mjs
 */
