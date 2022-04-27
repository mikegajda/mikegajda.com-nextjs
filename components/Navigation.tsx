import Link from 'next/link';
import React from 'react';

const Navigation = (): JSX.Element => {
  const commonHeaderStyles =
    'text-gray-800 dark:text-gray-800 dark:text-gray-800 dark:hover:bg-emerald-400 dark:decoration-emerald-400 hover:text-gray-900 dark:hover:text-gray-900 hover:underline underline-offset-8';
  return (
    <nav>
      <Link href="/">
        <a className={`${commonHeaderStyles} font-bold`}>Mike Gajda</a>
      </Link>
      <Link href="/posts/0">
        <a className={`${commonHeaderStyles} px-6 py-2`}>Posts</a>
      </Link>
      <Link href="/about">
        <a className={`${commonHeaderStyles} px-6 py-2`}>About</a>
      </Link>
    </nav>
  );
};

export default Navigation;
