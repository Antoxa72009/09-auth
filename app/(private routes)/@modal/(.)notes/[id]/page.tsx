import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/serverApi";
import NotePreview from "./NotePreview.client";
import Modal from "@/components/Modal/Modal";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

interface NotePreviewPageProps {
  params: { id: string };
}

export default async function NotePreviewPage({ params }: NotePreviewPageProps) {
  const queryClient = new QueryClient();

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value ?? null;

  try {
    await queryClient.prefetchQuery({
      queryKey: ["note", params.id],
      queryFn: () => fetchNoteById(params.id, token),
    });
  } catch {
    notFound();
  }

  return (
    <Modal>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotePreview id={params.id} />
      </HydrationBoundary>
    </Modal>
  );
}