import { Container } from '../components/Container';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

export default function DefaultLayout(props) {
  const { children } = props;

  return (
    <>
      <Header />
      <Container className="flex">
        <div className="prose dark:prose-invert min-w-0 max-w-none flex-auto pt-10 pb-24 lg:pb-16">
          {children}
        </div>
      </Container>
      <Footer />
    </>
  );
}
