import { fetchUserMe } from '@/lib/api/serverApi';
import { cookies } from 'next/headers';

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value ?? null;

  if (!token) return <div>Please log in to view profile</div>;

  try {
    const user = await fetchUserMe(token);
    return (
      <div>
        <h1>Profile</h1>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
      </div>
    );
  } catch {
    return <div>Failed to load profile.</div>;
  }
}