import Link from 'next/link';
import { useEffect, useState } from 'react';
import { slugify } from '../shared/slugify';

const getLinkHref = (link, root) => {
  if (typeof link === 'string') return `/${root}/${slugify(link)}`;
  return link.href || `/${root}/${slugify(link.title)}`;
};
const getLinkTitle = (link) => {
  if (typeof link === 'string') return link;
  return link.title;
};

export const SidebarMenu = (props) => {
  const { links, root } = props;
  const [documentPath, setDocumentPath] = useState('');

  const isActive = (href) => documentPath && documentPath === href;

  useEffect(() => {
    setDocumentPath(document.location.pathname);
  }, []);

  return (
    <>
      <div className="mb-4 flex space-x-1 rounded bg-black/[0.075] p-1">
        <Link
          href="/react"
          className={`flex w-full items-center justify-center rounded p-1 ${
            root === 'react'
              ? 'dark:bg-dark-light pointer-events-none bg-white shadow'
              : 'dark:hover:bg-dark-light opacity-50 grayscale duration-200 hover:bg-white dark:hover:opacity-100'
          }`}
        >
          <img
            className="mr-1 h-5 w-5"
            alt="React"
            src="/images/home/home-logos/react.svg"
          />
          <span className="font-medium text-black dark:text-white">React</span>
        </Link>
        <Link
          href="/vue"
          className={`flex w-full items-center justify-center rounded p-1 ${
            root === 'vue'
              ? 'dark:bg-dark-light pointer-events-none bg-white shadow'
              : 'dark:hover:bg-dark-light opacity-50 grayscale duration-200 hover:bg-white dark:hover:opacity-100'
          }`}
        >
          <img
            className="mr-1 h-5 w-5"
            alt="Vue"
            src="/images/home/home-logos/vue.svg"
          />
          <span className="font-medium text-black dark:text-white">Vue.js</span>
        </Link>
        <Link
          href="/svelte"
          className={`flex w-full items-center justify-center rounded p-1 ${
            root === 'svelte'
              ? 'dark:bg-dark-light pointer-events-none bg-white shadow'
              : 'dark:hover:bg-dark-light opacity-50 grayscale duration-200 hover:bg-white dark:hover:opacity-100'
          }`}
        >
          <img
            className="mr-1 h-5 w-5"
            alt="Vue"
            src="/images/home/home-logos/svelte.svg"
          />
          <span className="font-medium text-black dark:text-white">Svelte</span>
        </Link>
      </div>
      <div className="space-y-4">
        {links.map((block, index) => (
          <div key={index}>
            {block.title && (
              <div className="mb-4 text-base font-semibold">{block.title}</div>
            )}
            {block.links && (
              <ul className="space-y-1">
                {block.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={getLinkHref(link, root)}
                      className={`block rounded px-2 py-1 font-medium duration-100 ${
                        isActive(getLinkHref(link, root))
                          ? `bg-primary-light/10 text-primary`
                          : 'hover:bg-primary-light/10 hover:text-primary dark:text-dark-text text-gray-500'
                      }`}
                    >
                      {getLinkTitle(link)}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </>
  );
};
