export default function NewYearBanner({ className = '' } = {}) {
  return (
    <div className="dark text-on-surface group dark:border-dark-light bg-dark flex min-h-[64px] items-center justify-center border-b border-black/10 text-sm text-white">
      <div className="text-center">
        🎄 New Year Sale: 50% OFF on{' '}
        <a
          className="!text-[inherit] !underline hover:!no-underline"
          href="https://uiinitiative.com"
          target="_blank"
        >
          UI Initiative
        </a>
        ,{' '}
        <a
          className="!text-[inherit] !underline hover:!no-underline"
          href="https://studio.swiperjs.com"
          target="_blank"
        >
          Swiper Studio
        </a>
        ,{' '}
        <a
          className="!text-[inherit] !underline hover:!no-underline"
          href="https://paneflow.com"
          target="_blank"
        >
          PaneFlow
        </a>{' '}
        and{' '}
        <a
          className="!text-[inherit] !underline hover:!no-underline"
          href="https://t0ggles.com"
          target="_blank"
        >
          t0ggles
        </a>{' '}
        🎄
      </div>
    </div>
  );
}
