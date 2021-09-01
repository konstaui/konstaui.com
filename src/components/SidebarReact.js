import Link from 'next/link';
import { useEffect, useState } from 'react';
import { slugify } from '../shared/slugify';

const sideBar = [
  {
    title: 'Get Started',
    links: [
      { title: 'Introduction', href: '/react' },
      'Kitchen Sink',
      'Installation',
      'Usage',
    ],
  },
  {
    title: 'Tailwind Extensions',
    links: [
      'Colors',
      'Theme Variants',
      'Hairlines',
      'Safe Areas',
      'Touch Ripple',
      'Translucent',
      'Touch Action',
    ],
  },
  {
    title: 'Components',
    links: ['App'],
  },
];

const getLinkHref = (link) => {
  if (typeof link === 'string') return `/react/${slugify(link)}`;
  return link.href || `/react/${slugify(link.title)}`;
};
const getLinkTitle = (link) => {
  if (typeof link === 'string') return link;
  return link.title;
};

export const SidebarReact = () => {
  // const [activeLink, setActiveLink] = useState('');
  const [documentPath, setDocumentPath] = useState('');
  const isActive = (href) => documentPath && documentPath === href;
  useEffect(() => {
    setDocumentPath(document.location.pathname);
  }, []);
  return (
    <div className="space-y-4">
      {sideBar.map((block, index) => (
        <div key={index}>
          {block.title && (
            <div className="font-semibold text-base mb-4">{block.title}</div>
          )}
          {block.links && (
            <ul className="space-y-1">
              {block.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <Link href={getLinkHref(link)}>
                    <a
                      className={` block py-1 px-2 rounded font-medium duration-100 ${
                        isActive(getLinkHref(link))
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
  );
};
