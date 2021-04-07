import Head from 'next/head';
import { Button } from '../components/Button';
import { Container } from '../components/Container';
import { Footer } from '../components/Footer';
import { GithubIcon } from '../components/GithubIcon';
import { GithubStats } from '../components/GithubStats';
import { Logo } from '../components/Logo';
import copyToClipboard from '../shared/copy-to-clipboard';

export default function Home() {
  const copyInstallCommand = (e) => {
    e.preventDefault();
    copyToClipboard('npm i tailwind-mobile');
  };

  const Section = (props) => {
    const { className, children, ...attrs } = props;
    return (
      <Container className={`my-48 ${className || ''}`} {...attrs}>
        {children}
      </Container>
    );
  };

  const SectionTitle = (props) => {
    const { className, children, ...attrs } = props;
    return (
      <h2
        className={`text-primary font-bold text-6xl text-center mb-8 ${
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
        className={`font-medium text-2xl text-center leading-normal mb-8 mx-auto max-w-screen-lg ${
          className || ''
        }`}
        {...attrs}
      >
        {children}
      </p>
    );
  };

  return (
    <>
      <Head>
        <title>
          Tailwind Mobile - Mobile UI components built with Tailwind CSS
        </title>
      </Head>
      {/* Nav */}
      <div className="bg-white top-0 border-b-[0.5px] border-black border-opacity-10">
        <Container className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <a href="/">
              <Logo className="w-12 h-12" />
            </a>
            <span>Coming soon</span>
            {/* <a
              className="text-black hover:text-primary font-semibold transition-colors duration-100"
              href="#"
            >
              Get started
            </a>
            <a
              className="text-black hover:text-primary font-semibold transition-colors duration-100"
              href="#"
            >
              Documentation
            </a> */}
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/tailwind-mobile/tailwind-mobile"
              target="_blank"
              className="text-black hover:text-primary transition-colors duration-100 flex items-center space-x-2"
            >
              <span className="font-semibold">v.0.0.1</span>
              <GithubIcon />
            </a>
          </div>
        </Container>
      </div>

      {/* Header */}
      <Container className="flex items-start mt-16 mb-16">
        <div className="flex-shrink-0 mr-4">
          <Logo className="w-48 h-48 home-logo-animated" />
        </div>
        <div className="flex-shrink w-full my-4">
          <div className="text-primary text-8xl font-bold leading-none">
            Tailwind Mobile
          </div>
          <div className="text-black text-6xl font-bold leading-tight my-4">
            Pixel perfect mobile UI components built with Tailwind CSS
          </div>
          <div className="text-2xl font-semibold my-4">
            With iOS and Material Design components for React, Vue, Svelte &
            Angular
          </div>
          <div className="flex items-center space-x-4 my-8">
            <Button>Get started</Button>
            <div className="bg-primary bg-opacity-10 font-mono text-black text-lg h-12 border border-primary rounded-xl flex items-center px-8">
              <span className="select-none opacity-50 mr-4">$</span>
              <span>npm i tailwind-mobile</span>
              <span
                className="ml-4 select-none cursor-pointer opacity-50 duration-200 hover:opacity-100 transform-gpu"
                onClick={copyInstallCommand}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                >
                  <path
                    fill="none"
                    stroke="#000"
                    strokeWidth="1.5"
                    d="M4,12 C4,13.886 4,14.828 4.586,15.414 C5.172,16 6.114,16 8,16 L12,16 C13.886,16 14.828,16 15.414,15.414 C16,14.828 16,13.886 16,12 L16,8 C16,6.114 16,5.172 15.414,4.586 C14.828,4 13.886,4 12,4 M4,12 L8,12 C9.886,12 10.828,12 11.414,11.414 C12,10.828 12,9.886 12,8 L12,4 M4,12 C2.114,12 1.172,12 0.586,11.414 C0,10.828 0,9.886 0,8 L0,4 C0,2.114 0,1.172 0.586,0.586 C1.172,0 2.114,0 4,0 L8,0 C9.886,0 10.828,0 11.414,0.586 C12,1.172 12,2.114 12,4"
                    transform="translate(1 1)"
                  />
                </svg>
              </span>
            </div>
          </div>
          <div className="my-4">
            MIT Licensed, v0.0.1 released on February 5, 2021
          </div>
          <div className="my-4">
            <GithubStats />
          </div>
        </div>
      </Container>

      {/* Sections */}
      <Section className="mt-16">
        <SectionTitle>See it in action</SectionTitle>
        <div className="w-[375px] h-[736px] home-app-shadow my-16 mx-auto rounded-xl overflow-hidden">
          <iframe
            title="demo"
            className="w-full h-full rounded-xl overflow-hidden"
            src="/kitchen-sink/react/index.html"
          />
        </div>
      </Section>

      <Section>
        <SectionTitle>iOS & Material Design themes</SectionTitle>
        <SectionText>
          All Tailwind Mobile components come with pixel perfect native-like iOS
          and Material Design themes created using official design guidelines.
          Everything you need for your iOS and Android apps!
        </SectionText>
        <div className="flex flex-wrap items-center content-center justify-center">
          <img
            className="mx-12 mt-8"
            src="/images/home-logos/google.svg"
            alt="google"
          />
          <img
            className="mx-12 mt-8"
            src="/images/home-logos/apple.svg"
            alt="apple"
          />
        </div>
      </Section>

      <Section>
        <SectionTitle>Awesome set of UI components</SectionTitle>
        <SectionText>
          Tailwind Mobile comes with an awesome set of ready to use UI elements:
        </SectionText>
        <div className="flex flex-wrap items-center content-center justify-center">
          <img className="m-2" src="/images/home-ui/button.svg" alt="button" />
          <img className="m-2" src="/images/home-ui/input.svg" alt="input" />
          <img
            className="m-2"
            src="/images/home-ui/preloader.svg"
            alt="preloader"
          />
          <img className="m-2" src="/images/home-ui/range.svg" alt="range" />
          <img
            className="m-2"
            src="/images/home-ui/toggle-ios.svg"
            alt="toggle-ios"
          />
          <img
            className="m-2"
            src="/images/home-ui/toggle-md.svg"
            alt="toggle-md"
          />
        </div>
      </Section>

      <Section>
        <SectionTitle>Build with the tech you love!</SectionTitle>
        <SectionText>
          Tailwind Mobile components are currently available for React, and
          coming soon for Vue, Svelte and Angular.
        </SectionText>
        <div className="flex flex-wrap items-center content-center justify-center">
          <img
            className="mx-12 mt-8"
            src="/images/home-logos/react.svg"
            alt="react"
          />
          <img
            className="mx-12 mt-8"
            src="/images/home-logos/vue.svg"
            alt="vue"
          />
          <img
            className="mx-12 mt-8"
            src="/images/home-logos/svelte.svg"
            alt="svelte"
          />
          <img
            className="mx-12 mt-8"
            src="/images/home-logos/angular.svg"
            alt="angular"
          />
        </div>
      </Section>

      <Section>
        <SectionTitle>Perfect fit for Ionic & Framework7</SectionTitle>
        <SectionText>
          Tailwind Mobile mostly designed to be used with "parent" frameworks
          like{' '}
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
          navigation, state management, native APIs, etc.) and Tailwind Mobile
          components for inner pages/views UIs.
        </SectionText>
        <div className="flex items-stretch justify-between mx-auto max-w-screen-lg mt-16">
          <div className="border-8 border-r-0 border-[#3880FF] w-full flex-shrink mr-8 ml-24 rounded-l-2xl">
            <div className="border-8 border-r-0 border-[#EE350F] h-full relative rounded-l-lg">
              <div className="flex absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2 space-x-4 -ml-2">
                <img
                  className="w-24 h-24"
                  src="/images/home-logos/ionic.svg"
                  alt="ionic"
                />
                <img
                  className="w-24 h-24"
                  src="/images/home-logos/framework7.svg"
                  alt="framework7"
                />
              </div>
              <div className="top-[4.7%] bottom-[4.7%] w-1/2 left-1/2 absolute border-8 border-r-0 border-primary rounded-l-lg">
                <Logo className="w-24 h-24 absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2" />
              </div>
            </div>
          </div>
          <img
            className="w-[375px] home-app-shadow flex-shrink-0"
            src="/images/home-appstore-app.png"
            alt="mobile app"
          />
        </div>
      </Section>

      <Section>
        <SectionTitle>Go native</SectionTitle>
        <SectionText>
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

        <div className="flex flex-wrap items-center content-center justify-center">
          <img
            className="mx-12 mt-8"
            src="/images/home-logos/capacitorjs.svg"
            alt="capacitorjs"
          />
          <img
            className="mx-12 mt-8"
            src="/images/home-logos/cordova.svg"
            alt="cordova"
          />
        </div>
      </Section>

      {/* Footer */}
      <Footer />
    </>
  );
}
