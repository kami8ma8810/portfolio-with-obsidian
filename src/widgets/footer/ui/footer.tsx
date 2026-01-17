import { ThemeToggleButton } from "@/features/theme-toggle";

/**
 * サイト共通フッター
 * - コピーライト表示
 * - テクノロジースタック表示
 * - ダークモード切替ボタン
 */
export function Footer() {
  return (
    <footer className="border-t border-zinc-200 py-6 dark:border-zinc-800">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-6 sm:flex-row sm:justify-between">
        <div className="text-center text-sm text-zinc-500 dark:text-zinc-400 sm:text-left">
          <p>&copy; 2026 Hayato Kamiyama</p>
          <p className="mt-1">Built with Next.js, Go, and PostgreSQL</p>
        </div>
        <ThemeToggleButton />
      </div>
    </footer>
  );
}
