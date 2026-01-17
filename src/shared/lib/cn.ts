import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind CSSのクラス名を結合するユーティリティ
 *
 * - clsx: 条件付きクラス名を簡潔に書ける
 * - tailwind-merge: 競合するTailwindクラスを適切にマージ
 *
 * @example
 * cn("px-4 py-2", isActive && "bg-blue-500", "text-white")
 * cn("p-4", className) // propsで渡されたclassNameをマージ
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
