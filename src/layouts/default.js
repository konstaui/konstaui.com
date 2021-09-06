import { Container } from '../components/Container';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

export default function WithSidebar(props) {
  const { children } = props;

  return (
    <>
      <Header />
      <Container className="flex">
        <div className="hidden fixed z-20 left-0 top-0 bg-white lg:bg-transparent lg:relative text-sm lg:block flex-none w-64 mr-4 sm:mr-6 lg:mr-8 xl:mr-10 shadow-lg lg:shadow-none">
          <div className="overflow-y-auto overscroll-contain sticky top-0 py-10 max-h-screen px-4 lg:px-0" />
        </div>
        <div className="max-w-none prose min-w-0 flex-auto pt-10 pb-24 lg:pb-16">
          {children}
        </div>
      </Container>
      <Footer />
    </>
  );
}
