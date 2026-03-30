export default function SPHQBanner({ className = '' } = {}) {
  return (
    <a
      className={`group flex min-h-[64px] items-center justify-center border-white/20 bg-neutral-900 text-white hover:no-underline dark:border-b ${className}`}
      href="https://t0ggles.com"
      target="_blank"
    >
      <div className="mx-auto max-w-[90rem] px-2 py-2 text-center text-sm font-semibold group-hover:opacity-70">
        <span className="opacity-70">Meet Our New Project: </span>
        <div className="sm:contents">
          <img
            src="/images/our-projects/startpagehq.svg"
            alt="PaneFlow"
            className="inline size-7"
          />
          <span className="ml-1">
            Start Page HQ - Your browser new tab as a personal dashboard
          </span>
        </div>
      </div>
    </a>
  );
}
