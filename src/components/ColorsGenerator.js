import { useState } from 'react';

function colorHexToRgb(hex) {
  const h = hex.replace(
    /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
    (m, r, g, b) => r + r + g + g + b + b
  );
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);
  return result ? result.slice(1).map((n) => parseInt(n, 16)) : null;
}

function colorRgbToHsl(r, g, b) {
  r /= 255; // eslint-disable-line
  g /= 255; // eslint-disable-line
  b /= 255; // eslint-disable-line
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h;
  if (d === 0) h = 0;
  else if (max === r) h = ((g - b) / d) % 6;
  else if (max === g) h = (b - r) / d + 2;
  else if (max === b) h = (r - g) / d + 4;
  const l = (min + max) / 2;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  if (h < 0) h = 360 / 60 + h;
  return [h * 60, s, l];
}
function colorRgbToHex(r, g, b) {
  const result = [r, g, b]
    .map((n) => {
      const hex = n.toString(16);
      return hex.length === 1 ? `0${hex}` : hex;
    })
    .join('');
  return `#${result}`;
}
function colorHslToRgb(h, s, l) {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const hp = h / 60;
  const x = c * (1 - Math.abs((hp % 2) - 1));
  let rgb1;
  if (Number.isNaN(h) || typeof h === 'undefined') {
    rgb1 = [0, 0, 0];
  } else if (hp <= 1) rgb1 = [c, x, 0];
  else if (hp <= 2) rgb1 = [x, c, 0];
  else if (hp <= 3) rgb1 = [0, c, x];
  else if (hp <= 4) rgb1 = [0, x, c];
  else if (hp <= 5) rgb1 = [x, 0, c];
  else if (hp <= 6) rgb1 = [c, 0, x];
  const m = l - c / 2;
  return rgb1.map((n) => Math.max(0, Math.min(255, Math.round(255 * (n + m)))));
}
function colorThemeProps(hex) {
  const rgb = colorHexToRgb(hex);
  if (!rgb) return {};
  const hsl = colorRgbToHsl(...rgb);
  const hslShade = [hsl[0], hsl[1], Math.max(0, hsl[2] - 0.08)];
  const hslTint = [hsl[0], hsl[1], Math.max(0, hsl[2] + 0.08)];
  const dark = colorRgbToHex(...colorHslToRgb(...hslShade));
  const light = colorRgbToHex(...colorHslToRgb(...hslTint));
  return { dark, light };
}

export const ColorsGenerator = () => {
  const [hex, setHex] = useState('');
  const onInput = (e) => {
    const value = e.target.value;
    if (
      (value.trim()[0] === '#' && value.trim().length === 4) ||
      value.trim().length === 7
    ) {
      setHex(value.trim().slice(1));
    } else if (
      (value.trim()[0] !== '#' && value.trim().length === 3) ||
      value.trim().length === 6
    ) {
      setHex(value.trim());
    }
  };
  return (
    <div className="p-4 border rounded">
      <div className="flex flex-wrap items-center">
        {/* eslint-disable-next-line */}
        <label htmlFor="color-generator" className="cursor-pointer mr-4">
          Your primary theme color
        </label>
        <input
          id="color-generator"
          type="text"
          placeholder="#FF0000"
          onInput={onInput}
          className="border-2 rounded border-gray-400 focus:border-primary px-2 py-1"
        />
      </div>
      {hex && (
        <div className="flex items-center space-x-4 mt-4">
          <div className="flex flex-col justify-center w-full">
            <div className="font-bold">Light</div>
            <div>{colorThemeProps(hex).light}</div>
            <div
              className="w-32 h-32 w-full"
              style={{ backgroundColor: `${colorThemeProps(hex).light}` }}
            />
          </div>
          <div className="flex flex-col justify-center w-full">
            <div className="font-bold">Dark</div>
            <div>{colorThemeProps(hex).dark}</div>
            <div
              className="w-32 h-32 w-full"
              style={{ backgroundColor: `${colorThemeProps(hex).dark}` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
