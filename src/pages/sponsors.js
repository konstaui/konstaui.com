import React from 'react';
import { trackOutbound } from '../shared/track-outbound';
import HeroSponsors from '@/components/HeroSponsors';
import DefaultLayout from '@/layouts/default';

export default function SponsorsPage() {
  return (
    <DefaultLayout>
      <h1 className="mb-12 text-center text-4xl font-extrabold text-gray-900 sm:text-5xl dark:text-gray-200">
        Konsta UI Sponsors
      </h1>

      <div className="mb-16 text-center">
        <a
          href="https://sponsors.nolimits4web.com/"
          target="_blank"
          rel="noopener"
          className="dark:text-primaryLight"
          onClick={() => trackOutbound('https://sponsors.nolimits4web.com/')}
        >
          Sponsor Konsta UI
        </a>{' '}
        and get your logo and link featured on the website, or support the
        developer on{' '}
        <a
          href="https://github.com/sponsors/nolimits4web"
          target="_blank"
          rel="noopener"
          className="dark:text-primaryLight"
          onClick={() =>
            trackOutbound('https://github.com/sponsors/nolimits4web')
          }
        >
          GitHub Sponsors
        </a>
        . Your support helps keep Konsta UI growing!
        <div className="my-4 flex flex-col items-center space-y-6">
          <a
            href="https://sponsors.nolimits4web.com/"
            rel="noopener"
            target="_blank"
            className="inline-flex max-w-full items-center rounded-full bg-white px-6 py-4 text-sm font-medium !text-black shadow-lg duration-200 hover:bg-black/5 hover:!no-underline sm:text-lg dark:hover:bg-white/75"
            onClick={() => trackOutbound('https://sponsors.nolimits4web.com/')}
          >
            <span>Become a Sponsor</span>
          </a>
        </div>
      </div>

      <HeroSponsors showPlaceholders showTitles />
    </DefaultLayout>
  );
}

const meta = {
  title: 'Konsta UI Sponsors',
};

SponsorsPage.layoutProps = {
  meta,
};
