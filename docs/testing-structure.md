# テストディレクトリ構成ガイド

このガイドでは、React + TypeScriptプロジェクトにおける推奨のテストファイル構成について説明します。

## 基本方針

1. テストファイルはテスト対象のコードの近くに配置
2. テストの種類に応じて適切にディレクトリを分離
3. 共通のテストユーティリティは集中管理

## 推奨ディレクトリ構造

```
src/
├── components/           # Reactコンポーネント
│   └── Profile/         # 個別のコンポーネントディレクトリ
│       ├── Profile.tsx
│       ├── Profile.test.tsx      # コンポーネントの単体テスト
│       ├── Profile.e2e.test.ts   # E2Eテスト
│       └── Profile.css
├── server/              # バックエンド
│   ├── controllers/     # コントローラー
│   │   ├── profile.ts
│   │   └── __tests__/
│   │       ├── profile.test.ts   # 単体テスト
│   │       └── profile.int.test.ts # 統合テスト
│   └── index.ts
├── utils/              # ユーティリティ関数
│   ├── api.ts
│   └── __tests__/     # ユーティリティのテスト
│       └── api.test.ts
└── __tests__/         # プロジェクト全体のテスト
    ├── setup/         # テスト設定
    │   ├── setup.ts   # Jestのセットアップ
    │   └── mock-server.ts # テスト用サーバー
    ├── mocks/         # モックデータ
    │   ├── handlers.ts   # MSWハンドラー
    │   └── data/        # テスト用データ
    │       └── profiles.json
    ├── fixtures/      # テストフィクスチャ
    │   └── test-utils.tsx # テスト用ユーティリティ
    └── integration/   # 統合テスト
        └── api-flow.test.ts
```

## ファイルの命名規則

- 単体テスト: `*.test.tsx` または `*.test.ts`
- 統合テスト: `*.int.test.ts`
- E2Eテスト: `*.e2e.test.ts`
- テストユーティリティ: `*-utils.ts`
- テストヘルパー: `*-helper.ts`
- モックファイル: `*.mock.ts`

## テストの種類と配置

### 1. コンポーネントテスト

```typescript
// src/components/Profile/Profile.test.tsx
import { render, screen } from '@testing-library/react';
import { Profile } from './Profile';

describe('Profile', () => {
  it('renders profile information', () => {
    render(<Profile />);
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });
});
```

### 2. APIテスト

```typescript
// src/server/controllers/__tests__/profile.test.ts
import { getProfile } from '../profile';

describe('Profile Controller', () => {
  it('returns profile data', async () => {
    const profile = await getProfile(1);
    expect(profile).toHaveProperty('name');
  });
});
```

### 3. 統合テスト

```typescript
// src/__tests__/integration/api-flow.test.ts
import { server } from '../mocks/server';
import { getProfile, updateProfile } from '@/utils/api';

describe('Profile API Flow', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('handles complete profile update flow', async () => {
    // テストコード
  });
});
```

## テストユーティリティ

### 1. カスタムレンダラー

```typescript
// src/__tests__/fixtures/test-utils.tsx
import { render } from '@testing-library/react';
import { ThemeProvider } from '@/context/theme';

export const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider>{ui}</ThemeProvider>
  );
};
```

### 2. モックサーバー設定

```typescript
// src/__tests__/setup/mock-server.ts
import { setupServer } from 'msw/node';
import { handlers } from '../mocks/handlers';

export const server = setupServer(...handlers);
```

## Jest設定

`package.json`または`jest.config.js`：

```json
{
  "jest": {
    "setupFilesAfterEnv": [
      "<rootDir>/src/__tests__/setup/setup.ts"
    ],
    "testEnvironment": "jsdom",
    "moduleNameMapper": {
      "^@/(.*)$": "<rootDir>/src/$1",
      "\\.(css|less|sass|scss)$": "identity-obj-proxy"
    },
    "collectCoverageFrom": [
      "src/**/*.{ts,tsx}",
      "!src/**/*.d.ts",
      "!src/__tests__/**"
    ]
  }
}
```

## ベストプラクティス

1. **コンポーネントテスト**
   - コンポーネントと同じディレクトリに配置
   - ユーザーの行動を模倣したテストを作成
   - アクセシビリティのテストを含める

2. **APIテスト**
   - コントローラーの近くに配置
   - モックサーバーを使用
   - エラーケースを必ずテスト

3. **統合テスト**
   - 複数の機能を跨ぐフローをテスト
   - 実際のユースケースに基づいたシナリオ作成

4. **E2Eテスト**
   - 重要なユーザーフローに焦点を当てる
   - 本番環境に近い環境でテスト

## テストカバレッジ

```bash
# カバレッジレポート生成
npm test -- --coverage

# 特定のディレクトリのみテスト
npm test -- src/components/Profile
```

## CI/CD統合

`.github/workflows/test.yml`の例：

```yaml
name: Test
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test -- --coverage
