export default function TogglesBanner({ className = '' } = {}) {
  return (
    <a
      className={`group flex min-h-[64px] items-center justify-center border-white/20 bg-neutral-900 text-white hover:no-underline dark:border-b ${className}`}
      href="https://t0ggles.com"
      target="_blank"
    >
      <div className="mx-auto max-w-[90rem] px-2 py-2 text-center text-sm font-semibold group-hover:opacity-70">
        Meet Our New Project:{' '}
        <div className="sm:contents">
          <img
            src="/images/our-projects/t0ggles.svg"
            alt="PaneFlow"
            className="inline size-7"
          />
          <span className="ml-1 text-[#d7ff38]">
            t0ggles - Your Ultimate Project Management Tool!
          </span>
        </div>
      </div>
    </a>
  );
}
