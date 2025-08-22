import Link from 'next/link';
import css from './Header.module.css';
import AuthNavigation from '../AuthNavigation/AuthNavigation';

export default function Header() {
  return (
    <header className={css.header}>
      <nav className={css.navigation}>
        <div className={css.navigationWrapper}>
          <Link href="/" className={css.navigationLogo}>
            NoteHub
          </Link>
          <ul className={css.navigationList}>
            <li className={css.navigationItem}>
              <Link href="/notes/filter/all" prefetch={false} className={css.navigationLink}>
                Notes
              </Link>
            </li>
            <AuthNavigation />
          </ul>
        </div>
      </nav>
    </header>
  );
}