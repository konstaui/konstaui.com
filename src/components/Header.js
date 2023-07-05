import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import { Container } from './Container';
import { GithubStats } from './GithubStats';
import { Logo } from './Logo';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';

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
  {
    title: 'Sponsors',
    href: '/sponsors',
  },
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
      <div className="pointer-events-none absolute left-0 top-full z-50 -ml-4 w-48 overflow-hidden rounded-lg border border-black border-opacity-10 bg-white opacity-0 shadow-lg group-hover:pointer-events-auto group-hover:opacity-100 dark:bg-dark-light">
        <ul className="text-sm">
          {links.map((link, index) => (
            <li key={index}>
              <Link href={link.href}>
                <a
                  target={link.href.includes('http') ? '_blank' : '_self'}
                  className="block py-2 px-4 hover:bg-primary hover:text-white dark:hover:text-dark"
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
      <div className="px-4 pt-4 pb-2 text-xs font-semibold text-black text-opacity-40 dark:text-dark-text">
        {title}
      </div>
      <ul className="">
        {links.map((link, index) => (
          <li key={index}>
            <Link href={link.href}>
              <a
                target={link.href.includes('http') ? '_blank' : '_self'}
                className="block px-4 py-2 text-sm text-black hover:bg-primary hover:text-white dark:bg-dark-light dark:text-white dark:hover:text-dark"
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

function updateColorTheme() {
  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark', 'changing-theme');
  } else {
    document.documentElement.classList.remove('dark', 'changing-theme');
  }
  window.setTimeout(() => {
    document.documentElement.classList.remove('changing-theme');
  });
}

// eslint-disable-next-line
export const Header = () => {
  const buttonElRef = useRef(null);
  const [setting, setSetting] = useState('system');
  const initial = useRef(true);

  const hideMenu = () => {
    if (document && document.activeElement) document.activeElement.blur();
  };
  const showMenu = () => {
    buttonElRef.current.focus();
  };

  useIsomorphicLayoutEffect(() => {
    const theme = localStorage.theme;
    if (theme === 'light' || theme === 'dark') {
      setSetting(theme);
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (setting === 'system') {
      localStorage.removeItem('theme');
    } else if (setting === 'light' || setting === 'dark') {
      localStorage.theme = setting;
    }
    if (initial.current) {
      initial.current = false;
    } else {
      updateColorTheme();
    }
  }, [setting]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', updateColorTheme);

    function onStorage() {
      updateColorTheme();
      const theme = localStorage.theme;
      if (theme === 'light' || theme === 'dark') {
        setSetting(theme);
      } else {
        setSetting('system');
      }
    }
    window.addEventListener('storage', onStorage);
    return () => {
      mediaQuery.removeEventListener('change', updateColorTheme);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b-[0.5px] border-black border-opacity-10 bg-white bg-opacity-75 backdrop-blur-lg backdrop-saturate-200 dark:bg-dark dark:border-dark-light dark:bg-opacity-75 dark:backdrop-blur-lg dark:backdrop-saturate-200">
      <Container className="flex h-16 items-center justify-between ">
        <div className="flex items-center space-x-6 text-black dark:text-white">
          <Link href="/">
            <a>
              <Logo className="h-12 w-12" />
            </a>
          </Link>
          <Dropdown title="Documentation" links={docsLinks}/>
          <Dropdown title="Resources" links={resourcesLinks} />
        </div>
        <div className="group relative ml-8 mr-auto sm:hidden dark:bg-dark ">
          <button
            className="flex items-center text-black outline-none dark:text-white "
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
          <nav className="absolute left-0 top-full z-10 hidden w-48 divide-y divide-black divide-opacity-10 overflow-hidden rounded-lg border border-black border-opacity-10 bg-white shadow-lg group-focus-within:block dark:bg-dark-light" >
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
          <div className="group relative">
            <div className="flex h-7 cursor-pointer items-center rounded-md px-3 text-sm font-medium text-primary hover:bg-primary hover:text-white">
              <svg
                className="h-6 w-6 dark:hidden"
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
                fill="currentColor"
              >
                <path d="M480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM80-440q-17 0-28.5-11.5T40-480q0-17 11.5-28.5T80-520h80q17 0 28.5 11.5T200-480q0 17-11.5 28.5T160-440H80Zm720 0q-17 0-28.5-11.5T760-480q0-17 11.5-28.5T800-520h80q17 0 28.5 11.5T920-480q0 17-11.5 28.5T880-440h-80ZM480-760q-17 0-28.5-11.5T440-800v-80q0-17 11.5-28.5T480-920q17 0 28.5 11.5T520-880v80q0 17-11.5 28.5T480-760Zm0 720q-17 0-28.5-11.5T440-80v-80q0-17 11.5-28.5T480-200q17 0 28.5 11.5T520-160v80q0 17-11.5 28.5T480-40ZM226-678l-43-42q-12-11-11.5-28t11.5-29q12-12 29-12t28 12l42 43q11 12 11 28t-11 28q-11 12-27.5 11.5T226-678Zm494 495-42-43q-11-12-11-28.5t11-27.5q11-12 27.5-11.5T734-282l43 42q12 11 11.5 28T777-183q-12 12-29 12t-28-12Zm-42-495q-12-11-11.5-27.5T678-734l42-43q11-12 28-11.5t29 11.5q12 12 12 29t-12 28l-43 42q-12 11-28 11t-28-11ZM183-183q-12-12-12-29t12-28l43-42q12-11 28.5-11t27.5 11q12 11 11.5 27.5T282-226l-42 43q-11 12-28 11.5T183-183Z" />
              </svg>
              <svg
                className="hidden h-6 w-6 dark:block"
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
                fill="currentColor"
              >
                <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Z" />
              </svg>
            </div>
            <ul className="absolute right-0 top-full hidden space-y-1 whitespace-nowrap rounded-xl bg-surface-3 px-3 py-4 text-sm group-hover:block">
              <li className='group'>
                <button
                  type="button"
                  onClick={() => setSetting('light')}
                  className="flex w-full items-center space-x-3 rounded-md px-3 py-1 font-medium leading-6 text-primary hover:bg-primary hover:text-white hover:no-underline"
                >
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                    fill="currentColor"
                  >
                    <path d="M480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM80-440q-17 0-28.5-11.5T40-480q0-17 11.5-28.5T80-520h80q17 0 28.5 11.5T200-480q0 17-11.5 28.5T160-440H80Zm720 0q-17 0-28.5-11.5T760-480q0-17 11.5-28.5T800-520h80q17 0 28.5 11.5T920-480q0 17-11.5 28.5T880-440h-80ZM480-760q-17 0-28.5-11.5T440-800v-80q0-17 11.5-28.5T480-920q17 0 28.5 11.5T520-880v80q0 17-11.5 28.5T480-760Zm0 720q-17 0-28.5-11.5T440-80v-80q0-17 11.5-28.5T480-200q17 0 28.5 11.5T520-160v80q0 17-11.5 28.5T480-40ZM226-678l-43-42q-12-11-11.5-28t11.5-29q12-12 29-12t28 12l42 43q11 12 11 28t-11 28q-11 12-27.5 11.5T226-678Zm494 495-42-43q-11-12-11-28.5t11-27.5q11-12 27.5-11.5T734-282l43 42q12 11 11.5 28T777-183q-12 12-29 12t-28-12Zm-42-495q-12-11-11.5-27.5T678-734l42-43q11-12 28-11.5t29 11.5q12 12 12 29t-12 28l-43 42q-12 11-28 11t-28-11ZM183-183q-12-12-12-29t12-28l43-42q12-11 28.5-11t27.5 11q12 11 11.5 27.5T282-226l-42 43q-11 12-28 11.5T183-183Z" />
                  </svg>
                  <span className= " text-black dark:text-black group-hover:text-white">Light</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setSetting('dark')}
                  className="flex w-full items-center space-x-3 rounded-md px-3 py-1 font-medium leading-6 text-primary hover:bg-primary  hover:text-white hover:no-underline"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                  >
                    <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Z" />
                  </svg>
                  <span className='text-black hover:text-white dark:text-white'>Dark</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setSetting('system')}
                  className="flex w-full items-center space-x-3 rounded-md px-3 py-1 font-medium leading-6 text-primary hover:bg-primary hover:text-white hover:no-underline"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                  >
                    <path d="M80-160v-120h80v-440q0-33 23.5-56.5T240-800h600v80H240v440h240v120H80Zm520 0q-17 0-28.5-11.5T560-200v-400q0-17 11.5-28.5T600-640h240q17 0 28.5 11.5T880-600v400q0 17-11.5 28.5T840-160H600Zm40-120h160v-280H640v280Z" />
                  </svg>
                  <span className='text-black hover:text-white dark:text-white'>System</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </header>
  );
};
