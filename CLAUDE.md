# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

Obsidianに蓄積した知識とネットワークを利用したポートフォリオサイト。

## 技術スタック

- **Frontend**: Next.js 16 (App Router) + TypeScript
- **Styling**: Tailwind CSS
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

## 開発方針

- **学習を兼ねた実装**: 各ステップで「なぜそうするのか」を理解する
- **Obsidianにメモ**: 学んだことは `Portfolio開発/` フォルダに記録
- **publicリポジトリ**: 機密情報はコミットしない
