# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

Obsidianに蓄積した知識とネットワークを利用したポートフォリオサイト。

**根本ドキュメント**: `転職Gemini調査.md`（Obsidian Vault: My-Obsidian-Sync）

このプロジェクトの全ての設計判断は、以下の学習目標に基づいている：
1. Web全体の仕組み（HTTP, DNS, TLS, ブラウザレンダリング）
2. 設計・技術選定（FSD、システムデザイン）
3. バックエンド（Go言語、API設計、BFF）
4. データベース（SQL、正規化、インデックス）
5. インフラ（Docker、AWS、CI/CD）

**計画ドキュメント**: `docs/PLAN.md`（.gitignore済み）

## 技術スタック

- **Frontend**: Next.js 16 (App Router) + TypeScript
- **Styling**: Tailwind CSS v4
- **UI Library**: HeroUI（旧NextUI）- React Ariaベース
- **Theme**: next-themes（ダークモード管理）
- **Architecture**: Feature-Sliced Design (FSD)
- **Node.js**: 24.13.0 (Volta管理)

## コマンド

```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# Lint
npm run lint

# 型チェック
npx tsc --noEmit
```

## ディレクトリ構成 (FSD)

```
src/
├── app/        # Next.js App Router（ルーティング）
├── widgets/    # 独立したUIブロック（Header, Footer等）
├── features/   # ユーザーアクション（検索、投稿等）
├── entities/   # ビジネスエンティティ（Article, Tag等）
└── shared/     # 汎用コード（UIキット、ユーティリティ）
```

**依存ルール**: 上層 → 下層のみ（下層は上層を知らない）

## コミットルール

### 粒度
- **1コミット = 1つの論理的な変更**
- 大きな変更は分割してコミット
- 動作する状態でコミット（壊れた状態でコミットしない）

### コミットメッセージ
```
<type>: <summary>

<body（任意）>
```

### Type
- `feat`: 新機能
- `fix`: バグ修正
- `refactor`: リファクタリング
- `style`: コードスタイル変更
- `docs`: ドキュメント変更
- `chore`: ビルド設定等の雑務
- `test`: テスト追加・修正

### 例
```
feat: FSDディレクトリ構造をセットアップ
fix: 記事一覧のページネーションを修正
refactor: entities/articleの型定義を整理
```

## テスト

### E2Eテスト（Playwright）

```bash
# E2Eテスト実行
npm run test:e2e

# UIモードでテスト（デバッグ用）
npm run test:e2e:ui

# スナップショット更新
npm run test:e2e:update
```

テストファイルは `e2e/` ディレクトリに配置。

## 開発方針

### TDD（テスト駆動開発）

**必須**: 新しい機能やUIコンポーネントを実装する際は、必ずTDDで進める。

#### TDDサイクル

1. **Red**: 失敗するテストを先に書く
2. **Green**: テストが通る最小限のコードを書く
3. **Refactor**: コードをリファクタリング（テストは通ったまま）

#### 実践ルール

- **UIの変更前にE2Eテストを書く**: ホバー、フォーカス、レスポンシブ等の視覚的変更は、先にPlaywrightテストを追加
- **ロジックの変更前にユニットテストを書く**: ユーティリティ関数、データ変換等
- **テストが通らない状態でコミットしない**: `npm run test:e2e` が通ることを確認

#### テストで検証すべき項目

- ページが正しく表示される
- ナビゲーションが機能する
- キーボードアクセシビリティ（Tab移動、フォーカス表示）
- ホバー/フォーカス状態のスタイル
- レスポンシブデザイン

### ダークモード実装の注意点

#### カラーパレット（60-30-10ルール）
- **60% ベース**: 白 / 黒（zinc-50 / zinc-950）
- **30% セカンダリ**: テキスト（zinc-900 / zinc-100）
- **10% アクセント**: 黄色（yellow-400）

詳細は `src/shared/config/colors.ts` を参照。

#### トランジション設定の注意

**問題**: テーマ切替時のフェードトランジションを全要素（`*`）に適用すると、HeroUIコンポーネント（Switch等）がかくつく。

**原因**: HeroUIは独自のトランジションを持っており、globals.cssの `transition: background-color` と競合する。

**解決策**: トランジションは主要なレイアウト要素のみに限定する。

```css
/* ✅ 良い例: レイアウト要素のみ */
html, body, main, header, footer, section, article, nav, aside {
  transition: background-color 200ms ease-in-out;
}

/* ❌ 悪い例: 全要素に適用 */
*, *::before, *::after {
  transition: background-color 200ms ease-in-out;
}
```

**HeroUIコンポーネントのカスタマイズ**: `classNames` propを使用し、プロジェクトのカラーパレットに合わせる。

```tsx
<Switch
  classNames={{
    wrapper: "bg-zinc-200 group-data-[selected=true]:bg-yellow-400",
    thumb: "bg-white dark:bg-zinc-100",
    thumbIcon: "text-zinc-700",
  }}
/>
```

### その他

- **学習を兼ねた実装**: 各ステップで「なぜそうするのか」を理解する
- **Obsidianにメモ**: 学んだことは `Portfolio開発/` フォルダに記録
- **publicリポジトリ**: 機密情報はコミットしない
