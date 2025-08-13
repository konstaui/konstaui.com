import { Container } from './Container';

export const Footer = (props) => {
  const { className, children, ...attrs } = props;

  return (
    <div
      className={`dark:border-dark-light border-t-[0.5px] border-black/10 py-8 ${
        className || ''
      }`}
      {...attrs}
    >
      <Container>
        {/* Copy */}
        <div className="space-y-4 text-center text-sm">
          <div>
            Code licensed under{' '}
            <a
              href="https://github.com/konstaui/konsta/blob/main/LICENSE"
              target="_blank"
              className="text-primary hover:underline"
            >
              MIT
            </a>
            .
          </div>
          <div>
            2022 © Konsta UI by{' '}
            <a href="https://nolimits4web.com" target="_blank">
              <img
                className="inline-block h-12 w-12"
                src="/images/n4w-logo.svg"
                alt="nolimits4web"
              />
            </a>
            .
          </div>
        </div>
        {children}
      </Container>
    </div>
  );
};
