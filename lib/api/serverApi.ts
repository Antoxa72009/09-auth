import axios, { AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// Тип відповіді сесії
interface SessionData {
  accessToken?: string;
  refreshToken?: string;
}

export async function checkServerSession(): Promise<AxiosResponse<SessionData>> {
  try {
    const response = await api.get<SessionData>('/auth/session');
    return response;
  } catch (err) {
    console.error('Session check failed:', err);
    // Повертаємо "порожній" об’єкт заголовків, щоб не ламати middleware
    return {
      data: {},
      status: 401,
      statusText: 'Unauthorized',
      headers: {},
      config: {},
    } as AxiosResponse<SessionData>;
  }
}

// Існуючі функції
export async function fetchNotes(
  { page, search, tag }: { page: number; search: string; tag: string },
  token: string | null
) {
  const { data } = await api.get('/notes', {
    params: { page, search, tag },
    headers: token ? { Cookie: `token=${token}` } : undefined,
  });
  return data;
}

export async function fetchNoteById(id: string, token: string | null) {
  const { data } = await api.get(`/notes/${id}`, {
    headers: token ? { Cookie: `token=${token}` } : undefined,
  });
  return data;
}

export async function fetchUserMe(token: string | null) {
  if (!token) throw new Error('Missing token');
  const { data } = await api.get('/users/me', {
    headers: { Cookie: `token=${token}` },
  });
  return data;
}

export async function createNote(
  note: { title: string; content: string; tag: string },
  token: string | null
) {
  if (!token) throw new Error('Missing token');
  const { data } = await api.post('/notes', note, {
    headers: { Cookie: `token=${token}` },
  });
  return data;
}