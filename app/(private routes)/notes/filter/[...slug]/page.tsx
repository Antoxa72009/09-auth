import NotesClient from "./Notes.client";
import { Metadata } from "next";
import { fetchServerNotes } from "@/lib/api/serverApi";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0];

  return {
    title: `Notes: ${tag}`,
    description: `${tag} notes to management`,
    openGraph: {
      title: `Notes: ${tag}`,
      description: `${tag} notes to management`,
      url: `https://notehub.com/notes/filter/${tag}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1374,
          height: 916,
          alt: "NoteHub logo",
        },
      ],
    },
  };
}

export default async function NotesByCategory({ params }: Props) {
  const { slug } = await params;
  const tag = slug[0] === "All" ? undefined : slug[0];
  const queryClient = new QueryClient();
  const initialData = await fetchServerNotes("", 1, tag);

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1, tag],
    queryFn: () => fetchServerNotes("", 1, tag),
  });

  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient initialData={initialData} tag={tag} />
      </HydrationBoundary>
    </main>
  );
}