# システム構成設計

## 1. 基本方針

MVPでは、できるだけシンプルな構成を採用する。

独立したバックエンドサーバーなどは用意せず、
Next.jsとSupabaseを中心に構成する。

---

## 2. 使用技術

| 領域 | 技術 | 役割 |
|---|---|---|
| フロントエンド | Next.js | Webアプリの画面・処理 |
| UI | React | 画面を構成する |
| 言語 | TypeScript | 型安全な開発 |
| CSS | Tailwind CSS | UIのスタイリング |
| Backend | Next.js Server Actions | サーバー側の処理 |
| Database | Supabase PostgreSQL | 本のデータを保存 |
| Authentication | Supabase Auth | ユーザー認証 |
| Hosting | Vercel | Webアプリを公開 |
| CI/CD | GitHub Actions | 自動テスト・ビルドチェック |
| Version Control | Git / GitHub | ソースコード・設計管理 |

---

## 3. システム全体構成

アプリケーションの基本的な構成は以下の通り。

```mermaid
flowchart LR
    User["ユーザー"]
    Next["Next.js"]
    Supabase["Supabase"]
    DB[("PostgreSQL")]

    User -->|"ブラウザ"| Next
    Next --> Supabase
    Supabase --> DB
```

### 各要素の役割

- ユーザー：ブラウザからアプリを利用する
- Next.js：画面を表示し、アプリの処理を行う
- Supabase：認証とデータベースを提供する
- PostgreSQL：読書データを保存する

---

## 4. 各技術の役割

### Next.js

Webアプリケーション全体の基盤として使用する。

以下を担当する。

- ページ表示
- 画面遷移
- サーバー側処理
- データ取得
- データ更新

### React

Next.jsのUIを構築するために使用する。

本棚や本の一覧、入力フォームなど、
ユーザーが操作する画面をコンポーネントとして構築する。

### TypeScript

JavaScriptに型を追加して使用する。

本のデータなどの構造を明確にし、
実装時のミスを減らす。

### Tailwind CSS

画面のデザイン・レイアウトを実装する。

MVPではデザインを作り込みすぎず、
スマートフォンで使いやすいUIを優先する。

### Next.js Server Actions

サーバー側でデータを操作するために使用する。

例えば、

- 本の登録
- 本の編集
- 本の削除

などの処理を担当する。

### Supabase

バックエンドサービスとして使用する。

MVPでは主に以下を利用する。

- PostgreSQL
- Authentication

### Supabase PostgreSQL

読書記録を保存する。

MVPでは `books` テーブルを使用する。

### Supabase Auth

ユーザーの認証を担当する。

MVPではGoogleログインを使用する。

ログインしているユーザーのIDを取得し、
そのユーザー自身の本だけを操作できるようにする。

### Vercel

完成したNext.jsアプリをインターネット上に公開する。

GitHubと連携し、
コードを更新すると自動的にデプロイできる構成を目指す。

### GitHub Actions

GitHubにコードをpushした際に、
自動的にコードチェックを実行する。

MVPでは以下を実行する。

- Lint
- Build

### Git / GitHub

以下を管理する。

- ソースコード
- 設計ドキュメント
- 開発履歴

GitHub Issuesを使用して開発タスクも管理する。

---

## 5. 本のデータ操作

本の登録・編集・削除では、
Next.jsからSupabaseのデータベースを操作する。

```mermaid
flowchart LR
    User["ユーザー"]
    UI["Next.js UI"]
    Action["Server Action"]
    DB[("Supabase PostgreSQL")]

    User -->|"入力・操作"| UI
    UI -->|"処理を依頼"| Action
    Action -->|"登録・更新・削除"| DB
    DB -->|"処理結果"| Action
    Action -->|"結果"| UI
    UI -->|"表示"| User
```

### データ操作

| 操作 | DBで行う処理 |
|---|---|
| 本の登録 | INSERT |
| 本の一覧取得 | SELECT |
| 本の編集 | UPDATE |
| 本の削除 | DELETE |

---

## 6. 本の登録

本を登録するときは、以下の流れで処理する。

```mermaid
sequenceDiagram
    actor User as ユーザー
    participant UI as Next.js UI
    participant Action as Server Action
    participant DB as Supabase PostgreSQL

    User->>UI: 本の情報を入力
    UI->>Action: 登録処理
    Action->>DB: INSERT
    DB-->>Action: 登録結果
    Action-->>UI: 処理結果
    UI-->>User: 本棚を表示
```

