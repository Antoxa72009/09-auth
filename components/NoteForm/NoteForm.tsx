'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api/clientApi';
import css from './NoteForm.module.css';
import { useRouter } from 'next/navigation';
import type { Note, NoteTag } from '@/types/note';
import { FormEvent, useState } from 'react';

const emptyNote: Partial<Note> = { title: '', content: '', tag: 'Work' as NoteTag };

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [note, setNote] = useState<Partial<Note>>(emptyNote);

  const mutation = useMutation({
    mutationFn: (data: Partial<Note>) => createNote(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      setNote(emptyNote);
      router.push('/notes/filter/all');
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!note.title || !note.content || !note.tag) return alert('Fill all fields');
    mutation.mutate(note);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input name="title" value={note.title} onChange={(e) => setNote({ ...note, title: e.target.value })} />
      <textarea name="content" value={note.content} onChange={(e) => setNote({ ...note, content: e.target.value })} />
      <select name="tag" value={note.tag} onChange={(e) => setNote({ ...note, tag: e.target.value as NoteTag })}>
        <option>Work</option>
        <option>Personal</option>
      </select>
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
}