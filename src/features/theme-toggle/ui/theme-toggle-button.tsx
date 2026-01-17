"use client";

import { Switch } from "@heroui/react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

/** 太陽アイコン（ライトモード） */
function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );
}

/** 月アイコン（ダークモード） */
function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  );
}

/**
 * SSR/クライアント間のハイドレーション問題を回避するためのカスタムフック
 * useSyncExternalStoreを使用してマウント状態を判定
 * @see https://tkdodo.eu/blog/avoiding-hydration-mismatches-with-use-sync-external-store
 */
const emptySubscribe = () => () => {};

function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true, // getSnapshot: クライアントでは常にtrue
    () => false // getServerSnapshot: サーバーでは常にfalse
  );
}

/**
 * ダークモード切替スイッチ
 * HeroUIのSwitchコンポーネントを使用
 * アクセシビリティ対応済み（React Ariaベース）
 */
export function ThemeToggleButton() {
  const { setTheme, resolvedTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) {
    return (
      <div className="h-6 w-12 rounded-full bg-zinc-200 dark:bg-zinc-800" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Switch
      isSelected={isDark}
      onValueChange={(isSelected) => setTheme(isSelected ? "dark" : "light")}
      size="lg"
      aria-label={`テーマを切り替え（現在: ${isDark ? "ダーク" : "ライト"}モード）`}
      classNames={{
        wrapper:
          "bg-zinc-200 group-data-[selected=true]:bg-yellow-400 dark:bg-zinc-700",
        thumb: "bg-white dark:bg-zinc-100",
        thumbIcon: "text-zinc-700",
      }}
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <MoonIcon className={className} />
        ) : (
          <SunIcon className={className} />
        )
      }
    />
  );
}
