'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import NoteList from '@/components/NoteList/NoteList';

interface NotesClientProps {
  dehydratedState?: unknown; // для типізації, якщо буде Hydration
  initialTag: string;
}

export default function NotesClient({ initialTag }: NotesClientProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <NoteList initialTag={initialTag} />
    </QueryClientProvider>
  );
}