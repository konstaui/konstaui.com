export const Container = (props) => {
  const { className, children, ...attrs } = props;
  return (
    <div
      className={`max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 ${
        className || ''
      }`}
      {...attrs}
    >
      {children}
    </div>
  );
};
