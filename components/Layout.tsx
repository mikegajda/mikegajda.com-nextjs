import React from 'react';
import { MetaProps } from '../types/layout';
import Head from './Head';
import Navigation from './Navigation';
import ThemeSwitch from './ThemeSwitch';

type LayoutProps = {
  children: React.ReactNode;
  customMeta?: MetaProps;
};

export const WEBSITE_HOST_URL = 'https://nextjs-typescript-mdx-blog.vercel.app';

const Layout = ({ children, customMeta }: LayoutProps): JSX.Element => {
  return (
    <>
      <Head customMeta={customMeta} />
      <header className="bg-emerald-400 mb-2">
        <div className="max-w-6xl mx-auto p-2 md:px-4">
          <div className="flex items-center justify-between py-1">
            <Navigation />
            <ThemeSwitch />
          </div>
        </div>
      </header>
      <main>
        <div className="mx-auto">{children}</div>
      </main>
      <footer className="max-w-6xl mx-auto p-2 py-4 md:px-4">
        <div className="">
          Built by{' '}
          <a
            className="text-gray-900 dark:text-white"
            href="https://twitter.com/mikegajda"
            target="_blank"
            rel="noreferrer"
          >
            Mike Gajda
          </a>
        </div>
      </footer>
    </>
  );
};

export default Layout;
