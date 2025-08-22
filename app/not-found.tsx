import React from 'react';
import Link from 'next/link';
import css from './NotFound.module.css';

const NotFoundPage = () => {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404</h1>
      <p className={css.text}>Page not found</p>
      <Link href="/">
        <button className={css.button}>Go back to home</button>
      </Link>
    </div>
  );
};

export default NotFoundPage;