/**
 * トップページ - Server Component
 *
 * App Routerでは、page.tsxはデフォルトでServer Component。
 * "use client"を書かない限り、サーバーでレンダリングされる。
 */

import Link from "next/link";
import {
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiGo,
  SiPostgresql,
} from "react-icons/si";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-950">
      {/* Hero Section */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-24">
        <div className="max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
            Hayato Kamiyama
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Frontend Developer
          </p>

          {/* Tech Stack */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <SiNextdotjs className="size-7 text-zinc-700 dark:text-zinc-300" title="Next.js" />
            <SiTypescript className="size-7 text-zinc-700 dark:text-zinc-300" title="TypeScript" />
            <SiReact className="size-7 text-zinc-700 dark:text-zinc-300" title="React" />
            <SiTailwindcss className="size-7 text-zinc-700 dark:text-zinc-300" title="Tailwind CSS" />
            <SiGo className="size-7 text-zinc-700 dark:text-zinc-300" title="Go" />
            <SiPostgresql className="size-7 text-zinc-700 dark:text-zinc-300" title="PostgreSQL" />
          </div>

          {/* Navigation */}
          <nav className="mt-10 flex flex-wrap justify-center gap-6">
            <Link
              href="/blog"
              className="text-zinc-600 transition-colors hover:text-yellow-600 dark:text-zinc-400 dark:hover:text-yellow-400"
            >
              Blog
            </Link>
            <Link
              href="/graph"
              className="text-zinc-600 transition-colors hover:text-yellow-600 dark:text-zinc-400 dark:hover:text-yellow-400"
            >
              Graph
            </Link>
            <Link
              href="/about"
              className="text-zinc-600 transition-colors hover:text-yellow-600 dark:text-zinc-400 dark:hover:text-yellow-400"
            >
              About
            </Link>
          </nav>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 py-6 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        Built with Next.js, Go, and PostgreSQL
      </footer>
    </div>
  );
}
