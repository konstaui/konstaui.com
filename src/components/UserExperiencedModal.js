import { useEffect } from 'react';

export default function UserExperiencedModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-100 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="User Experienced newsletter"
    >
      <div
        className="fixed inset-0 animate-[fadeIn_200ms_ease-out] bg-black/85 backdrop-blur-md"
        onClick={onClose}
      />
      <div
        className="relative flex min-h-full items-center justify-center p-3 sm:p-6 lg:p-8"
        onClick={onClose}
      >
        <div
          className="dark:bg-dark dark:border-dark-light relative flex w-full max-w-2xl animate-[fadeInUp_280ms_cubic-bezier(0.2,0.8,0.2,1)] flex-col overflow-hidden rounded-3xl border border-black/10 bg-white"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-end px-2 py-2">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="z-20 inline-flex size-10 items-center justify-center rounded-full bg-black/5 text-black backdrop-blur-md duration-200 hover:bg-black/15 active:opacity-50 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 3L13 13M13 3L3 13"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          <div>
            <iframe
              src="https://uxed.substack.com/embed"
              frameBorder="0"
              scrolling="no"
              className="block h-90 w-full bg-white"
              title="Subscribe to User Experienced"
            ></iframe>
          </div>
          <div className="flex items-center justify-between gap-4 p-4 text-xs sm:text-sm">
            <a
              href="https://uxed.substack.com"
              target="_blank"
              rel="noopener"
              className="group hover:text-primary inline-flex min-w-0 items-center gap-2.5 !text-black !no-underline duration-200 dark:!text-white"
            >
              <img
                src="/images/our-projects/uxd-logo-red.png"
                alt="User Experienced"
                className="-my-2 size-6 shrink-0 rounded"
              />
              <span className="font-medium">User Experienced</span>
              <span className="group-hover:text-primary text-black/40 duration-200 dark:text-white/40">
                ↗
              </span>
            </a>
            <div className="hidden shrink-0 items-center gap-2 text-black/50 sm:flex dark:text-white/50">
              <span>co-curated by</span>
              <img src="/favicon.svg" alt="Konsta UI" className="size-5" />
              <span className="text-black/70 dark:text-white/70">
                Konsta UI authors
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
