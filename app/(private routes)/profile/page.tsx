'use client';

import Image from 'next/image';
import css from './ProfilePage.module.css';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider/AuthProvider';

export default function ProfilePage() {
  const { user, loading } = useAuth();

  // Якщо дані завантажуються, показуємо лоадер
  if (loading) {
    return <p>Loading...</p>;
  }

  // Якщо користувач не авторизований, не показуємо нічого (редірект відбудеться в AuthProvider)
  if (!user) {
    return null;
  }

  // Якщо дані користувача є, рендеримо сторінку
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar || '/default-avatar.png'}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>
            Username: {user.username || user.email}
          </p>
          <p>
            Email: {user.email}
          </p>
        </div>
      </div>
    </main>
  );
}