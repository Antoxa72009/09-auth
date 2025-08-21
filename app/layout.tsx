import './globals.css';
import { ReactNode } from 'react';
import Header from '@/components/Header/Header';
import { AuthProvider } from '@/components/AuthProvider/AuthProvider';

export const metadata = {
  title: 'NoteHub',
  description: 'Your personal note app',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Header />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}