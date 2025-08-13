export default function TogglesRibbon() {
  return (
    <a
      className="bg-surface text-on-surface group dark:border-dark-light flex min-h-[64px] items-center justify-center border-b border-black/10 hover:no-underline"
      href="https://t0ggles.com"
      target="_blank"
    >
      <div className="mx-auto max-w-[90rem] px-4 py-2 text-center text-sm font-semibold group-hover:opacity-70 sm:px-6 lg:px-8 xl:px-10">
        🔥 Meet Our New Project:{' '}
        <span className="underline">
          t0ggles - Your Ultimate Project Management Tool!
        </span>{' '}
        🔥
      </div>
    </a>
  );
}
