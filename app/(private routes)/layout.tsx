import { ReactNode } from 'react';

export const metadata = {
  title: 'Profile Page',
  description: 'User profile page for NoteHub.',
};

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}