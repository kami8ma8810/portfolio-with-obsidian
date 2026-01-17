import { forwardRef, type ComponentPropsWithRef } from "react";
import { cn } from "@/shared/lib/cn";

/**
 * Button コンポーネント
 *
 * 学習ポイント:
 * - forwardRef: 親コンポーネントからボタン要素への参照を可能にする
 * - ComponentPropsWithRef: <button>の全HTML属性を型安全に継承
 * - variant: 用途に応じたスタイルバリエーション
 */

interface ButtonProps extends ComponentPropsWithRef<"button"> {
  /** ボタンのスタイルバリアント */
  variant?: "primary" | "secondary" | "outline";
  /** ボタンのサイズ */
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // ベーススタイル
          "inline-flex items-center justify-center rounded-full font-semibold transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 dark:focus-visible:ring-zinc-300",
          "disabled:pointer-events-none disabled:opacity-50",

          // バリアント別スタイル
          {
            primary:
              "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300",
            secondary:
              "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700",
            outline:
              "border border-zinc-300 text-zinc-900 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-900",
          }[variant],

          // サイズ別スタイル
          {
            sm: "h-8 px-3 text-xs",
            md: "h-10 px-4 text-sm",
            lg: "h-12 px-6 text-base",
          }[size],

          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, type ButtonProps };
