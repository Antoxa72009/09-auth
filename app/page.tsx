import React from 'react';
import Link from 'next/link';
import css from './Home.module.css';

const HomePage = () => {
  return (
    <div className={css.container}>
      <h1 className={css.title}>Welcome to NoteHub!</h1>
      <p className={css.text}>
        This is a place where you can create and manage your notes.
      </p>
      <Link href="/notes/filter/all">
        <button className={css.button}>View all notes</button>
      </Link>
    </div>
  );
};

export default HomePage;