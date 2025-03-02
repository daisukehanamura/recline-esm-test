import '@testing-library/jest-dom';
import { server } from './mock-server';

// MSWサーバーの設定
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// グローバルなテストタイムアウトの設定
jest.setTimeout(10000);

// コンソールエラーの抑制（必要に応じて）
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
