import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NoteDetails from './NoteDetails.client';
import { fetchNoteById } from '@/lib/api/serverApi';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';

interface NotesPageProps {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: NotesPageProps): Promise<Metadata> {
  const { id } = params;
  if (!id) notFound();

  const note = await fetchNoteById(id);
  if (!note) notFound();

  const url = `https://yourdomain.com/notes/${id}`;
  const description = note.content?.slice(0, 150) || 'Note details in NoteHub.';

  return {
    title: `${note.title} — NoteHub`,
    description,
    openGraph: {
      title: `${note.title} — NoteHub`,
      description,
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

export default async function NoteDetailsRoute({ params }: NotesPageProps) {
  const { id } = params;
  if (!id) notFound();

  const queryClient = new QueryClient();
  const cookieStore = cookies();
  const cookieHeader = cookieStore.toString();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id, cookieHeader),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetails id={id} />
    </HydrationBoundary>
  );
}