export default function SwiperStudioBanner({ className = '' } = {}) {
  return (
    <a
      className={`dark text-on-surface group dark:border-dark-light bg-dark flex min-h-[64px] items-center justify-center border-b border-black/10 text-white hover:no-underline ${className}`}
      href="https://studio.swiperjs.com"
      target="_blank"
    >
      <div className="mx-auto max-w-[90rem] px-2 py-2 text-center text-sm font-semibold group-hover:opacity-70">
        <span className="opacity-70">From Konsta UI authors: </span>
        <div className="sm:contents">
          <img
            src="/images/our-projects/swiper-studio.svg"
            alt="Swiper Studio"
            className="inline size-7"
          />
          <span className="ml-1">All-new Swiper Studio V2 is here</span>
        </div>
      </div>
    </a>
  );
}
