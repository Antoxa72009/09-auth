'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { Note } from '@/types/note';
import css from './NotesPage.module.css';
import { useRouter } from 'next/navigation';

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const initializeAuth = useAuthStore(state => state.initializeAuth);
  const router = useRouter();

  // Ініціалізація авторизації з localStorage
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/sign-in'); // якщо не авторизований
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    async function fetchNotes() {
      if (!isAuthenticated) return;

      const token = localStorage.getItem('accessToken');
      const res = await fetch('/api/notes', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        setNotes(data);
      } else {
        router.push('/sign-in'); // якщо токен невалідний
      }
    }

    fetchNotes();
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return <p>Access denied. Please log in.</p>;

  return (
    <div className={css.notesList}>
      {notes.map(note => (
        <div key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
}