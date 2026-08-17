# Reading Manager

読んだ本を記録・管理するための読書管理Webアプリ。

自分自身が読書を続ける中で、
「読んだ本を忘れずに記録したい」という課題を解決するために開発する。

## 目的

このプロジェクトでは、単にアプリを完成させるだけでなく、
個人開発を通して以下の経験を得ることを目的とする。

- Webサービスを0→1で開発する
- 要件定義・設計・実装を経験する
- UI/UXを考える
- データベースを設計する
- 認証・クラウド環境を扱う
- CI/CDを構築する
- 実際にサービスを公開する
- ユーザー視点で改善する

## 主な機能

### MVP

- 本の登録
- 本の一覧表示
- 本の編集
- 本の削除
- 評価（5段階）
- 読了日時の記録
- 読了日時による並び替え
- 評価による並び替え
- 著者による並び替え
- Googleログイン
- ユーザーごとのデータ管理

## 技術スタック

| 領域 | 技術 |
|---|---|
| Frontend | Next.js |
| UI | React / Tailwind CSS |
| Language | TypeScript |
| Backend | Next.js Server Actions |
| Database | Supabase PostgreSQL |
| Authentication | Supabase Auth |
| Hosting | Vercel |
| CI/CD | GitHub Actions |
| Version Control | Git / GitHub |

## 開発方針

完成度よりも、企画から公開までやり切ることを重視する。

1. 動くものを作る
2. 自分が使う
3. 公開する
4. 改善する

最初から大規模なサービスを目指さず、
必要になった機能を段階的に追加する。

## 開発ロードマップ

| Phase | 内容 |
|---|---|
| Week 1 | 企画・設計 |
| Week 2 | 環境構築・基盤実装 |
| Week 3 | 本の登録・一覧 |
| Week 4 | 編集・削除・並び替え |
| Week 5 | 認証・UI改善・テスト |
| Week 6 | 公開・運用 |

## ドキュメント

詳細な設計は `docs/` に保存する。

- `requirements.md` - 要件定義
- `screen-design.md` - 画面設計
- `database-design.md` - DB設計
- `architecture.md` - システム構成
- `roadmap.md` - 開発ロードマップ

## Status

開発中