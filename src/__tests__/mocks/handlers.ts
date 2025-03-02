import { http, HttpResponse } from 'msw';

// プロフィールデータの型定義
interface Profile {
  id: number;
  name: string;
  email: string;
  [key: string]: any; // 追加のプロパティを許可
}

// APIレスポンスのモックデータ
const mockProfile: Profile = {
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
};

// MSWのリクエストハンドラー
export const handlers = [
  // GETリクエストのハンドラー
  http.get('/api/profile', () => {
    return HttpResponse.json(mockProfile);
  }),

  // POSTリクエストのハンドラー
  http.post('/api/profile', async ({ request }) => {
    const data = await request.json() as Partial<Profile>;
    return HttpResponse.json({
      ...mockProfile,
      ...data,
    } as Profile);
  }),

  // エラーレスポンスのハンドラー例
  http.get('/api/error', () => {
    return new HttpResponse(null, {
      status: 500,
      statusText: 'Internal Server Error',
    });
  }),
];
