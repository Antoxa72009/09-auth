import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/serverApi";
import NotePreview from "./NotePreview.client";
import Modal from "@/components/Modal/Modal";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

interface NotePreviewPageProps {
  params: Record<string, string>;
}

export default async function NotePreviewPage({ params }: NotePreviewPageProps) {
  const queryClient = new QueryClient();

  const cookieStore = await cookies();
  const token = cookieStore.get?.("token")?.value ?? null;

  const noteId = params.id;
  if (!noteId) notFound();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["note", noteId],
      queryFn: () => fetchNoteById(noteId, token),
    });
  } catch {
    notFound();
  }

  return (
    <Modal>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotePreview id={noteId} />
      </HydrationBoundary>
    </Modal>
  );
}