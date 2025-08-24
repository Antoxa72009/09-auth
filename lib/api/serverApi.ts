import type { AxiosResponse } from "axios";
import { nextServer } from "./api";
import { cookies } from "next/headers";

interface SessionData {
  accessToken?: string;
  refreshToken?: string;
}

export async function checkSession(): Promise<AxiosResponse<SessionData>> {
  try {
    return await nextServer.get<SessionData>("/auth/session");
  } catch (err) {
    console.error("Session check failed:", err);
    return {
      data: {},
      status: 401,
      statusText: "Unauthorized",
      headers: {},
      config: {},
    } as AxiosResponse<SessionData>;
  }
}

export async function fetchNotes(
  { page, search, tag }: { page: number; search: string; tag: string },
  token: string | null
) {
  const { data } = await nextServer.get("/notes", {
    params: { page, search, tag },
    headers: token ? { Cookie: `token=${token}` } : undefined,
  });
  return data;
}

export async function fetchNoteById(id: string, token: string | null) {
  const { data } = await nextServer.get(`/notes/${id}`, {
    headers: token ? { Cookie: `token=${token}` } : undefined,
  });
  return data;
}

// 🔹 нова серверна функція для профілю
export async function getServerMe() {
  const cookieStore = await cookies();

  const { data } = await nextServer.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
}

export async function createNote(
  note: { title: string; content: string; tag: string },
  token: string | null
) {
  if (!token) throw new Error("Missing token");
  const { data } = await nextServer.post("/notes", note, {
    headers: { Cookie: `token=${token}` },
  });
  return data;
}