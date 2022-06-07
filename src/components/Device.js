// eslint-disable-next-line
export const Device = ({ url, float, className }) => {
  return (
    <div
      className={`relative box-content w-[320px] rounded-[54px] bg-black p-3 ${
        float ? 'relative z-20 float-right ml-10' : ''
      } ${className || ''}`}
    >
      <iframe
        title="demo"
        src={url}
        loading="lazy"
        className="h-[680px] w-[320px] overflow-hidden rounded-[38px]"
      />
      {/* notch */}
      <div
        className="pointer-events-none absolute left-1/2 top-[11px] z-50 h-[23px] w-[219px] -translate-x-1/2 bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/notch.svg)' }}
      />
      {/* bottom bar */}
      <div className="pointer-events-none absolute bottom-[27px] left-1/2 z-50 h-1 w-[120px] -translate-x-1/2 rounded-full bg-[#999]" />
    </div>
  );
};
