# React + TypeScriptプロジェクトのテスト設定ガイド

## 目次
1. [テストの基本概念](#テストの基本概念)
2. [テストツールの解説](#テストツールの解説)
3. [ディレクトリ構成](#ディレクトリ構成)
4. [テストの種類と実装方法](#テストの種類と実装方法)
5. [設定ファイルの解説](#設定ファイルの解説)
6. [よくある問題と解決方法](#よくある問題と解決方法)

## テストの基本概念

### 単体テスト（Unit Test）とは
個々のコンポーネントや関数が期待通りに動作することを確認するテスト。
```typescript
// 例：単純な関数のテスト
test('add関数は2つの数値を加算する', () => {
  expect(add(1, 2)).toBe(3);
});
```

### 統合テスト（Integration Test）とは
複数のコンポーネントや機能が連携して正しく動作することを確認するテスト。
```typescript
// 例：フォームの送信と APIの連携をテスト
test('フォーム送信でAPIが呼び出される', async () => {
  render(<ContactForm />);
  await userEvent.type(screen.getByLabelText('名前'), 'テストユーザー');
  await userEvent.click(screen.getByText('送信'));
  expect(mockApi.submit).toHaveBeenCalled();
});
```

### E2Eテスト（End-to-End Test）とは
実際のユーザー操作を模倣し、アプリケーション全体の動作を確認するテスト。

## テストツールの解説

### Jest
- **説明**: JavaScriptのテストフレームワーク
- **主な機能**:
  - テストランナー（テストの実行）
  - アサーション（expect文による検証）
  - モック（依存関係の代用）
  - カバレッジレポート（テストの網羅率確認）

### React Testing Library
- **説明**: Reactコンポーネントのテストに特化したライブラリ
- **特徴**:
  - ユーザー視点でのテスト
  - アクセシビリティを考慮したセレクタ
  - 実際のDOM操作に基づくテスト

```typescript
// React Testing Libraryの基本的な使用例
import { render, screen } from '@testing-library/react';

test('ボタンがクリックできる', () => {
  render(<Button>クリック</Button>);
  const button = screen.getByRole('button', { name: 'クリック' });
  expect(button).toBeInTheDocument();
});
```

### MSW (Mock Service Worker)
- **説明**: APIリクエストのモックを行うライブラリ
- **用途**: 
  - バックエンドAPIの振る舞いをシミュレート
  - テスト環境でのネットワークリクエストの制御
  - オフライン開発の効率化

```typescript
// MSWのハンドラー設定例
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/user', () => {
    return HttpResponse.json({
      id: 1,
      name: 'テストユーザー'
    });
  })
];
```

## ディレクトリ構成

```
src/
├── __tests__/           # グローバルなテスト設定と共有リソース
│   ├── setup/          # テストのセットアップファイル
│   │   ├── setup.ts    # Jestの設定
│   │   └── mock-server.ts  # MSWの設定
│   ├── mocks/          # モックデータとハンドラー
│   │   ├── handlers.ts    # APIモック
│   │   └── data/         # テストデータ
│   └── fixtures/       # テストユーティリティ
│       └── test-utils.tsx # 共通のテストヘルパー
└── components/         # Reactコンポーネント
    └── Profile/        # 個別のコンポーネント
        ├── Profile.tsx    # 実装
        └── __tests__/     # コンポーネント固有のテスト
            └── Profile.test.tsx
```

### ディレクトリ構成の説明
- `__tests__/`: テスト関連ファイルの格納場所
- `setup/`: テスト実行前の初期設定
- `mocks/`: モックデータとAPIモック
- `fixtures/`: 再利用可能なテストユーティリティ

## テストの種類と実装方法

### コンポーネントテスト
```typescript
// src/components/Profile/__tests__/Profile.test.tsx
import { render, screen } from '@testing-library/react';
import { Profile } from '../Profile';

describe('Profile Component', () => {
  it('プロフィール情報が表示される', async () => {
    render(<Profile />);
    expect(await screen.findByText('テストユーザー')).toBeInTheDocument();
  });
});
```

### APIテスト
```typescript
// src/api/__tests__/userApi.test.ts
import { fetchUser } from '../userApi';

describe('User API', () => {
  it('ユーザー情報を取得できる', async () => {
    const user = await fetchUser(1);
    expect(user.name).toBe('テストユーザー');
  });
});
```

### カスタムフックのテスト
```typescript
// src/hooks/__tests__/useUser.test.ts
import { renderHook } from '@testing-library/react';
import { useUser } from '../useUser';

describe('useUser Hook', () => {
  it('ユーザー情報を管理できる', () => {
    const { result } = renderHook(() => useUser());
    expect(result.current.user).toBeDefined();
  });
});
```

## 設定ファイルの解説

### Jest設定（jest.config.js）
```javascript
module.exports = {
  preset: 'ts-jest',  // TypeScriptサポート
  testEnvironment: 'jsdom',  // ブラウザ環境のエミュレート
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup/setup.ts'],
  moduleNameMapper: {  // パスエイリアスとアセットの処理
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy'
  }
};
```

### セットアップファイル（setup.ts）
```typescript
import '@testing-library/jest-dom';
import { server } from './mock-server';

// MSWの設定
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

## よくある問題と解決方法

### 1. テストが非同期処理を待たない
```typescript
// ❌ 間違った書き方
test('データが表示される', () => {
  render(<DataComponent />);
  expect(screen.getByText('データ')).toBeInTheDocument();
});

// ✅ 正しい書き方
test('データが表示される', async () => {
  render(<DataComponent />);
  expect(await screen.findByText('データ')).toBeInTheDocument();
});
```

### 2. コンポーネントの更新が反映されない
```typescript
// ✅ act()で更新を待つ
import { act } from '@testing-library/react';

test('状態が更新される', async () => {
  render(<StateComponent />);
  await act(async () => {
    await userEvent.click(screen.getByRole('button'));
  });
});
```

### 3. モックの使い方
```typescript
// ✅ 関数のモック
const mockFn = jest.fn();
mockFn.mockReturnValue('テスト値');

// ✅ モジュールのモック
jest.mock('./api', () => ({
  fetchData: jest.fn().mockResolvedValue({ data: 'テスト' })
}));
```

## テストコマンド

```bash
# 全テストの実行
npm test

# 開発中のウォッチモード
npm run test:watch

# カバレッジレポートの生成
npm run test:coverage
```

## テストの書き方のベストプラクティス

1. **Arrange-Act-Assert** パターンを使用
```typescript
test('ユーザー名が更新できる', async () => {
  // Arrange（準備）
  render(<UserProfile />);
  const input = screen.getByLabelText('名前');
  
  // Act（実行）
  await userEvent.type(input, '新しい名前');
  await userEvent.click(screen.getByText('保存'));
  
  // Assert（検証）
  expect(await screen.findByText('保存しました')).toBeInTheDocument();
});
```

2. **テストの分離**: 各テストは独立して実行できるようにする
3. **意図が明確なテスト名**: テストの目的が分かる名前をつける
4. **必要最小限のテスト**: 重要な機能に焦点を当てる

## 参考リンク
- [Jest公式ドキュメント](https://jestjs.io/ja/)
- [React Testing Library公式ドキュメント](https://testing-library.com/docs/react-testing-library/intro/)
- [MSW公式ドキュメント](https://mswjs.io/)
