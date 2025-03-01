# プロジェクト構成

このプロジェクトは React + TypeScript + Express で構築された自己紹介ウェブサイトです。

## ディレクトリ構造

```
my-profile/
├── docs/                    # プロジェクトのドキュメント
├── public/                  # 静的ファイル
│   ├── favicon.ico         # ウェブサイトのアイコン
│   ├── index.html         # メインのHTMLファイル
│   ├── logo192.png        # PWA用のロゴ（小）
│   ├── logo512.png        # PWA用のロゴ（大）
│   ├── manifest.json      # PWAのマニフェストファイル
│   └── robots.txt         # クローラー設定ファイル
├── src/                    # ソースコード
│   ├── components/        # Reactコンポーネント
│   │   └── Profile.tsx    # プロフィール表示用コンポーネント
│   ├── server/            # バックエンド
│   │   └── index.ts      # Expressサーバーのメインファイル
│   ├── App.css           # アプリケーションのメインスタイル
│   ├── App.test.tsx      # Appコンポーネントのテスト
│   ├── App.tsx           # メインのAppコンポーネント
│   ├── index.css         # グローバルスタイル
│   ├── index.tsx         # アプリケーションのエントリーポイント
│   ├── logo.svg          # Reactロゴ
│   ├── react-app-env.d.ts # Create React App用の型定義
│   ├── reportWebVitals.ts # パフォーマンス計測
│   └── setupTests.ts      # テスト設定
├── .gitignore             # Gitの除外設定
├── package.json           # プロジェクト設定・依存関係
├── package-lock.json      # 依存関係のロックファイル
├── tsconfig.json          # TypeScript設定（フロントエンド）
└── tsconfig.server.json   # TypeScript設定（バックエンド）

## 主要ファイルの説明

### バックエンド

- `src/server/index.ts`
  - Expressサーバーの設定
  - プロフィールデータのAPI提供
  - 静的ファイルの配信
  - ポート3001で起動

### フロントエンド

- `src/components/Profile.tsx`
  - プロフィール情報を表示するコンポーネント
  - APIからデータを取得して表示
  - スキルと興味のリスト表示

- `src/App.tsx`
  - アプリケーションのメインコンポーネント
  - ルーティングとレイアウトの管理

- `src/App.css`
  - レスポンシブデザイン
  - プロフィールカードのスタイリング
  - スキル・興味タグのデザイン

## 設定ファイル

### TypeScript設定

- `tsconfig.json`
  - フロントエンド用のTypeScript設定
  - React固有の設定を含む

- `tsconfig.server.json`
  - バックエンド用のTypeScript設定
  - Node.js環境用の設定

### パッケージ管理

- `package.json`
  - プロジェクトの依存関係
  - スクリプトコマンド
    - `npm start`: フロントエンドとバックエンドを同時に起動
    - `npm run client`: フロントエンドのみ起動
    - `npm run server`: バックエンドのみ起動
    - `npm run build`: プロダクションビルド

## 開発環境

- Node.js: v18.17.1
- TypeScript: 5.7.3
- React
- Express
- その他の主要パッケージ:
  - cors: CORSサポート
  - nodemon: 開発時のホットリロード
  - ts-node: TypeScriptの実行
  - concurrently: 複数コマンドの同時実行
