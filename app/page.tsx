import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>Welcome to NoteHub</h1>
      <p>Your personal note-taking app.</p>
      <div style={{ marginTop: '24px' }}>
        <Link href="/sign-in">Sign In</Link> | <Link href="/sign-up">Sign Up</Link>
      </div>
    </div>
  );
}