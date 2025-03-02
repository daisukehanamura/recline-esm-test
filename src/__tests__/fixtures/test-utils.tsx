import React from 'react';
import { render, RenderOptions } from '@testing-library/react';

const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => {
  return render(ui, { wrapper: AllTheProviders, ...options });
};

export * from '@testing-library/react';
export { customRender as render };
