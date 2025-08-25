export type NoteTag =
  | 'All'
  | 'Work'
  | 'Personal'
  | 'Shopping'
  | 'Meeting'
  | 'Todo';

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
}

export interface NewNote {
  content: string;
  tag: string;
  title: string;
  createdAt?: string;
  updatedAt?: string;
}