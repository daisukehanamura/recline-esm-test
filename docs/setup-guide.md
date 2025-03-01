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
    "moduleResolution": "node"
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

```bash
# サーバー用ディレクトリの作成
mkdir src/server
mkdir src/components
```

## 6. Expressサーバーの作成

`src/server/index.ts`を作成：

```typescript
import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';

const app = express();
const port = process.env.PORT || 3001;

// ミドルウェアの設定
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../build')));

// APIエンドポイントの例
app.get('/api/hello', (_: Request, res: Response) => {
  res.json({ message: 'Hello from Express!' });
});

// その他のルートはReactアプリにフォールバック
app.get('*', (_: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export {};
```

**解説：**
- `cors()`で異なるオリジン間のリクエストを許可
- `express.json()`でJSONリクエストの解析を有効化
- `express.static()`で静的ファイルの配信を設定
- フォールバックルートでSPAの動作を実現

## 起動方法

1. 開発モード（フロントエンド＆バックエンド）:
```bash
npm start
```

2. プロダクションビルド:
```bash
npm run build
NODE_ENV=production node dist/server/index.js
```

## 動作確認

- フロントエンド: http://localhost:3000
- バックエンドAPI: http://localhost:3001

## トラブルシューティング

### よくある問題と解決方法

1. ポートが既に使用されている場合:
```bash
# プロセスを確認
lsof -i :3000
lsof -i :3001

# プロセスを終了
kill -9 <プロセスID>
```

2. TypeScriptのコンパイルエラー:
- `tsconfig.json`の設定を確認
- 必要な`@types/*`パッケージがインストールされているか確認

3. CORSエラー:
- バックエンドの`cors`設定を確認
- フロントエンドのAPI呼び出しURLを確認
