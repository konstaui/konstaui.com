import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import TableOfContents from '../components/TableOfContents';
import { Container } from '../components/Container';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { SidebarMenuReact } from '../components/SidebarMenuReact';
import { SidebarMenuSvelte } from '@/components/SidebarMenuSvelte';
import { SidebarMenuVue } from '@/components/SidebarMenuVue';

const sidebars = {
  react: SidebarMenuReact,
  svelte: SidebarMenuSvelte,
  vue: SidebarMenuVue,
};

export default function WithSidebar(props) {
  const { meta, children, tableOfContents } = props;
  const [opened, setOpened] = useState(false);
  const sidebarEl = useRef(null);
  const [prevLink, setPrevLink] = useState(null);
  const [nextLink, setNextLink] = useState(null);
  const Sidebar =
    meta.section && sidebars[meta.section] ? sidebars[meta.section] : null;
  let childrenWithTOC;
  if (tableOfContents && tableOfContents.length) {
    if (
      children &&
      children[0] &&
      children[0].props &&
      children[0].props.originalType === 'h1'
    ) {
      childrenWithTOC = [...children];
      childrenWithTOC.splice(
        1,
        0,
        <TableOfContents key="toc" tableOfContents={tableOfContents}/>
      );
    }
  }

  const setPrevNextLinks = () => {
    if (!sidebarEl.current) return;
    const docPath = document.location.pathname;
    const linksData = [...sidebarEl.current.querySelectorAll('ul a')].map(
      (el) => ({
        href: el.getAttribute('href'),
        title: el.textContent,
      })
    );
    const currentLink = linksData.filter(({ href }) => href === docPath)[0];
    if (!currentLink) {
      setPrevLink(null);
      setNextLink(null);
    }
    const nextLinkData = linksData[linksData.indexOf(currentLink) + 1];
    const prevLinkData = linksData[linksData.indexOf(currentLink) - 1];
    if (nextLinkData) {
      setNextLink(nextLinkData);
    }
    if (prevLinkData) {
      setPrevLink(prevLinkData);
    }
  };

  useEffect(() => {
    setPrevNextLinks();
  }, []);

  return (
    <>
      <Header />
      <Container className="flex" >
        <div
          className={`${
            opened ? '' : 'hidden'
          } fixed left-0 top-16 z-20 mr-4 w-64 flex-none bg-white text-sm shadow-lg sm:mr-6 lg:relative lg:top-0 lg:mr-8 lg:block lg:bg-transparent lg:shadow-none xl:mr-10`}
        >
          <div
            className="sticky top-16 max-h-[calc(100vh-64px)] overflow-y-auto overscroll-contain py-10 px-4 lg:px-0"
            ref={sidebarEl}
          >
            {Sidebar && <Sidebar />}
          </div>
        </div>
        <div className="prose min-w-0 max-w-none flex-auto pt-10 pb-24 lg:pb-16 dark:prose-invert">
          {opened && (
            <div
              className="fixed left-0 top-0 z-10 h-full w-full bg-black bg-opacity-25 "
              onClick={() => setOpened(false)}
            />
          )}

          <div
            className="fixed bottom-4 right-4 z-30 ml-2 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-md lg:hidden "
            onClick={() => setOpened(!opened)}
          >
            {opened ? (
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
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
            )}
          </div>
          {childrenWithTOC || children}
          {(prevLink || nextLink) && (
            <div className="mt-8 flex items-center justify-between border-t pt-8">
              <div>
                {prevLink && (
                  <Link href={prevLink.href}>
                    <a className="flex items-center !text-gray-500 hover:!text-primary dark:!text-dark-lightGray dark:hover:!text-primary-light">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                      <span>{prevLink.title}</span>
                    </a>
                  </Link>
                )}
              </div>
              <div>
                {nextLink && (
                  <Link href={nextLink.href}>
                    <a className="flex items-center !text-gray-500 hover:!text-primary dark:!text-dark-lightGray dark:hover:!text-primary-light">
                      <span>{nextLink.title}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </a>
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </Container>
      <Footer />
    </>
  );
}
