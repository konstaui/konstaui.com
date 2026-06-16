import Link from 'next/link';
import { useLayoutEffect, useRef, useState } from 'react';
import { Container } from './Container';
import { ThemeSwitch } from './ThemeSwitch';
import { GithubStats } from './GithubStats';
import { Logo } from './Logo';
import PaneFlowBanner from './PaneFlowBanner';
import TogglesBanner from './TogglesBanner';
import SPHQBanner from './SPHQBanner';
import CladdBanner from './CladdBanner';
import UserExperiencedModal from './UserExperiencedModal';
import UserExperiencedPopover from './UserExperiencedPopover';

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
        className="group-hover:text-primary font-medium"
        onClick={(e) => e.preventDefault()}
      >
        {title}
      </a>
      <div className="dark:bg-dark-light pointer-events-none absolute top-full left-0 z-50 -ml-4 w-48 overflow-hidden rounded-lg border border-black/10 bg-white opacity-0 shadow-lg group-hover:pointer-events-auto group-hover:opacity-100">
        <ul className="text-sm">
          {links.map((link, index) => (
            <li key={index}>
              <Link
                href={link.href}
                target={link.href.includes('http') ? '_blank' : '_self'}
                className="hover:bg-primary dark:hover:text-dark block px-4 py-2 hover:text-white"
              >
                {link.title}
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
      <div className="text-opacity-40 dark:text-dark-text px-4 pt-4 pb-2 text-xs font-semibold text-black">
        {title}
      </div>
      <ul className="">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              target={link.href.includes('http') ? '_blank' : '_self'}
              className="hover:bg-primary dark:bg-dark-light dark:hover:text-dark block px-4 py-2 text-sm text-black hover:text-white dark:text-white"
              onClick={hideMenu}
              onPointerDown={(e) => e.preventDefault()}
            >
              {link.title}
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

  const [showBanner, setShowBanner] = useState(null);
  const [uxdOpen, setUxdOpen] = useState(false);

  useLayoutEffect(() => {
    const rand = Math.random();
    const banner = rand < 0.33 ? 'paneflow' : rand < 0.66 ? 'sphq' : 'cladd';
    setShowBanner(banner);
  }, []);

  return (
    <>
      <PaneFlowBanner className={showBanner === 'paneflow' ? '' : 'hidden'} />
      <CladdBanner className={showBanner === 'cladd' ? '' : 'hidden'} />
      <SPHQBanner className={showBanner === 'sphq' ? '' : 'hidden'} />
      {/* <NewYearBanner /> */}
      <header className="dark:border-dark-light dark:bg-dark/75 sticky top-0 z-50 border-b-[0.5px] border-black/10 bg-white/75 backdrop-blur-lg backdrop-saturate-200 dark:backdrop-blur-lg dark:backdrop-saturate-200">
        <Container className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-6 text-black dark:text-white">
            <Link href="/">
              <Logo className="h-12 w-12" />
            </Link>
            <Dropdown title="Documentation" links={docsLinks} />
            <Dropdown title="Resources" links={resourcesLinks} />
          </div>
          <div className="group dark:bg-dark relative mr-auto sm:hidden">
            <button
              className="flex items-center text-black outline-none dark:text-white"
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
            <nav className="dark:bg-dark-light absolute top-full left-0 z-10 hidden w-48 divide-y divide-black/10 overflow-hidden rounded-lg border border-black/10 bg-white shadow-lg group-focus-within:block">
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
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setUxdOpen(true);
                  if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', 'uxd_modal_open', {
                      event_category: 'newsletter',
                      event_label: 'nav_button',
                    });
                  }
                }}
                aria-label="Open User Experienced newsletter"
                title="User Experienced - weekly design picks"
                className="dark:border-dark-light flex size-7 cursor-pointer items-center justify-center overflow-hidden rounded-md border border-black/10 duration-200 hover:opacity-90 active:opacity-50"
              >
                <img
                  src="/images/our-projects/uxd-logo-red.png"
                  alt="User Experienced"
                  className="size-full"
                />
              </button>
              <span className="bg-primary pointer-events-none absolute -top-2 -right-3 rounded-full px-1 py-0.5 text-[9px] leading-none font-bold text-white">
                NEW
              </span>
            </div>
            <GithubStats showVersion inNavbar />
            <ThemeSwitch />
          </div>
        </Container>
      </header>
      <UserExperiencedModal open={uxdOpen} onClose={() => setUxdOpen(false)} />
      <UserExperiencedPopover />
    </>
  );
};
