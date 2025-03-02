# テストのトラブルシューティング

## 発生した問題と解決方法

### 1. MSWの削除による問題
- **問題**: MSWを削除した後、テストファイルでMSWの依存関係が残っていた
- **解決**: 
  - `mock-server.ts`の削除
  - テストファイルからMSW関連のインポートを削除
  - モックサーバーを使用しない形にテストケースを修正

### 2. TypeScriptの型定義エラー
- **問題**: `toBeInTheDocument()`マッチャーが認識されない
  ```
  Property 'toBeInTheDocument' does not exist on type 'JestMatchers<HTMLElement>'
  ```
- **解決**:
  1. `@types/testing-library__jest-dom`のインストール
  2. カスタム型定義ファイルの作成（`src/types/jest.d.ts`）
  3. `tsconfig.json`の更新で型定義を認識するように設定

### 3. テストファイルの誤検出
- **問題**: モックファイル（`fileMock.js`）がテストスイートとして実行される
- **解決**: 
  - `jest.config.js`の`testPathIgnorePatterns`を更新
  - モックやセットアップファイルを含むディレクトリをテスト対象から除外

## ベストプラクティス

1. **テスト環境のセットアップ**
   - セットアップファイルは`src/__tests__/setup`に配置
   - グローバルな設定は`jest.setup.ts`で行う
   - カスタム型定義は`src/types`に配置

2. **テストファイルの構成**
   - テストヘルパーは`src/__tests__/fixtures`に配置
   - モックは`src/__tests__/mocks`に配置
   - 各コンポーネントのテストは対応するディレクトリ内の`__tests__`フォルダに配置

3. **TypeScript設定**
   ```json
   {
     "compilerOptions": {
       "types": ["@testing-library/jest-dom"]
     }
   }
   ```

4. **Jest設定**
   ```javascript
   module.exports = {
     setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup/jest.setup.ts'],
     testPathIgnorePatterns: [
       '/node_modules/',
       '/src/__tests__/setup/',
       '/src/__tests__/fixtures/',
       '/src/__tests__/mocks/'
     ]
   }
   ```

## 注意点

1. テストライブラリの型定義が正しくインポートされているか確認
2. セットアップファイルが正しく設定されているか確認
3. テスト対象外のファイルが誤ってテストスイートとして実行されていないか確認
