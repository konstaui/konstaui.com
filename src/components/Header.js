import Link from 'next/link';
import { useRef } from 'react';
import { Container } from './Container';
import { GithubStats } from './GithubStats';
import { Logo } from './Logo';

const docsLinks = [
  { title: 'Tailwind Mobile React', href: '/react' },
  { title: 'Tailwind Mobile Svelte', href: '/svelte' },
  { title: 'Tailwind Mobile Vue', href: '/vue' },
];

const resourcesLinks = [
  {
    title: 'Discussions',
    href: 'https://github.com/tailwind-mobile/tailwind-mobile/discussions',
  },
  { title: 'GitHub', href: 'https://github.com/tailwind-mobile' },
  { title: 'Release Notes', href: '/release-notes' },
];

const Dropdown = (props) => {
  const { title, links } = props;
  return (
    <div className="relative group hidden sm:block">
      <a
        href="#"
        className="group-hover:text-primary font-medium"
        onClick={(e) => e.preventDefault()}
      >
        {title}
      </a>
      <div className="absolute z-50 left-0 -ml-4 top-full bg-white rounded-lg overflow-hidden shadow-lg w-48 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto border border-black border-opacity-10">
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
      <div className="px-4 pt-4 pb-2 font-semibold text-xs text-black text-opacity-40">
        {title}
      </div>
      <ul className="">
        {links.map((link, index) => (
          <li key={index}>
            <Link href={link.href}>
              <a
                target={link.href.includes('http') ? '_blank' : '_self'}
                className="px-4 py-2 block text-sm text-black hover:bg-primary hover:text-white"
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
    <header className="bg-white top-0 border-b-[0.5px] border-black border-opacity-10">
      <Container className="flex items-center justify-between h-20">
        <div className="flex items-center space-x-8 text-black">
          <Link href="/">
            <a>
              <Logo className="w-16 h-16" />
            </a>
          </Link>
          <Dropdown title="Documentation" links={docsLinks} />
          <Dropdown title="Resources" links={resourcesLinks} />
        </div>
        <div className="group sm:hidden ml-8 mr-auto relative">
          <button
            className="flex items-center outline-none text-black"
            type="button"
            ref={buttonElRef}
            onClick={showMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 pointer-events-none"
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
          <nav className="hidden group-focus-within:block absolute overflow-hidden z-10 rounded-lg border border-black border-opacity-10 bg-white shadow-lg left-0 top-full w-48 divide-y divide-black divide-opacity-10">
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
