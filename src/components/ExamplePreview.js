import { useEffect, useRef, useState } from 'react';

const Button = (props) => {
  const { active, left, right, children, ...rest } = props;
  return (
    <button
      type="button"
      className={`h-8 w-20 text-sm font-medium text-white duration-300 ${
        active
          ? 'bg-primary'
          : 'text-opacity-50 border border-white/20 bg-white/10 hover:bg-white/20'
      } ${left ? 'rounded-l-lg' : 'rounded-r-lg'}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export const ExamplePreview = (props) => {
  const { source: Source, react, vue, svelte, fileName = '' } = props;
  let url = props.url;
  const [theme, setTheme] = useState('ios');
  const [mode, setMode] = useState('light');
  const iframeEl = useRef(null);
  if (react) url = `/kitchen-sink/react/dist/index.html${url}`;
  if (vue) url = `/kitchen-sink/vue/dist/index.html${url}`;
  if (svelte) url = `/kitchen-sink/svelte/dist/index.html${url}`;
  console.log(theme);
  useEffect(() => {
    if (
      iframeEl.current &&
      iframeEl.current.contentWindow &&
      iframeEl.current.contentWindow.setTheme
    ) {
      iframeEl.current.contentWindow.setTheme(theme);
    }
  }, [theme]);
  useEffect(() => {
    if (
      iframeEl.current &&
      iframeEl.current.contentWindow &&
      iframeEl.current.contentWindow.setMode
    ) {
      iframeEl.current.contentWindow.setMode(mode);
    }
  }, [mode]);
  const getIframeUrl = () => {
    const query = `?theme=${theme}&examplePreview=true`;
    if (url.includes('#'))
      return `${url.split('#')[0]}${query}#${url.split('#')[1]}`;
    return `${url}${query}`;
  };
  const iframeUrl = useRef(getIframeUrl());

  return (
    <div className="example-preview my-8">
      <div className="flex items-center justify-between rounded-t-lg bg-black px-4 py-2">
        <div className="text-opacity-75 text-white">{fileName || ''}</div>
        <div className="flex">
          <div>
            <a
              href={getIframeUrl()}
              target="_blank"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-white/10 !text-white duration-300 hover:bg-white/20"
            >
              <svg
                className="relative -top-px h-4 w-4 opacity-50"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
              </svg>
            </a>
          </div>
          <div className="ml-4 hidden md:flex">
            <Button
              active={theme === 'ios'}
              left
              onClick={() => setTheme('ios')}
            >
              iOS
            </Button>
            <Button
              active={theme === 'material'}
              right
              onClick={() => setTheme('material')}
            >
              Material
            </Button>
          </div>
          <div className="ml-4 hidden md:flex">
            <Button
              active={mode === 'light'}
              left
              onClick={() => setMode('light')}
            >
              Light
            </Button>
            <Button
              active={mode === 'dark'}
              right
              onClick={() => setMode('dark')}
            >
              Dark
            </Button>
          </div>
        </div>
      </div>
      <div className="flex border-black sm:border-r-4 sm:border-b-4 sm:border-l-4">
        <div className="w-full min-w-0 shrink border-black md:h-[734px] md:border-r-4">
          <Source />
        </div>
        <div className="hidden w-[320px] shrink-0 md:block xl:w-[375px]">
          <iframe
            ref={iframeEl}
            title="demo"
            src={iframeUrl.current}
            loading="lazy"
            className="h-full w-full overflow-hidden"
          />
        </div>
      </div>
    </div>
  );
};
