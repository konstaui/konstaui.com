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
      <div className="flex mb-4 bg-black bg-opacity-[0.075] rounded p-1 space-x-1">
        <Link href="/react">
          <a
            className={`flex justify-center w-full items-center rounded p-1 ${
              root === 'react'
                ? 'bg-white pointer-events-none shadow'
                : 'hover:bg-white duration-200 grayscale opacity-50'
            }`}
          >
            <img
              className="w-6 h-6 mr-2"
              alt="React"
              src="/images/home/home-logos/react.svg"
            />
            <span className="font-medium text-black">React</span>
          </a>
        </Link>
        <Link href="/vue">
          <a
            className={`flex justify-center w-full items-center rounded p-1 ${
              root === 'vue'
                ? 'bg-white pointer-events-none shadow'
                : 'hover:bg-white duration-200 grayscale opacity-50'
            }`}
          >
            <img
              className="w-6 h-6 mr-2"
              alt="Vue"
              src="/images/home/home-logos/vue.svg"
            />
            <span className="font-medium text-black">Vue.js</span>
          </a>
        </Link>
      </div>
      <div className="space-y-4">
        {links.map((block, index) => (
          <div key={index}>
            {block.title && (
              <div className="font-semibold text-base mb-4">{block.title}</div>
            )}
            {block.links && (
              <ul className="space-y-1">
                {block.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href={getLinkHref(link, root)}>
                      <a
                        className={` block py-1 px-2 rounded font-medium duration-100 ${
                          isActive(getLinkHref(link, root))
                            ? `text-primary bg-primary-light bg-opacity-10`
                            : 'text-gray-500 hover:text-primary hover:bg-primary-light hover:bg-opacity-10'
                        }`}
                      >
                        {getLinkTitle(link)}
                      </a>
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
