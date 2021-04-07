import { Container } from './Container';

export const Footer = (props) => {
  const { className, children, ...attrs } = props;

  return (
    <div
      className={`border-t-[0.5px] border-black border-opacity-10 py-8 ${
        className || ''
      }`}
      {...attrs}
    >
      <Container>
        {/* Copy */}
        <div className="text-sm space-y-2 text-center">
          <div className="">
            Code licensed under{' '}
            <a
              href="https://github.com/tailwind-mobile/tailwind-mobile/blob/main/LICENSE"
              target="_blank"
              className="text-primary hover:underline"
            >
              MIT
            </a>
            .
          </div>
          <div>
            2021 © Tailwind Mobile is brought to you by{' '}
            <a
              href="https://github.com/nolimits4web/"
              target="_blank"
              className="text-primary hover:underline"
            >
              Vladimir Kharlampidi
            </a>
            .
          </div>
        </div>
        {children}
      </Container>
    </div>
  );
};
