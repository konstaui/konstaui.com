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
        Support Konsta UI on{' '}
        <a
          href="https://opencollective.com/konstaui"
          target="_blank"
          rel="noopener"
          className="dark:text-primaryLight"
          onClick={() => trackOutbound('https://opencollective.com/konstaui')}
        >
          Open Collective
        </a>{' '}
        or{' '}
        <a
          href="https://patreon.com/konstaui"
          target="_blank"
          rel="noopener"
          className="dark:text-primaryLight"
          onClick={() => trackOutbound('https://patreon.com/konstaui')}
        >
          Patreon
        </a>{' '}
        and help us to make it even better!
        <br />
        Your support means a lot for us!
        <div className="my-4 flex flex-col items-center space-y-6">
          <a
            href="https://opencollective.com/konstaui"
            rel="noopener"
            target="_blank"
            className="inline-flex max-w-full items-center rounded-full bg-white px-6 py-4 text-sm font-medium !text-black shadow-lg duration-200 hover:bg-black/5 hover:!no-underline sm:text-lg dark:hover:bg-white/75"
            onClick={() => trackOutbound('https://opencollective.com/konstaui')}
          >
            <img
              src="/images/opencollective-logo.svg"
              className="mr-4 h-6 w-6"
            />
            <span>Become a sponsor on OpenCollective</span>
          </a>
          <a
            href="https://patreon.com/konstaui"
            rel="noopener"
            target="_blank"
            className="inline-flex max-w-full items-center rounded-full bg-white px-6 py-4 text-sm font-medium !text-black shadow-lg duration-200 hover:bg-black/5 hover:!no-underline sm:text-lg dark:hover:bg-white/75"
            onClick={() => trackOutbound('https://patreon.com/konstaui')}
          >
            <img
              src="/images/patreon-logo.svg"
              className="mr-4 h-6 w-6 text-[#FF424D]"
            />
            <span>Support Konsta UI on Patreon</span>
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
