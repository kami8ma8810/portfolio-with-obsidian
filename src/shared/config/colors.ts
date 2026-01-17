/**
 * カラーシステム定義
 *
 * Tailwind CSS のデフォルトカラーを使用
 * 2026年トレンド「Monochrome + Yellow Pop」に基づく
 *
 * ## 60-30-10 ルール（採用: パターンA）
 *
 * | 割合 | 役割 | 色 | Tailwind |
 * |------|------|-----|----------|
 * | 60%  | ベース（背景） | White | zinc-50 / zinc-950 |
 * | 30%  | セカンダリ（テキスト） | Black | zinc-900 / zinc-100 |
 * | 10%  | アクセント（CTA・ホバー） | Yellow | yellow-400 / yellow-500 |
 *
 * @see https://tailwindcss.com/docs/customizing-colors
 */

export const colors = {
  /**
   * プライマリカラー（黄色アクセント）
   * CTAボタン、リンクホバー、ハイライトに使用
   */
  primary: {
    DEFAULT: "#FACC15", // yellow-400
    hover: "#EAB308", // yellow-500
    light: "#FEF08A", // yellow-200
    dark: "#CA8A04", // yellow-600
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
} as const;

/**
 * Tailwind クラス名マッピング
 *
 * 実際にコンポーネントで使用するクラス名
 */
export const colorClasses = {
  // プライマリボタン
  primaryButton: {
    base: "bg-yellow-400 text-zinc-900 hover:bg-yellow-500",
    dark: "dark:bg-yellow-400 dark:text-zinc-900 dark:hover:bg-yellow-500",
  },

  // セカンダリボタン（アウトライン）
  secondaryButton: {
    base: "border-zinc-300 text-zinc-900 hover:bg-zinc-100",
    dark: "dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800",
  },

  // リンク
  link: {
    base: "text-zinc-600 hover:text-yellow-600",
    dark: "dark:text-zinc-400 dark:hover:text-yellow-400",
  },

  // 背景
  background: {
    base: "bg-zinc-50",
    dark: "dark:bg-zinc-950",
  },

  // テキスト
  text: {
    primary: "text-zinc-900 dark:text-zinc-100",
    secondary: "text-zinc-600 dark:text-zinc-400",
    muted: "text-zinc-500 dark:text-zinc-500",
  },
} as const;
