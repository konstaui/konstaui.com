import Head from 'next/head';
import '../styles/globals.scss';
import '../styles/prose.scss';
import { React, useEffect } from 'react';
import copyToClipboard from '../shared/copy-to-clipboard';

import { useGA } from '../shared/use-ga';

function MyApp({ Component, pageProps, router }) {
  useGA(router);
  const meta = Component.layoutProps?.meta || {};
  const title =
    meta.title || 'Konsta UI - Mobile UI components built with Tailwind CSS';

  const CheckIcon = `
    <svg class='fill-[#e5e7eb]' xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48">
      <path d="M35.6464466,0.646446609 L36.3535534,1.35355339 C37.134602,2.13460197 37.134602,3.40093193 36.3535534,4.18198052 L13.4142136,27.1213203 C12.633165,27.9023689 11.366835,27.9023689 10.5857864,27.1213203 L0.646446609,17.1819805 C-0.134601974,16.4009319 -0.134601974,15.134602 0.646446609,14.3535534 L1.35355339,13.6464466 C2.13460197,12.865398 3.40093193,12.865398 4.18198052,13.6464466 L10.5857864,20.0502525 C11.366835,20.8313011 12.633165,20.8313011 13.4142136,20.0502525 L32.8180195,0.646446609 C33.5990681,-0.134601974 34.865398,-0.134601974 35.6464466,0.646446609 Z" transform="translate(10 14)"/>
    </svg>`;

  const CopyIcon = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        d="M4,12 C4,13.886 4,14.828 4.586,15.414 C5.172,16 6.114,16 8,16 L12,16 C13.886,16 14.828,16 15.414,15.414 C16,14.828 16,13.886 16,12 L16,8 C16,6.114 16,5.172 15.414,4.586 C14.828,4 13.886,4 12,4 M4,12 L8,12 C9.886,12 10.828,12 11.414,11.414 C12,10.828 12,9.886 12,8 L12,4 M4,12 C2.114,12 1.172,12 0.586,11.414 C0,10.828 0,9.886 0,8 L0,4 C0,2.114 0,1.172 0.586,0.586 C1.172,0 2.114,0 4,0 L8,0 C9.886,0 10.828,0 11.414,0.586 C12,1.172 12,2.114 12,4"
        transform="translate(1 1)"
      />
    </svg>`;

  const copyInstallCommand = (e) => {
    e.preventDefault();
    const button = e.target;
    const preElement = button.closest('pre');
    copyToClipboard(preElement.textContent);
  };

  useEffect(() => {
    const preElements = document.querySelectorAll('pre');

    preElements.forEach((preElement) => {
      const copyButton = preElement.querySelector('.copy-btn');
      const button = document.createElement('button');
      if (!copyButton) {
        preElement.className = 'relative';
        button.className =
          'absolute top-0 right-0 copy-btn hover:opacity-70 flex items-center justify-center w-12 h-12';
        button.innerHTML = `
          <div class='copy-icon absolute top-0 right-0 transition-transform duration-200 ease-in-out flex items-center justify-center w-12 h-12'>${CopyIcon}</div>
          <div class='check-icon  absolute top-0 right-0 scale-0 transition-transform duration-200 ease-in-out flex items-center justify-center w-12 h-12'>${CheckIcon}</div>
        `;
        const copyIcon = button.querySelector('.copy-icon');
        const checkIcon = button.querySelector('.check-icon');
        preElement.appendChild(button);
        button.addEventListener('click', (e) => {
          copyInstallCommand(e);
          copyIcon.classList.toggle('scale-0');
          checkIcon.classList.toggle('scale-0');
          setTimeout(() => {
            copyIcon.classList.toggle('scale-0');
            checkIcon.classList.toggle('scale-0');
          }, 2000);
        });
      }
    });
  });

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
        <link rel="mask-icon" sizes="any" href="/favicon.svg" color="#FF6300" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta
          name="description"
          content="Mobile UI components built with Tailwind CSS"
        />
        <meta
          property="og:description"
          content="Mobile UI components built with Tailwind CSS"
        />
        <meta
          property="og:image"
          content="https://konstaui.com/images/share-banner.png"
        />
        <meta property="og:site_name" content="Konsta UI" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@konstaui" />
        <meta name="twitter:creator" content="@konstaui" />
        <meta name="twitter:title" content={title} />
        <meta
          name="twitter:description"
          content="Mobile UI components built with Tailwind CSS"
        />
        <meta
          name="twitter:image"
          content="https://konstaui.com/images/share-banner.png"
        />
      </Head>
      <div className="dark:bg-dark">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
