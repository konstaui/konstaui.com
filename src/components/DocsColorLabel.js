export const DocsColorLabel = (props) => {
  const { color, className } = props;
  return (
    <span
      style={{ backgroundColor: color }}
      className={`w-4 h-4 align-middle mr-1 rounded border inline-block ${
        className || ''
      }`}
    />
  );
};
