import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import TableOfContents from '../components/TableOfContents';
import { Container } from '../components/Container';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { SidebarMenuReact } from '../components/SidebarMenuReact';
// import { SidebarSvelte } from '@/components/SidebarSvelte';
// import { SidebarVue } from '@/components/SidebarVue';

const sidebars = {
  react: SidebarMenuReact,
  // svelte: SidebarSvelte,
  // vue: SidebarVue,
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
        <TableOfContents key="toc" tableOfContents={tableOfContents} />
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
      <Container className="flex">
        <div
          className={`${
            opened ? '' : 'hidden'
          } fixed z-20 left-0 top-0 bg-white lg:bg-transparent lg:relative text-sm lg:block flex-none w-64 mr-4 sm:mr-6 lg:mr-8 xl:mr-10 shadow-lg lg:shadow-none`}
        >
          <div
            className="overflow-y-auto overscroll-contain sticky top-0 py-10 max-h-screen px-4 lg:px-0"
            ref={sidebarEl}
          >
            {Sidebar && <Sidebar />}
          </div>
        </div>
        <div className="max-w-none prose min-w-0 flex-auto pt-10 pb-24 lg:pb-16">
          <div
            className={`lg:hidden cursor-pointer flex items-center justify-center z-30 w-12 h-12 rounded-full bg-primary text-white shadow-md ml-2 bottom-4 fixed md:sticky md:top-4 md:!-mt-6 md:mb-4 ${
              opened ? 'left-64 md:ml-64' : 'left-0 md:ml-0'
            }`}
            onClick={() => setOpened(!opened)}
          >
            {opened ? (
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
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
            )}
          </div>
          {childrenWithTOC || children}
          {(prevLink || nextLink) && (
            <div className="flex items-center justify-between border-t pt-8 mt-8">
              <div>
                {prevLink && (
                  <Link href={prevLink.href}>
                    <a className="flex items-center !text-gray-500 hover:!text-primary">
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
                    <a className="flex items-center !text-gray-500 hover:!text-primary">
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
