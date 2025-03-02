import { render, screen } from '@testing-library/react';
import Profile from '../Profile';

describe('Profile', () => {
  beforeEach(() => {
    // グローバルfetchをモック化
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          id: 1,
          name: 'Test User',
          email: 'test@example.com'
        })
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('renders profile data', async () => {
    render(<Profile />);
    // ローディング状態の確認
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    // データ表示の確認
    const name = await screen.findByText('Test User');
    expect(name).toBeInTheDocument();
    const email = await screen.findByText('test@example.com');
    expect(email).toBeInTheDocument();
  });
});
