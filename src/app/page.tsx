/**
 * トップページ - Server Component
 *
 * App Routerでは、page.tsxはデフォルトでServer Component。
 * "use client"を書かない限り、サーバーでレンダリングされる。
 */

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-950">
      {/* Hero Section */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-24">
        <div className="max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
            Knowledge Graph Portfolio
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Obsidianで蓄積した知識をナレッジグラフで可視化する
            <br />
            フルスタックポートフォリオサイト
          </p>

          {/* Tech Stack Tags */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {["Next.js", "TypeScript", "Tailwind", "Go", "PostgreSQL"].map(
              (tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-zinc-200 px-3 py-1 text-sm text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                >
                  {tech}
                </span>
              )
            )}
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/blog"
              className="inline-flex h-12 items-center justify-center rounded-full bg-zinc-900 px-6 text-base font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
            >
              Blog
            </Link>
            <Link
              href="/graph"
              className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-300 px-6 text-base font-semibold text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-900"
            >
              Graph
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 py-6 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        Built with Next.js, Go, and PostgreSQL
      </footer>
    </div>
  );
}
