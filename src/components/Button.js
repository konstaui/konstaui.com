export const Button = (props) => {
  const { component = 'a', inline, children, ...attrs } = props;
  const Component = component;
  return (
    <Component
      className={`bg-primary text-xl font-bold text-white px-8 h-12 ${
        inline ? 'inline-flex' : 'flex'
      } items-center rounded-xl cursor-pointer hover:bg-primary-light active:bg-primary-dark duration-200 active:ring-4 active:ring-primary active:ring-opacity-50`}
      {...attrs}
    >
      {children}
    </Component>
  );
};
