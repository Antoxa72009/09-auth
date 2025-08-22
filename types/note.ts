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