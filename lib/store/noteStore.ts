import { create } from 'zustand';
import { type Note, type NoteTag } from '@/types/note';

interface NoteStore {
  notes: Note[];
  currentNote: Note | null;
  tags: NoteTag[];
  addNote: (note: Note) => void;
  setNotes: (notes: Note[]) => void;
  deleteNote: (id: string) => void;
  setTags: (tags: NoteTag[]) => void;
  setCurrentNote: (note: Note) => void;
}

export const useNoteStore = create<NoteStore>((set) => ({
  notes: [],
  currentNote: null,
  tags: ['All', 'Work', 'Personal', 'Shopping', 'Meeting', 'Todo'],
  addNote: (note) => set((state) => ({ notes: [...state.notes, note] })),
  setNotes: (notes) => set({ notes }),
  deleteNote: (id) =>
    set((state) => ({ notes: state.notes.filter((note) => note.id !== id) })),
  setTags: (tags) => set({ tags }),
  setCurrentNote: (note) => set({ currentNote: note }),
}));