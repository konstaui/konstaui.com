import Highlight, { defaultProps } from 'prism-react-renderer';
// import theme from 'prism-react-renderer/themes/dracula';
import stripIndent from 'strip-indent';

const removeIndent = (code = '') => stripIndent(code).trim();

export const Pre = ({ children, lang, className: classNameParent }) => (
  <Highlight
    {...defaultProps}
    theme={undefined}
    code={removeIndent(children)}
    language={lang}
  >
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <pre className={`${className} ${classNameParent || ''}`} style={style}>
        {tokens.map((line, i) => (
          <div {...getLineProps({ line, key: i })}>
            {line.map((token, key) => (
              <span {...getTokenProps({ token, key })} />
            ))}
          </div>
        ))}
      </pre>
    )}
  </Highlight>
);
