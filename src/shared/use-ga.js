import { useEffect } from 'react';

export const useGA = (router) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-HLBLT5Q79N';
    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      // eslint-disable-next-line
      window.gtag = function () {
        // eslint-disable-next-line
        window.dataLayer.push(arguments);
      };
      window.gtag('js', new Date());
      window.gtag('config', 'G-HLBLT5Q79N');
    };
    document.body.appendChild(script);

    router.events.on('routeChangeStart', () => {
      if (!window.gtag) return;
      window.gtag('event', 'page_view');
    });
  }, []);
};
