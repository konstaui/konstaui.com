import { useState } from 'react';
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
  console.log(childrenWithTOC);
  return (
    <>
      <Header />
      <Container className="flex">
        <div
          className={`${
            opened ? '' : 'hidden'
          } fixed z-20 left-0 top-0 bg-white lg:bg-transparent lg:relative text-sm lg:block flex-none w-64 mr-4 sm:mr-6 lg:mr-8 xl:mr-10 shadow-lg lg:shadow-none`}
        >
          <div className="overflow-y-auto overscroll-contain sticky top-0 py-10 max-h-screen px-4 lg:px-0">
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
        </div>
      </Container>
      <Footer />
    </>
  );
}
