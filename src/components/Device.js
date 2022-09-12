import { useState, useRef } from 'react';

// eslint-disable-next-line
export const Device = ({ url, float, className }) => {
  const iframeRef = useRef(null);
  const [theme, setTheme] = useState('ios');

  const onLoad = () => {
    const appEl = iframeRef.current.contentDocument.querySelector('.k-app');
    const config = {
      attributes: true,
      childList: false,
      subtree: false,
    };
    const callback = () => {
      setTheme(appEl.classList.contains('k-ios') ? 'ios' : 'material');
    };
    const observer = new MutationObserver(callback);
    observer.observe(appEl, config);
  };
  return (
    <div
      className={`relative box-content w-[375px] rounded-[54px] bg-black p-3 ${
        float ? 'relative z-20 float-right ml-10' : ''
      } ${className || ''}`}
    >
      <iframe
        ref={iframeRef}
        title="demo"
        src={url}
        loading="lazy"
        onLoad={onLoad}
        className="h-[790px] w-[375px] overflow-hidden rounded-[38px]"
      />
      {/* notch */}
      {theme === 'ios' && (
        <div className="pointer-events-none absolute top-[22px] left-0 flex w-full items-center justify-center">
          <div className="h-6 w-20 rounded-full bg-black" />
        </div>
      )}
      {theme === 'material' && (
        <div className="pointer-events-none absolute left-1/2 top-4 z-50 h-4 w-4 -translate-x-1/2 rounded-full bg-black" />
      )}

      {/* bottom bar */}
      <div className="pointer-events-none absolute bottom-[27px] left-1/2 z-50 h-1 w-[120px] -translate-x-1/2 rounded-full bg-[#999]" />
    </div>
  );
};
