export default function PaneFlowBanner({ className = '' } = {}) {
  return (
    <a
      className={`dark text-on-surface group dark:border-dark-light bg-dark flex min-h-[64px] items-center justify-center border-b border-black/10 text-white hover:no-underline ${className}`}
      href="https://paneflow.com"
      target="_blank"
    >
      <div className="mx-auto max-w-[90rem] px-2 py-2 text-center text-sm font-semibold group-hover:opacity-70">
        Meet Our New Project:{' '}
        <div className="sm:contents">
          <img
            src="/images/our-projects/paneflow.svg"
            alt="PaneFlow"
            className="inline size-7"
          />
          <span className="ml-1 text-[#C27FFF]">
            PaneFlow - Create Stunning Slideshows Visually
          </span>
        </div>
      </div>
    </a>
  );
}
