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

export default function withSidebar(props) {
  const { meta, children } = props;
  const Sidebar =
    meta.section && sidebars[meta.section] ? sidebars[meta.section] : null;
  return (
    <>
      <Header />
      <Container className="flex">
        <div className="hidden text-sm lg:block flex-none w-64 mr-4 sm:mr-6 lg:mr-8 xl:mr-10">
          <div className="overflow-y-auto overscroll-contain sticky top-0 py-10 max-h-screen">
            {Sidebar && <Sidebar />}
          </div>
        </div>
        <div className="max-w-none prose min-w-0 flex-auto pt-10 pb-24 lg:pb-16">
          {children}
        </div>
      </Container>
      <Footer />
    </>
  );
}