---

## 7. 本の一覧表示

本棚を開いたときは、Supabaseから本の一覧を取得する。

```mermaid
sequenceDiagram
    actor User as ユーザー
    participant Next as Next.js
    participant DB as Supabase PostgreSQL

    User->>Next: 本棚を開く
    Next->>DB: SELECT
    DB-->>Next: books
    Next-->>User: 本棚を表示
```

---

## 8. 本の編集

既存の本を編集する場合は、
新しいレコードを作成せず、既存のレコードを更新する。

```mermaid
sequenceDiagram
    actor User as ユーザー
    participant UI as Next.js UI
    participant Action as Server Action
    participant DB as Supabase PostgreSQL

    User->>UI: 本を編集
    UI->>Action: 更新処理
    Action->>DB: UPDATE
    DB-->>Action: 更新結果
    Action-->>UI: 処理結果
    UI-->>User: 更新後の本を表示
```

---

## 9. 本の削除

本を削除する場合は、既存のレコードを削除する。

```mermaid
sequenceDiagram
    actor User as ユーザー
    participant UI as Next.js UI
    participant Action as Server Action
    participant DB as Supabase PostgreSQL

    User->>UI: 削除を選択
    UI->>Action: 削除処理
    Action->>DB: DELETE
    DB-->>Action: 削除結果
    Action-->>UI: 処理結果
    UI-->>User: 本棚を表示
```

---

## 10. 認証とデータアクセス

ユーザーがGoogleログインすると、
Supabase Authによってユーザーが識別される。

本のデータには `user_id` を保存する。

これにより、ユーザーごとのデータを分離する。

```mermaid
flowchart LR
    User["ユーザー"]
    Auth["Supabase Auth"]
    Next["Next.js"]
    DB[("books")]

    User -->|"Googleログイン"| Auth
    Auth -->|"ユーザーID"| Next
    Next -->|"user_idで取得"| DB
    DB -->|"ユーザー自身の本"| Next
    Next -->|"本棚"| User
```

MVPでは自分一人で使用するが、
将来的な複数ユーザー利用を考慮した構成とする。

---

## 11. デプロイ構成

開発したコードはGitHubで管理し、
GitHub Actionsで自動チェックを行う。

その後、Vercelにデプロイする。

```mermaid
flowchart LR
    PC["開発PC"]
    GitHub["GitHub"]
    Actions["GitHub Actions"]
    Vercel["Vercel"]
    App["公開Webアプリ"]

    PC -->|"git push"| GitHub
    GitHub -->|"コード変更"| Actions
    Actions -->|"Lint / Build"| Actions
    GitHub -->|"デプロイ"| Vercel
    Vercel --> App
```

### GitHub Actionsで行うチェック

- Lint
- Build

チェックに失敗した場合は、
問題を修正してから再度pushする。

---

## 12. MVPで採用しない構成

以下はMVPでは使用しない。

- 独立したバックエンドサーバー
- Docker
- Kubernetes
- Redis
- GraphQL
- 外部API
- マイクロサービス
- 複雑な状態管理ライブラリ

アプリの規模に対して過剰な構成になるため、
必要になった時点で導入を検討する。

---

## 13. 技術選定の方針

「最新だから」という理由ではなく、
以下を重視して技術を選定する。

- MVPを短期間で完成できる
- Webアプリ開発を幅広く経験できる
- 個人開発で運用しやすい
- 将来的な拡張が可能
- 学習効果が高い

---

## 14. 技術構成の考え方

### Next.js

アプリ本体を作る。

### Supabase

ログインとデータベースを担当する。

### Vercel

アプリをインターネット上に公開する。

### GitHub

ソースコードと設計資料を管理する。

### GitHub Actions

コードの自動チェックを行う。

---

## 15. 設計上の注意

Next.js Server Actionsを使用すること自体を目的としない。

実装時には、

- Server Componentで処理するもの
- Server Actionsで処理するもの
- Route Handlerが必要なもの

を、それぞれの用途に応じて判断する。

「Server Actionsを使う」ことよりも、
「Next.jsの仕組みを適切に使って安全かつシンプルに実装する」ことを優先する。