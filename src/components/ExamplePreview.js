import { useEffect, useRef, useState } from 'react';

const Button = (props) => {
  const { active, left, right, children, ...rest } = props;
  return (
    <button
      type="button"
      className={`w-20 font-medium text-sm h-7 duration-300 text-white ${
        active
          ? 'bg-primary'
          : 'border border-opacity-25 bg-white bg-opacity-10 text-opacity-50 hover:bg-opacity-20'
      } ${left ? 'rounded-l' : 'rounded-r'}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export const ExamplePreview = (props) => {
  const { source: Source, react, fileName = '' } = props;
  let url = props.url;
  const [theme, setTheme] = useState('ios');
  const [mode, setMode] = useState('light');
  const iframeEl = useRef(null);
  if (react) url = `/kitchen-sink/react/dist/index.html${url}`;
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
    <div className="docs-example my-8">
      <div className="flex bg-black rounded-t-lg py-4 px-4 items-center justify-between">
        <div className="text-white text-opacity-75">{fileName || ''}</div>
        <div className="flex">
          <div>
            <a
              href={iframeUrl.current}
              target="_blank"
              className="bg-white bg-opacity-10 border border-opacity-25 !text-white w-7 h-7 flex justify-center items-center rounded hover:bg-opacity-20 duration-300"
            >
              <svg
                className="w-4 h-4 relative -top-px opacity-50"
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
      <div className="flex border-r-4 border-b-4 border-l-4 border-t-0 border-black">
        <div className="flex-shrink md:h-[734px] w-full min-w-0 md:border-r-4 border-black">
          <Source />
        </div>
        <div className="hidden md:block flex-shrink-0 w-[320px] xl:w-[375px]">
          <iframe
            ref={iframeEl}
            title="demo"
            src={iframeUrl.current}
            loading="lazy"
            className="w-full h-full overflow-hidden"
          />
        </div>
      </div>
    </div>
  );
};
