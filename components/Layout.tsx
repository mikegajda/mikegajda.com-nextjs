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
        <div className="max-w-6xl px-2 md:px-4 mx-auto">
          <div className="flex items-center justify-between py-2">
            <Navigation />
            <ThemeSwitch />
          </div>
        </div>
      </header>
      <main>
        <div className="max-w-6xl md:px-4 mx-auto">{children}</div>
      </main>
      <footer className="py-8">
        <div className="max-w-6xl px-8 mx-auto">
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
