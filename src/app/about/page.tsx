import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About - Hiroki Kamiyama",
  description: "Hiroki Kamiyama について",
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-950">
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-24">
        <div className="max-w-xl">
          {/* Profile */}
          <section className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Hiroki Kamiyama
            </h1>
            <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
              Frontend Developer
            </p>
          </section>

          {/* Bio */}
          <section className="mt-8">
            <p className="text-center leading-7 text-zinc-600 dark:text-zinc-400">
              Webフロントエンド開発をしています。
              <br />
              Vue.js / Nuxt.js での開発経験があり、
              <br />
              現在は React / Next.js を学習中です。
            </p>
          </section>

          {/* Links */}
          <section className="mt-10">
            <ul className="flex justify-center gap-6">
              <li>
                <a
                  href="https://github.com/kami8ma8810"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/kami8ma8810"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                  X
                </a>
              </li>
            </ul>
          </section>

          {/* Back to Home */}
          <div className="mt-12 text-center">
            <Link
              href="/"
              className="text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-100"
            >
              ← Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
