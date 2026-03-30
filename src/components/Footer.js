import { Container } from './Container';

export const Footer = (props) => {
  const { className, children, ...attrs } = props;

  return (
    <div
      className={`dark:border-dark-light border-t-[0.5px] border-black/10 py-8 ${
        className || ''
      }`}
      {...attrs}
    >
      <Container>
        {/* Copy */}
        <div className="space-y-4 text-center text-sm">
          <div>
            Code licensed under{' '}
            <a
              href="https://github.com/konstaui/konsta/blob/main/LICENSE"
              target="_blank"
              className="text-primary hover:underline"
            >
              MIT
            </a>
            .
          </div>
          <div>
            2025 © Konsta UI by{' '}
            <a href="https://nolimits4web.com" target="_blank">
              <img
                className="inline-block h-12 w-12"
                src="/images/n4w-logo.svg"
                alt="nolimits4web"
              />
            </a>
            .
          </div>
          <div className="flex items-center justify-center gap-2">
            <a
              title="PaneFlow - Create Stunning Slideshows Visually. No Code Required"
              href="https://paneflow.com"
              target="_blank"
            >
              <img
                loading="lazy"
                src="/images/our-projects/paneflow.svg"
                alt="PaneFlow - Create Stunning Slideshows Visually. No Code Required"
                className="inline-block size-6"
              />
            </a>
            <a
              title="t0ggles - Your ultimate multiple projects management tool"
              href="https://t0ggles.com"
              target="_blank"
            >
              <img
                loading="lazy"
                src="/images/our-projects/t0ggles.svg"
                alt="t0ggles - Your ultimate multiple projects management tool"
                className="inline-block size-6"
              />
            </a>
            <a
              title="Swiper Studio - Create Beautiful And Responsive Sliders Without Writing Any Code"
              href="https://studio.swiperjs.com"
              target="_blank"
            >
              <img
                loading="lazy"
                src="/images/our-projects/swiper-studio.svg"
                alt="Swiper Studio - Create Beautiful And Responsive Sliders Without Writing Any Code"
                className="inline-block size-6"
              />
            </a>
            <a
              title="UI Initiative - Premium templates & plugins for Swiper and Framework7"
              href="https://uiinitiative.com"
              target="_blank"
            >
              <img
                loading="lazy"
                src="/images/our-projects/uiinitiative.svg"
                alt="UI Initiative - Premium templates & plugins for Swiper and Framework7"
                className="inline-block size-6"
              />
            </a>
            <a
              title="Start Page HQ - Your browser new tab as a personal dashboard with 50+ widgets"
              href="https://startpagehq.com"
              target="_blank"
            >
              <img
                loading="lazy"
                src="/images/our-projects/startpagehq.svg"
                alt="Start Page HQ"
                className="inline-block size-6"
              />
            </a>
            <a
              title="Fisper - Local AI Voice Dictation for macOS"
              href="https://fisper.app"
              target="_blank"
            >
              <img
                loading="lazy"
                src="/images/our-projects/fisper.png"
                alt="Fisper - Local AI Voice Dictation for macOS"
                className="inline-block size-6"
              />
            </a>
          </div>
        </div>
        {children}
      </Container>
    </div>
  );
};
