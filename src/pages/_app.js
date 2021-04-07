import Head from 'next/head';
import '../styles/globals.scss';

import { useGA } from '../shared/use-ga';

function MyApp({ Component, pageProps, router }) {
  useGA(router);

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
