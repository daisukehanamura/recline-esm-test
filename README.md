# プロフィールウェブサイト

このプロジェクトは React + TypeScript + Express で構築された自己紹介ウェブサイトです。

## システム要件

- Node.js v18.17.1以上
- npm v9.6.7以上

## セットアップ手順

1. 依存パッケージのインストール:
```bash
npm install
```

## アプリケーションの起動

### 開発モード

1. フロントエンド＆バックエンドを同時に起動:
```bash
npm start
```
- フロントエンド: http://localhost:3000
- バックエンドAPI: http://localhost:3001

2. フロントエンドのみ起動:
```bash
npm run client
```

3. バックエンドのみ起動:
```bash
npm run server
```

### プロダクションビルド

1. アプリケーションのビルド:
```bash
npm run build
```

2. ビルドされたアプリケーションの起動:
```bash
# フロントエンドはbuildディレクトリに生成されます
# バックエンドはdist/server/index.jsに生成されます
NODE_ENV=production node dist/server/index.js
```

## 開発ガイド

### プロジェクト構造

詳細なプロジェクト構造については[docs/project-structure.md](docs/project-structure.md)を参照してください。

### バックエンドAPI

- エンドポイント: `/api/profile`
- ポート: 3001
- レスポンス形式: JSON

### フロントエンド

- React + TypeScript
- ポート: 3000
- ホットリロード対応

---

# Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
