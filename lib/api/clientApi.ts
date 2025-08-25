import { User } from "@/types/user";
import { nextServer } from "./api";
import { NewNote, Note } from "@/types/note";

export interface SignUpRequest {
  email: string;
  password: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface CheckSessionRequest {
  success: boolean;
}

export interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

export interface UpdateUserRequest {
  username: string;
}

export const register = async (data: SignUpRequest) => {
  const response = await nextServer.post<User>("/auth/register", data);
  return response.data;
};

export const login = async ({ email, password }: SignInRequest) => {
  const response = await nextServer.post<User>("/auth/login", { email, password });
  return response.data;
};

export const fetchSession = async () => {
  try {
    const response = await nextServer.get<User>("/auth/session");
    return response.data;
  } catch {
    return null;
  }
};

export const getMe = async () => {
  const response = await nextServer.get<User>("/users/me");
  return response.data;
};

export const logoutUser = async (): Promise<void> => {
  const response = await nextServer.post("/auth/logout");
  return response.data;
};

export const updateMe = async (body: UpdateUserRequest) => {
  const response = await nextServer.patch<User>("/users/me", body);
  return response.data;
};

export async function fetchNotes(search: string, page: number, tag?: string) {
  try {
    const response = await nextServer.get<NotesHttpResponse>("/notes", {
      params: {
        ...(search !== "" && { search }),
        page,
        perPage: 12,
        ...(tag && { tag }),
      },
    });
    return response.data;
  } catch {
    throw new Error("Fetch tasks failed");
  }
}

export async function createNote(newNote: NewNote): Promise<Note> {
  try {
    const response = await nextServer.post<Note>("/notes", newNote);
    return response.data;
  } catch {
    throw new Error("Create task failed");
  }
}

export async function deleteNote(noteId: string) {
  try {
    const response = await nextServer.delete<Note>(`/notes/${noteId}`);
    return response.data;
  } catch {
    throw new Error("Delete task failed");
  }
}

export async function fetchNoteById(noteId: string) {
  try {
    const response = await nextServer.get<Note>(`/notes/${noteId}`);
    return response.data;
  } catch {
    throw new Error("Could not fetch note details.");
  }
}