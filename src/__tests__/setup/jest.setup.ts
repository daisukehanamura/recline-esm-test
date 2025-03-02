import '@testing-library/jest-dom';

// グローバル設定をここに追加
const noop = () => {};
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });
