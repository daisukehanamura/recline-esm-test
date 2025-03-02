import { setupServer } from 'msw/node';
import { handlers } from '../mocks/handlers';

// MSWサーバーのセットアップ
export const server = setupServer(...handlers);
