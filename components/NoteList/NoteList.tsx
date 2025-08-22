'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/clientApi';
import NotePreview from '@/app/(private routes)/@modal/(.)notes/[id]/NotePreview.client';
import { useState } from 'react';
import type { Note } from '@/types/note';

interface NotesListProps {
  initialTag: string;
}

export default function NotesList({ initialTag }: NotesListProps) {
  const [tag] = useState(initialTag);
  const { data, isLoading } = useQuery<{ notes: Note[] }>({
    queryKey: ['notes', 1, '', tag],
    queryFn: () => fetchNotes({ page: 1, search: '', tag }),
  });

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No notes found</div>;

  return (
    <div>
      {data.notes.map((note) => (
        <NotePreview key={note.id} id={note.id} />
      ))}
    </div>
  );
}