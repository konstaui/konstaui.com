export const Container = (props) => {
  const { className, children, ...attrs } = props;
  return (
    <div
      className={`max-w-screen-xl mx-auto px-8 ${className || ''}`}
      {...attrs}
    >
      {children}
    </div>
  );
};
