# React + TypeScript + Express プロジェクトセットアップガイド

このガイドでは、React + TypeScript + Express を使用したフルスタックプロジェクトの作成手順を説明します。

## 前提条件

以下のツールがインストールされている必要があります：

- Node.js v18.17.1以上
- npm v9.6.7以上

Node.jsのバージョン確認は以下のコマンドで行えます：
```bash
node -v
npm -v
```

## 1. プロジェクトの作成

### Create React App でTypeScriptプロジェクトを作成

```bash
# create-react-appを使用してTypeScriptテンプレートでプロジェクトを作成
npx create-react-app my-app --template typescript

# 作成したディレクトリに移動
cd my-app
```

**解説：**
- `npx`はNode.jsに付属するパッケージランナーで、インストールせずにパッケージを実行できます
- `create-react-app`はReactの公式プロジェクト作成ツールです
- `--template typescript`オプションでTypeScriptサポートを有効にします

## 2. Express用の依存パッケージの追加

```bash
# TypeScript関連のパッケージをインストール
npm install --save-dev @types/node @types/express

# Express関連のパッケージをインストール
npm install express cors
npm install --save-dev @types/cors

# 開発用ユーティリティをインストール
npm install --save-dev concurrently nodemon ts-node
```

**解説：**
- `express`: Node.js用のWebアプリケーションフレームワーク
- `cors`: Cross-Origin Resource Sharing を有効にするミドルウェア
- `@types/*`: TypeScript用の型定義ファイル
- `concurrently`: 複数のコマンドを同時に実行するためのツール
- `nodemon`: ファイル変更を監視して自動的にサーバーを再起動
- `ts-node`: TypeScriptファイルを直接実行するためのツール

## 3. TypeScript設定ファイルの作成

### バックエンド用のTypeScript設定

`tsconfig.server.json`を作成：

```json
{
  "compilerOptions": {
    "target": "es2017",
    "module": "commonjs",
    "lib": ["es2017"],
    "outDir": "./dist",
    "rootDir": "./src/server",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/server/**/*"],
  "exclude": ["node_modules"]
}
```

**解説：**
- `target`: コンパイル後のJavaScriptのバージョン
- `module`: モジュールシステムの形式（Node.jsで一般的なCommonJS）
- `outDir`: コンパイル後のファイルの出力先
- `rootDir`: ソースファイルのルートディレクトリ
- `strict`: 厳格な型チェックを有効化
- `paths`: パスエイリアスの設定（`@/`で`src/`ディレクトリを参照可能に）

## 4. package.jsonの設定

`package.json`のscriptsセクションに以下を追加：

```json
{
  "scripts": {
    "start": "concurrently \"npm run server\" \"npm run client\"",
    "client": "react-scripts start",
    "server": "nodemon --exec ts-node src/server/index.ts",
    "build": "react-scripts build && tsc -p tsconfig.server.json",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}
```

**解説：**
- `start`: フロントエンドとバックエンドを同時に起動
- `client`: React開発サーバーを起動（ポート3000）
- `server`: Express サーバーを起動（ポート3001）
- `build`: フロントエンドとバックエンドの両方をビルド

## 5. ディレクトリ構造の作成

推奨されるディレクトリ構造は以下の通りです：

```
src/
├── components/          # Reactコンポーネント
│   ├── __tests__/      # コンポーネント共通のテスト
│   └── Profile/        # 個別のコンポーネントディレクトリ
│       ├── Profile.tsx
│       ├── Profile.test.tsx  # コンポーネント固有のテスト
│       └── Profile.css
├── server/             # バックエンド
│   ├── __tests__/      # サーバーのテスト
│   │   └── index.test.ts
│   └── index.ts
├── utils/             # 共通ユーティリティ関数
│   ├── __tests__/     # ユーティリティのテスト
│   └── index.ts
└── tests/             # グローバルテスト設定
    ├── setup.ts       # テストのセットアップ
    └── mocks/         # モックデータ
```

**ディレクトリ作成コマンド:**
```bash
# メインディレクトリ
mkdir -p src/components/Profile
mkdir -p src/server/__tests__
mkdir -p src/utils/__tests__
mkdir -p src/tests/mocks

# テスト関連ファイルを移動
mv src/setupTests.ts src/tests/setup.ts
```

**テストファイルの配置について：**
- コンポーネントのテスト:
  - 個別のコンポーネントテスト → コンポーネントと同じディレクトリに配置
  - 共通のテストユーティリティ → `__tests__`ディレクトリに配置
- バックエンドのテスト:
  - APIエンドポイントのテスト → `server/__tests__`に配置
- グローバル設定:
  - セットアップファイル → `tests/setup.ts`
  - モックデータ → `tests/mocks`ディレクトリ

## 6. テスト設定の更新

### Jestの設定

`package.json`に以下の設定を追加：

```json
{
  "jest": {
    "setupFilesAfterEnv": [
      "<rootDir>/src/tests/setup.ts"
    ],
    "moduleNameMapper": {
      "^@/(.*)$": "<rootDir>/src/$1"
    }
  }
}
```

**解説：**
- `setupFilesAfterEnv`: テスト実行前の共通設定ファイルを指定
- `moduleNameMapper`: パスエイリアスの設定（`@/components/Profile`で`src/components/Profile`にアクセス）

## 起動方法

### 開発モード

1. プロジェクトディレクトリに移動:
```bash
cd プロジェクト名
```

2. 依存パッケージのインストール:
```bash
npm install
```

3. アプリケーションの起動:
```bash
npm start
```

### プロダクションモード

1. アプリケーションのビルド:
```bash
npm run build
```

2. サーバーの起動:
```bash
NODE_ENV=production node dist/server/index.js
```

## トラブルシューティング

### プロジェクトディレクトリでの操作

**問題：** 以下のようなエラーが表示される場合
```
npm ERR! code ENOENT
npm ERR! syscall open
npm ERR! path /path/to/directory/package.json
npm ERR! errno -2
npm ERR! enoent ENOENT: no such file or directory, open '/path/to/directory/package.json'
```

**原因と解決策：**
1. 正しいディレクトリにいることを確認:
```bash
pwd  # 現在のディレクトリを表示
```

2. プロジェクトディレクトリに移動:
```bash
cd プロジェクト名
```

### その他のよくある問題

1. ポートが使用中の場合:
```bash
# プロセスの確認
lsof -i :3000  # フロントエンド
lsof -i :3001  # バックエンド

# プロセスの終了
kill -9 <プロセスID>
```

2. TypeScriptのコンパイルエラー:
- `tsconfig.json`の設定を確認
- 必要な`@types/*`パッケージがインストールされているか確認

3. CORSエラー:
- バックエンドの`cors`設定を確認
- フロントエンドのAPI呼び出しURLを確認
