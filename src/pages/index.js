import Link from 'next/link';

import { Device } from '../components/Device';
import { Button } from '../components/Button';
import { Container } from '../components/Container';
import { Footer } from '../components/Footer';
import { GithubStats } from '../components/GithubStats';
import { Logo } from '../components/Logo';
import { Header } from '../components/Header';
import copyToClipboard from '../shared/copy-to-clipboard';
import HeroSponsors from '@/components/HeroSponsors';
import { trackOutbound } from '@/shared/track-outbound';
import { ReactComponent as PatreonLogo } from '@/img/patreon-logo.svg';
import { ReactComponent as OpenCollectiveLogo } from '@/img/opencollective-logo.svg';

function SponsorButton(props) {
  const { href, className, onClick, children, ...restProps } = props;
  return (
    <a
      href={href}
      rel="noopener"
      target="_blank"
      {...restProps}
      className={`inline-flex max-w-full items-center rounded-full bg-white px-6 py-4 text-sm font-medium text-black shadow-lg duration-200 hover:bg-black hover:bg-opacity-5 hover:no-underline sm:text-lg ${className}`}
      onClick={(e) => {
        onClick(e);
        trackOutbound(href);
      }}
    >
      {children}
    </a>
  );
}

export default function Home() {
  const copyInstallCommand = (e) => {
    e.preventDefault();
    copyToClipboard('npm i konsta');
  };

  const CopyIcon = ({ className }) => (
    <svg
      className={className || ''}
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
    </svg>
  );

  const Section = (props) => {
    const { className, children, ...attrs } = props;
    return (
      <Container className={`my-24 md:my-32 ${className || ''}`} {...attrs}>
        {children}
      </Container>
    );
  };

  const SectionTitle = (props) => {
    const { className, children, ...attrs } = props;
    return (
      <h2
        className={`mb-8 text-center text-4xl font-bold text-primary sm:text-5xl ${
          className || ''
        }`}
        {...attrs}
      >
        {children}
      </h2>
    );
  };

  const SectionText = (props) => {
    const { className, children, ...attrs } = props;
    return (
      <p
        className={`mx-auto mb-8 max-w-screen-lg text-center text-lg font-medium sm:text-xl md:text-2xl md:leading-relaxed ${
          className || ''
        }`}
        {...attrs}
      >
        {children}
      </p>
    );
  };

  const SectionLogos = (props) => {
    const { className, logos = [], children, ...attrs } = props;
    return (
      <div
        className={`flex flex-wrap content-center items-center justify-center ${
          className || ''
        }`}
        {...attrs}
      >
        {logos.map((logo) => (
          <img
            className="mx-6 mt-6 h-24 w-24 md:mx-12 md:mt-8 md:h-32 md:w-32"
            key={logo.src}
            src={logo.src}
            alt={logo.alt}
          />
        ))}
        {children}
      </div>
    );
  };

  return (
    <>
      <Header />
      {/* Content */}
      <Container className="mt-4 mb-16 flex flex-col items-center text-center lg:flex-row lg:text-left">
        <div className="max-w-2xl">
          {/* Logo */}
          <div className="shrink-0">
            <Logo className="home-logo-animated mx-auto h-32 w-32 md:h-48 md:w-48 lg:ml-auto lg:mr-0" />
          </div>
          {/* Content */}
          <div className="w-full shrink lg:text-right">
            <div className="mt-12 text-4xl font-bold leading-none text-primary sm:text-6xl">
              Konsta UI
            </div>
            <div className="my-8 text-3xl font-bold text-black sm:text-4xl sm:leading-snug dark:text-white">
              Pixel perfect mobile UI components built with Tailwind CSS
            </div>
            <div className="my-8 text-xl font-semibold lg:text-2xl lg:leading-normal dark:text-dark-lightGray">
              With iOS and Material Design components for
              <br /> React, Vue & Svelte
            </div>
            <div className="my-8 flex flex-col items-center justify-center space-x-4 sm:flex-row lg:justify-end">
              <Button href="#get-started" className="lg:px-6 xl:px-8">
                Get started
              </Button>
              <div className="hidden h-12 items-center rounded-xl border border-primary bg-primary bg-opacity-10 px-4 font-mono text-lg text-black sm:flex dark:text-white">
                <span className="mr-4 select-none opacity-50">$</span>
                <span>npm i konsta</span>
                <span
                  className="ml-4 transform-gpu cursor-pointer select-none opacity-50 duration-200 hover:text-primary hover:opacity-100"
                  onClick={copyInstallCommand}
                >
                  <CopyIcon />
                </span>
              </div>
            </div>
            <div className="my-4">
              MIT Licensed, v{process.env.konstaVersion} released on{' '}
              {process.env.konstaReleaseDate}
            </div>
            <div className="mt-4">
              <GithubStats />
            </div>
          </div>
        </div>
        {/* Phone */}
        <Device
          url="/kitchen-sink/react/dist/index.html?safe-areas=true"
          className="ml-16 hidden lg:block "
        />
      </Container>

      {/* Sections */}
      <Section className="!mt-16 lg:hidden">
        <SectionTitle>See it in action</SectionTitle>
        <div className="text-center">
          <Button
            className="md:hidden"
            inline
            href="/kitchen-sink/react/dist/index.html"
            target="_blank"
          >
            <span>Open in new tab</span>
            <svg
              className="relative -top-px ml-2 h-6 w-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
          </Button>
        </div>
        <Device
          url="/kitchen-sink/react/dist/index.html?safe-areas=true"
          className="my-16 mx-auto hidden md:block"
        />
      </Section>

      <Section>
        <SectionTitle>iOS & Material Design themes</SectionTitle>
        <SectionText className="dark:text-dark-lightGray">
          All Konsta UI components come with pixel perfect native-like iOS and
          Material Design themes created using official design guidelines.
          Everything you need for your iOS and Android apps!
        </SectionText>
        <SectionLogos
          logos={[
            {
              src: '/images/home/home-logos/google.svg',
              alt: 'google',
            },
            {
              src: '/images/home/home-logos/apple.svg',
              alt: 'apple',
            },
          ]}
        />
      </Section>

      <Section>
        <SectionTitle>Awesome set of UI components</SectionTitle>
        <SectionText className="dark:text-dark-lightGray">
          Konsta UI comes with an awesome set of ready to use UI elements:
        </SectionText>
        <div className="flex flex-wrap content-center items-center justify-center">
          <img
            className="m-2"
            src="/images/home/home-ui/button.svg"
            alt="button"
          />
          <img
            className="m-2"
            src="/images/home/home-ui/input.svg"
            alt="input"
          />
          <img
            className="m-2"
            src="/images/home/home-ui/preloader.svg"
            alt="preloader"
          />
          <img
            className="m-2"
            src="/images/home/home-ui/range.svg"
            alt="range"
          />
          <img
            className="m-2"
            src="/images/home/home-ui/toggle-ios.svg"
            alt="toggle-ios"
          />
          <img
            className="m-2"
            src="/images/home/home-ui/toggle-md.svg"
            alt="toggle-md"
          />
        </div>
      </Section>

      <Section>
        <SectionTitle>Build with the tech you love!</SectionTitle>
        <SectionText className="dark:text-dark-lightGray">
          Konsta UI components are currently available for React, Vue, and
          Svelte.
        </SectionText>
        <SectionLogos
          logos={[
            {
              src: '/images/home/home-logos/react.svg',
              alt: 'react',
            },
            {
              src: '/images/home/home-logos/vue.svg',
              alt: 'vue',
            },
            {
              src: '/images/home/home-logos/svelte.svg',
              alt: 'svelte',
            },
            // {
            //   src: '/images/home/home-logos/angular.svg',
            //   alt: 'angular',
            // },
          ]}
        />
      </Section>

      <Section>
        <SectionTitle>Perfect fit for Ionic & Framework7</SectionTitle>
        <SectionText className="dark:text-dark-lightGray">
          Konsta UI mostly designed to be used with "parent" frameworks like{' '}
          <a
            className="text-primary hover:underline"
            href="https://ionicframework.com"
            target="_blank"
          >
            Ionic
          </a>{' '}
          or{' '}
          <a
            className="text-primary hover:underline"
            href="https://framework7.io"
            target="_blank"
          >
            Framework7
          </a>
          . In this case you use "parent" framework as your app shell (routing,
          navigation, state management, native APIs, etc.) and Konsta UI
          components for inner pages/views UIs.
        </SectionText>
        <SectionLogos
          className="md:hidden"
          logos={[
            {
              src: '/images/home/home-logos/framework7.svg',
              alt: 'framework7',
            },
            {
              src: '/images/home/home-logos/ionic.svg',
              alt: 'ionic',
            },
          ]}
        />
        <div className="mx-auto mt-16 hidden max-w-screen-lg items-stretch justify-between md:flex">
          <div className="mr-8 ml-20 w-full shrink rounded-l-2xl border-8 border-r-0 border-[#3880FF] lg:ml-24">
            <div className="relative h-full rounded-l-lg border-8 border-r-0 border-[#EE350F]">
              <div className="absolute top-1/2 -ml-2 flex w-52 -translate-x-1/2 -translate-y-1/2 transform space-x-4">
                <img
                  className="h-24 w-24"
                  src="/images/home/home-logos/ionic.svg"
                  alt="ionic"
                />
                <img
                  className="h-24 w-24"
                  src="/images/home/home-logos/framework7.svg"
                  alt="framework7"
                />
              </div>
              <div className="absolute top-[4.7%] bottom-[4.7%] left-3/4 w-1/4 rounded-l-lg border-8 border-r-0 border-primary lg:left-1/2 lg:w-1/2">
                <Logo className="absolute left-0 top-1/2 h-24 w-24 -translate-y-1/2 -translate-x-1/2 transform" />
              </div>
            </div>
          </div>
          <img
            className="home-app-shadow w-[375px] shrink-0"
            src="/images/home/home-appstore-app.png"
            alt="mobile app"
          />
        </div>
      </Section>

      <Section>
        <SectionTitle>Go native</SectionTitle>
        <SectionText className="dark:text-dark-lightGray">
          Using it with frameworks like{' '}
          <a
            className="text-primary hover:underline"
            href="https://capacitorjs.com"
            target="_blank"
          >
            Capacitor
          </a>{' '}
          and{' '}
          <a
            className="text-primary hover:underline"
            href="https://cordova.apache.org"
            target="_blank"
          >
            Cordova
          </a>{' '}
          you can easily create real native apps with native look and feel.
        </SectionText>

        <SectionLogos
          logos={[
            {
              src: '/images/home/home-logos/capacitorjs.svg',
              alt: 'capacitorjs',
            },
            {
              src: '/images/home/home-logos/cordova.svg',
              alt: 'cordova',
            },
          ]}
        />
      </Section>

      <Section id="get-started">
        <SectionTitle>Get Started</SectionTitle>
        <div className="mx-auto flex max-w-2xl items-center justify-center rounded-xl border border-primary bg-primary bg-opacity-10 py-6 px-4 font-mono text-black sm:px-8 sm:text-lg dark:text-white">
          <span className="pointer-events-none mr-4 hidden select-none opacity-50 sm:block">
            $
          </span>
          <span>npm i konsta</span>
          <span
            className="ml-2 transform-gpu cursor-pointer select-none opacity-50 duration-200 hover:text-primary hover:opacity-100 sm:ml-4"
            onClick={copyInstallCommand}
          >
            <CopyIcon />
          </span>
        </div>
        <div className="mx-auto mt-8 max-w-3xl items-stretch justify-center space-y-4 text-center sm:flex sm:space-y-0 sm:space-x-4 md:space-x-8">
          <Link href="/react">
            <a className="relative flex w-full items-center rounded-xl border border-black border-opacity-10 px-4 py-6 text-black duration-200 hover:border-opacity-0 hover:shadow-lg sm:flex-col sm:hover:shadow-2xl dark:text-white dark:border-dark-light">
              <img
                className="mr-4 w-12 sm:mb-4 sm:mr-0 sm:h-20 sm:w-auto"
                src="/images/home/home-logos/react.svg"
                alt="react"
              />
              <span className="font-semibold sm:mb-2">Konsta UI React</span>
              <span className="hidden text-sm opacity-75 sm:block">
                Documentation
              </span>
            </a>
          </Link>
          <Link href="/vue">
            <a className="relative flex w-full items-center rounded-xl border border-black border-opacity-10 px-4 py-6 text-black duration-200 hover:border-opacity-0 hover:shadow-lg sm:flex-col sm:hover:shadow-2xl dark:text-white dark:border-dark-light">
              <img
                className="mr-4 w-12 sm:mb-4 sm:mr-0 sm:h-20 sm:w-auto"
                src="/images/home/home-logos/vue.svg"
                alt="vue"
              />
              <span className="font-semibold sm:mb-2">Konsta UI Vue</span>
              <span className="hidden text-sm opacity-75 sm:block">
                Documentation
              </span>
            </a>
          </Link>
          <Link href="/svelte">
            <a className="relative flex w-full items-center rounded-xl border border-black border-opacity-10 px-4 py-6 text-black duration-200 hover:border-opacity-0 hover:shadow-lg sm:flex-col dark:text-white sm:hover:shadow-2xl dark:border-dark-light">
              <img
                className="mr-4 w-12 sm:mb-4 sm:mr-0 sm:h-20 sm:w-auto"
                src="/images/home/home-logos/svelte.svg"
                alt="vue"
              />
              <span className="font-semibold sm:mb-2">Konsta UI Svelte</span>
              <span className="hidden text-sm opacity-75 sm:block">
                Documentation
              </span>
            </a>
          </Link>
        </div>
      </Section>

      <Section id="get-started">
        <SectionTitle>More Of Our Projects</SectionTitle>
        <div className="gr mx-auto max-w-3xl items-stretch space-y-4 sm:flex sm:space-y-0 sm:space-x-8 sm:text-center">
          {[
            {
              url: 'https://framework7.io',
              title: 'Framework7',
              description:
                'Full featured framework for building iOS, Android & desktop apps',
              logo: 'framework7.svg',
            },
            {
              url: 'https://swiperjs.com',
              title: 'Swiper',
              description: 'Most modern mobile touch slider',
              logo: 'swiper.svg',
            },
            {
              url: 'https://atroposjs.com',
              title: 'Atropos',
              description: 'Stunning touch-friendly 3D parallax hover effects',
              logo: 'atropos.svg',
            },
          ].map((item) => (
            <a
              className="flex w-full items-center rounded-xl border border-black border-opacity-10 px-4 py-6 text-black duration-200 hover:border-opacity-0 hover:shadow-lg sm:flex-col sm:hover:shadow-2xl dark:text-white dark:border-dark-light"
              href={item.url}
              target="_blank"
              key={item.title}
            >
              <img
                className="mr-4 w-12 sm:mr-0 sm:h-32 sm:w-32"
                src={`/images/our-projects/${item.logo}`}
                alt={item.title}
              />
              <div>
                <div className="font-semibold text-black sm:mt-4 sm:mb-2 dark:text-white">
                  {item.title}
                </div>
                <div className="text-sm opacity-75">{item.description}</div>
              </div>
            </a>
          ))}
        </div>
      </Section>

      <Section>
        <SectionTitle>Sponsors</SectionTitle>
        <HeroSponsors />
        <div className="my-4 text-center text-lg dark:text-dark-lightGray">
          Support Konsta UI on{' '}
          <a
            href="https://opencollective.com/konstaui"
            target="_blank"
            rel="noopener"
            className="dark:text-primaryLight text-primary hover:underline"
            onClick={() => trackOutbound('https://opencollective.com/konstaui')}
          >
            Open Collective
          </a>{' '}
          or{' '}
          <a
            href="https://patreon.com/konstaui"
            target="_blank"
            rel="noopener"
            className="dark:text-primaryLight text-primary hover:underline"
            onClick={() => trackOutbound('https://patreon.com/konstaui')}
          >
            Patreon
          </a>{' '}
          and help us to make it even better!
          <br />
          Your support means a lot for us!
        </div>
        <div className="my-4 flex flex-col items-center space-y-6">
          <SponsorButton href="https://opencollective.com/konstaui">
            <OpenCollectiveLogo className="mr-4 h-6 w-6" />
            <span>Become a sponsor on OpenCollective</span>
          </SponsorButton>
          <SponsorButton href="https://patreon.com/konstaui">
            <PatreonLogo className="mr-4 h-6 w-6 text-[#FF424D]" />
            <span>Support Konsta UI on Patreon</span>
          </SponsorButton>
        </div>
      </Section>

      {/* Footer */}
      <Footer />
    </>
  );
}
