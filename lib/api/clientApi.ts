import { api } from './api';
import { User } from '@/lib/store/authStore';

export async function loginUser(email: string, password: string): Promise<User> {
  const { data } = await api.post('/auth/login', { email, password });
  return data;
}

export async function registerUser(email: string, password: string): Promise<User> {
  const { data } = await api.post('/auth/register', { email, password });
  return data;
}

export async function logoutUser(): Promise<void> {
  await api.post('/auth/logout');
}

export async function fetchSession(): Promise<User | null> {
  try {
    const { data } = await api.get('/auth/session');
    return data || null;
  } catch {
    return null;
  }
}

export async function fetchUserMe(): Promise<User> {
  const { data } = await api.get('/users/me');
  return data;
}

export async function updateUserMe(user: Partial<User>): Promise<User> {
  const { data } = await api.patch('/users/me', user);
  return data;
}

export async function fetchNotes(params?: { search?: string; page?: number; tag?: string }) {
  const { data } = await api.get('/notes', { params });
  return data;
}

export async function fetchNoteById(id: string) {
  const { data } = await api.get(`/notes/${id}`);
  return data;
}

export async function createNote(note: { title: string; content: string; tag: string }) {
  const { data } = await api.post('/notes', note);
  return data;
}

export async function deleteNote(id: string) {
  await api.delete(`/notes/${id}`);
}