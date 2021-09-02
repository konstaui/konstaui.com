// eslint-disable-next-line
export const Device = ({ url, float, className }) => {
  return (
    <div
      className={`w-[375px] h-[734px] overflow-hidden rounded-3xl box-content p-2 border-2 border-gray-400 bg-black ${
        float ? 'float-right ml-10 relative z-20' : ''
      } ${className || ''}`}
    >
      <iframe
        title="demo"
        src={url}
        loading="lazy"
        className="w-full h-full rounded-xl overflow-hidden"
      />
    </div>
  );
};
