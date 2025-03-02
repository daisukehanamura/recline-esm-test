import { render, screen } from '../../../__tests__/fixtures/test-utils';
import { server } from '../../../__tests__/setup/mock-server';
import { http, HttpResponse } from 'msw';
import userEvent from '@testing-library/user-event';
import { Profile } from '../Profile';

describe('Profile Component', () => {
  it('プロフィール情報が正しく表示される', async () => {
    render(<Profile />);
    
    // 名前とメールアドレスが表示されることを確認
    const userName = await screen.findByText('Test User');
    const userEmail = await screen.findByText('test@example.com');
    
    expect(userName).toBeInTheDocument();
    expect(userEmail).toBeInTheDocument();
  });

  it('ローディング状態が正しく表示される', () => {
    render(<Profile />);
    
    // 初期状態でローディングが表示されることを確認
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('エラー状態が正しく表示される', async () => {
    // MSWのエラーハンドラーをオーバーライド
    server.use(
      http.get('/api/profile', () => {
        return new HttpResponse(null, {
          status: 500,
          statusText: 'Internal Server Error',
        });
      })
    );

    render(<Profile />);
    
    // エラーメッセージが表示されることを確認
    const errorMessage = await screen.findByText(/error/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('プロフィール更新が正しく動作する', async () => {
    const user = userEvent.setup();
    render(<Profile />);

    // 初期のプロフィール情報が表示されるのを待つ
    await screen.findByText('Test User');

    // 編集ボタンをクリック
    const editButton = await screen.findByRole('button', { name: /edit/i });
    await user.click(editButton);

    // 名前を更新
    const nameInput = await screen.findByLabelText(/name:/i);
    await user.clear(nameInput);
    await user.type(nameInput, 'Updated Name');

    // 保存ボタンをクリック
    const saveButton = await screen.findByRole('button', { name: /save/i });
    await user.click(saveButton);

    // 更新された名前が表示されることを確認
    const updatedName = await screen.findByText('Updated Name');
    expect(updatedName).toBeInTheDocument();
  });
});
