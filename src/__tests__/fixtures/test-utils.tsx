import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import userEvent from '@testing-library/user-event';

// 必要に応じてProviderを追加
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* 例: ThemeProvider, RouterProvider, StoreProvider など
      <ThemeProvider theme={theme}>
        <RouterProvider router={router}>
          <StoreProvider store={store}>
            {children}
          </StoreProvider>
        </RouterProvider>
      </ThemeProvider>
      */}
      {children}
    </>
  );
};

// カスタムレンダラー
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// テストユーティリティ
const setupUserEvent = () => userEvent.setup();

// テスト用ヘルパー関数
const waitForLoadingToFinish = async () => {
  // ローディング状態が終わるのを待つなどの共通処理
};

const createMockProfile = (overrides = {}) => ({
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
  ...overrides,
});

// Testing Library のユーティリティをエクスポート
export * from '@testing-library/react';

// カスタムユーティリティをエクスポート
export {
  customRender as render,
  setupUserEvent,
  waitForLoadingToFinish,
  createMockProfile,
};
