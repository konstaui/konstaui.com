import { useEffect, useState } from 'react';

const STORAGE_KEY = 'uxd_popover_dismissed';
const SHOW_DELAY_MS = 4000;
const MIN_WIDTH = 1024;

export default function UserExperiencedPopover() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.innerWidth < MIN_WIDTH) return;
    try {
      if (localStorage.getItem(STORAGE_KEY) === '1') return;
    } catch (e) {}
    const timer = setTimeout(() => {
      if (window.innerWidth >= MIN_WIDTH) {
        setVisible(true);
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'uxd_popover_show', {
            event_category: 'newsletter',
            event_label: 'auto_popover',
          });
        }
      }
    }, SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch (e) {}
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'uxd_popover_dismiss', {
        event_category: 'newsletter',
        event_label: 'auto_popover',
      });
    }
  };

  if (!visible) return null;

  return (
    <div
      className="fixed right-4 bottom-4 z-90 hidden w-90 animate-[fadeInUp_280ms_cubic-bezier(0.2,0.8,0.2,1)] overflow-hidden rounded-2xl bg-white text-black shadow-2xl lg:block"
      role="dialog"
      aria-label="User Experienced newsletter"
    >
      <div className="flex items-center justify-end px-3 py-2">
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close"
          className="inline-flex size-7 cursor-pointer items-center justify-center rounded-full bg-black/5 text-black duration-200 hover:bg-black/15 active:opacity-50"
        >
          <svg
            width="10"
            height="10"
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
      <div className="flex flex-col items-start px-7 pt-0">
        <a
          href="https://uxed.substack.com"
          target="_blank"
          rel="noopener"
          className="mb-4"
        >
          <img
            src="/images/our-projects/uxd-logo-red.png"
            alt="User Experienced"
            className="size-12 shrink-0 rounded"
          />
        </a>
        <div className="mb-2 text-lg leading-tight font-medium">
          Subscribe to the <br />
          User Experienced
        </div>
        <div className="text-sm">
          Subscribe for weekly web, app, and logo design inspiration.
        </div>
      </div>
      <div className="px-4">
        <iframe
          src="https://uxed.substack.com/embed"
          frameBorder="0"
          scrolling="no"
          className="block h-37 w-full bg-white"
          title="Subscribe to User Experienced"
        ></iframe>
      </div>
      <div className="flex shrink-0 items-center justify-end gap-1 border-t border-black/10 px-7 py-3 text-xs text-black/75">
        <span>co-curated by</span>
        <img src="/favicon.svg" alt="Konsta UI" className="size-4" />
        <span className="text-black">Konsta UI authors</span>
      </div>
    </div>
  );
}
