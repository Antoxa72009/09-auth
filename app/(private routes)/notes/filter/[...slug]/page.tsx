import { dehydrate, QueryClient } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/serverApi';
import NotesClient from './Notes.client';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import { capitalize } from '@/lib/utils';

interface NotesPageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: NotesPageProps) {
  const { slug } = await params;
  const raw = slug?.[0] ?? 'All';

  return {
    title: `Notes - ${capitalize(raw)}`,
  };
}

export default async function NotesPage({ params }: NotesPageProps) {
  const { slug } = await params; // <-- await тут
  if (!slug || slug.length !== 1) notFound();

  const tag = slug[0];
  const queryClient = new QueryClient();

  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value ?? null;

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', tag],
    queryFn: () => fetchNotes({ page: 1, search: '', tag }, token),
  });

  return <NotesClient dehydratedState={dehydrate(queryClient)} initialTag={tag} />;
}