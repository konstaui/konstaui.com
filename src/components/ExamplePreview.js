import { useEffect, useRef, useState } from 'react';

const Button = (props) => {
  const { active, left, right, children, ...rest } = props;
  return (
    <button
      type="button"
      className={`w-20 font-medium text-sm h-7 duration-300 ${
        active
          ? 'bg-primary text-white'
          : 'border border-opacity-25 bg-white bg-opacity-10'
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
    <div className="docs-example">
      <div className="flex bg-black rounded-t-lg py-4 px-4 items-center justify-between">
        <div className="text-white text-opacity-75">{fileName || ''}</div>
        <div className="flex">
          <div className="flex">
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
          <div className="flex ml-8">
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
        <div className="flex-shrink h-[734px] w-full min-w-0">
          <Source />
        </div>
        <div className="flex-shrink-0 w-[375px]">
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
