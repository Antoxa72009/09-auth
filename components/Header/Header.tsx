import Link from 'next/link';
import css from './Header.module.css';
import AuthNavigation from '../AuthNavigation/AuthNavigation';

export default function Header() {
  return (
    <header className={css.header}>
      <nav className={css.navigation}>
        <div className={css.logoWrapper}>
          <Link href="/" className={css.logoLink}>
            <p>NoteHub</p>
          </Link>
        </div>
        <ul className={css.navigationList}>
          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
}