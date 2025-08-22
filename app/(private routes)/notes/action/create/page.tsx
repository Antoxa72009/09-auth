'use client';

import type { Metadata } from 'next';
import css from './CreateNote.module.css';
import NoteForm from '@/components/NoteForm/NoteForm';
import { useRouter } from 'next/navigation';
import { createNote } from '@/lib/api/clientApi';
import type { Note } from '@/types/note';

export const metadata: Metadata = {
  title: 'Create new note — NoteHub',
  description: 'Create a new note in NoteHub.',
  openGraph: {
    title: 'Create new note — NoteHub',
    description: 'Create a new note in NoteHub.',
    url: 'https://your-vercel-domain.vercel.app/notes/action/create',
    images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
  },
};

export default function CreateNotePage() {
  const router = useRouter();

  const handleSubmit = async (data: Partial<Note>) => {
  try {
    if (!data.title || !data.content || !data.tag) {
      alert('Fill all fields');
      return;
    }
    await createNote({
      title: data.title,
      content: data.content,
      tag: data.tag,
    });
    router.push('/notes/filter/all');
  } catch (err) {
    console.error(err);
    alert('Failed to create note');
  }
};

  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm onSubmit={handleSubmit} submitText="Create" />
      </div>
    </main>
  );
}