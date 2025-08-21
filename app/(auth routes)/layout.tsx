'use client';

import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>{children}</div>;
}