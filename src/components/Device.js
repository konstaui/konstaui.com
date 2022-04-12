// eslint-disable-next-line
export const Device = ({ url, float, className }) => {
  return (
    <div
      className={`overflow-hidden w-[320px] rounded-[54px] box-content p-3 bg-black relative ${
        float ? 'float-right ml-10 relative z-20' : ''
      } ${className || ''}`}
    >
      <iframe
        title="demo"
        src={url}
        loading="lazy"
        className="w-[320px] h-[680px] rounded-[38px] overflow-hidden"
      />
      {/* notch */}
      <div
        className="absolute w-[219px] h-[23px] left-1/2 -translate-x-1/2 top-[11px] pointer-events-none z-50 bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/notch.svg)' }}
      />
      {/* bottom bar */}
      <div className="absolute pointer-events-none z-50 w-[120px] h-1 bg-[#999] bottom-[27px] left-1/2 -translate-x-1/2 rounded-full" />
    </div>
  );
};
