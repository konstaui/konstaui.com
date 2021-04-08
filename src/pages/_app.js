import Head from 'next/head';
import '../styles/globals.scss';

import { useGA } from '../shared/use-ga';

function MyApp({ Component, pageProps, router }) {
  useGA(router);
  const title =
    'Tailwind Mobile - Mobile UI components built with Tailwind CSS';
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta
          name="description"
          content="Mobile UI components built with Tailwind CSS"
        />
        <meta property="og:title" content="Tailwind Mobile" />
        <meta
          property="og:description"
          content="Mobile UI components built with Tailwind CSS"
        />
        <meta
          property="og:image"
          content="https://tailwind-mobile.com/images/share-banner.png"
        />
        <meta property="og:site_name" content="Tailwind Mobile" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@nolimits4web" />
        <meta name="twitter:creator" content="@nolimits4web" />
        <meta name="twitter:title" content="Tailwind Mobile" />
        <meta
          name="twitter:description"
          content="Mobile UI components built with Tailwind CSS"
        />
        <meta
          name="twitter:image"
          content="https://tailwind-mobile.com/images/share-banner.png"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
