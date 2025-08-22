import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/serverApi';
import NotePreview from './NotePreview.client';
import Modal from '@/components/Modal/Modal';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';

interface NotePreviewPageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: NotePreviewPageProps): Promise<Metadata> {
  const { id } = params;
  if (!id) notFound();

  const cookieStore = cookies();
  const cookieHeader = cookieStore.toString();
  const note = await fetchNoteById(id, cookieHeader);
  const url = `https://yourdomain.com/notes/${id}`;

  return {
    title: note.title,
    description: note.content.slice(0, 160),
    openGraph: {
      title: note.title,
      description: note.content.slice(0, 160),
      url,
      images: [
        {
          url: 'https://yourdomain.com/og-image-note.png',
          width: 1200,
          height: 630,
          alt: note.title,
        },
      ],
    },
  };
}

const NotePreviewPage = async ({ params }: NotePreviewPageProps) => {
  const { id } = params;
  if (!id) notFound();

  const queryClient = new QueryClient();
  const cookieHeader = cookies().toString();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id, cookieHeader),
  });

  return (
    <Modal>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotePreview id={id} />
      </HydrationBoundary>
    </Modal>
  );
};

export default NotePreviewPage;