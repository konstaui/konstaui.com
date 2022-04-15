import Link from 'next/link';
import { useRef } from 'react';
import { Container } from './Container';
import { GithubStats } from './GithubStats';
import { Logo } from './Logo';

const docsLinks = [
  { title: 'Konsta UI React', href: '/react' },
  { title: 'Konsta UI Svelte', href: '/svelte' },
  { title: 'Konsta UI Vue', href: '/vue' },
];

const resourcesLinks = [
  {
    title: 'Discussions',
    href: 'https://github.com/konstaui/konsta/discussions',
  },
  { title: 'GitHub', href: 'https://github.com/konstaui' },
  { title: 'Release Notes', href: '/release-notes' },
  { title: 'Konsta UI on Twitter', href: 'https://twitter.com/konstaui' },
];

const Dropdown = (props) => {
  const { title, links } = props;
  return (
    <div className="group relative hidden sm:block">
      <a
        href="#"
        className="font-medium group-hover:text-primary"
        onClick={(e) => e.preventDefault()}
      >
        {title}
      </a>
      <div className="pointer-events-none absolute left-0 top-full z-50 -ml-4 w-48 overflow-hidden rounded-lg border border-black border-opacity-10 bg-white opacity-0 shadow-lg group-hover:pointer-events-auto group-hover:opacity-100">
        <ul className="text-sm">
          {links.map((link, index) => (
            <li key={index}>
              <Link href={link.href}>
                <a
                  target={link.href.includes('http') ? '_blank' : '_self'}
                  className="block py-2 px-4 hover:bg-primary hover:text-white"
                >
                  {link.title}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const MobileNavList = (props) => {
  const { title, links, hideMenu } = props;
  return (
    <div>
      <div className="px-4 pt-4 pb-2 text-xs font-semibold text-black text-opacity-40">
        {title}
      </div>
      <ul className="">
        {links.map((link, index) => (
          <li key={index}>
            <Link href={link.href}>
              <a
                target={link.href.includes('http') ? '_blank' : '_self'}
                className="block px-4 py-2 text-sm text-black hover:bg-primary hover:text-white"
                onClick={hideMenu}
                onPointerDown={(e) => e.preventDefault()}
              >
                {link.title}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

// eslint-disable-next-line
export const Header = () => {
  const buttonElRef = useRef(null);
  const hideMenu = () => {
    if (document && document.activeElement) document.activeElement.blur();
  };
  const showMenu = () => {
    buttonElRef.current.focus();
  };
  return (
    <header className="sticky top-0 z-50 border-b-[0.5px] border-black border-opacity-10 bg-white bg-opacity-75 backdrop-blur-lg backdrop-saturate-200">
      <Container className="flex h-16 items-center justify-between">
        <div className="flex items-center space-x-6 text-black">
          <Link href="/">
            <a>
              <Logo className="h-12 w-12" />
            </a>
          </Link>
          <Dropdown title="Documentation" links={docsLinks} />
          <Dropdown title="Resources" links={resourcesLinks} />
        </div>
        <div className="group relative ml-8 mr-auto sm:hidden">
          <button
            className="outline-none flex items-center text-black"
            type="button"
            ref={buttonElRef}
            onClick={showMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="pointer-events-none h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <nav className="absolute left-0 top-full z-10 hidden w-48 divide-y divide-black divide-opacity-10 overflow-hidden rounded-lg border border-black border-opacity-10 bg-white shadow-lg group-focus-within:block">
            <MobileNavList
              title="Documentation"
              links={docsLinks}
              hideMenu={hideMenu}
            />
            <MobileNavList
              title="Resources"
              links={resourcesLinks}
              hideMenu={hideMenu}
            />
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <GithubStats showVersion inNavbar />
        </div>
      </Container>
    </header>
  );
};
