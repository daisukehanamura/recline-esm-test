# TypeScript開発Tips

## ESModules関連の設定

### package.jsonの設定
- `"type": "module"` を追加して、ESModulesを有効にする
```json
{
  "type": "module"
}
```

### TypeScriptプロジェクトでのESModules使用のポイント

1. **モジュールインポートの注意点**
   - `.js`拡張子を明示的に指定する必要がある場合がある
   - TypeScriptファイルでも、importパスには`.js`を使用
   ```typescript
   // 正しい例
   import { something } from './module.js';
   // 間違った例
   import { something } from './module';
   ```

2. **tsconfig.jsonの設定**
   ```json
   {
     "compilerOptions": {
       "module": "ESNext",    // ESモジュールを使用
       "moduleResolution": "node",  // モジュール解決方法
       "esModuleInterop": true     // CommonJSモジュールとの相互運用性を確保
     }
   }
   ```

3. **Node.js実行環境での注意点**
   - `ts-node`を使用する場合は、`--esm`フラグを指定
   - `package.json`のスクリプトでは`ts-node/esm`ローダーを使用
   - ESモジュールでは`__dirname`や`__filename`が未定義
   ```typescript
   // 代替手段として以下のように実装
   import { fileURLToPath } from 'url';
   import path from 'path';
   
   const __filename = fileURLToPath(import.meta.url);
   const __dirname = path.dirname(__filename);
   ```

4. **実行時の警告について**
   - `ExperimentalWarning: Custom ESM Loaders`の警告は、現在の実験的機能の使用によるもの
   - 本番環境では`node --no-warnings`フラグで警告を抑制することも可能

## トラブルシューティング

1. **React + Express開発時の注意点**
   - クライアント（React）は3000番ポートで起動
   - サーバー（Express）は3001番ポートで起動
   - 空白ページが表示される場合の確認事項：
     1. ブラウザの開発者ツールでネットワークタブを確認（APIリクエストのステータス）
     2. コンソールタブでエラーメッセージを確認
     3. `npm start`で両方のサーバーが正常に起動しているか確認
     4. サーバーサイドの`cors`設定が正しいか確認

2. **よくあるエラー**
   - `Cannot use import statement outside a module`
     - 原因：package.jsonに`"type": "module"`が設定されていない
     - 解決：package.jsonに設定を追加

2. **デバッグ時のTips**
   - ソースマップを有効にして、TypeScriptのデバッグを容易に
   - VSCodeのデバッグ設定で`"sourceMap": true`を設定

3. **パフォーマンス最適化**
   - 開発時は`ts-node`の`--transpileOnly`オプションでコンパイル時間を短縮
   - 本番ビルドでは事前コンパイルを推奨
